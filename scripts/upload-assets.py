#!/usr/bin/env python3
"""Upload local assets to Storyblok and return their CDN URLs."""
import json
import os
import urllib.request
import urllib.parse
import glob

SPACE_ID = "290635417094692"
MAPI_TOKEN = "lM0cvxnOiTxP8vfRYNSjIgtt-146566979415798-a_N3hgWnyEyGyarx3wza"
ASSETS_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "assets")

ASSET_NAMES = {
    "a4d848fc8e2e4a83a5179b20fc12c3245deb2b64.png": "vroff-hero",
    "50bd69f5fdd8bee31086dcd752e9faef3c2d5853.png": "vroff-feature-1",
    "a3c84ae7751b81b4cbd620fcee7d2577b3f201dc.png": "vroff-feature-2-calendar",
    "573e77a25801c64ed5aee33c55804dfe3fcf92d1.png": "vroff-feature-3-search",
    "283a376b0fafb9874fefe43652d98fad3cdad31c.png": "vroff-avatar",
    "4c252a4b255cda49a808c6317a1e8e87c8b89453.png": "vroff-security-1",
    "487818f4b6cf2397615f34f309fe40a712ebec95.png": "vroff-security-2",
    "5281ab6aa0636038040ed64dad74e65a1211041f.png": "vroff-security-3",
    "1f0e5946b884ef95fa586fc7af2e5bdca32525e7.png": "vroff-film-thumbnail",
    "4dc6e4130302c1fff2514ea9247cc5842789902a.png": "vroff-case-portrait",
}

uploaded = {}

for filename, friendly_name in ASSET_NAMES.items():
    filepath = os.path.join(ASSETS_DIR, filename)
    if not os.path.exists(filepath):
        print(f"SKIP: {filename} not found")
        continue

    file_size = os.path.getsize(filepath)
    print(f"\nUploading {friendly_name} ({filename}, {file_size//1024}KB)...")

    # Step 1: Sign the asset
    sign_payload = json.dumps({
        "filename": f"{friendly_name}.png",
        "size": f"{file_size}x{file_size}",
        "asset_folder_id": None,
    }).encode("utf-8")

    sign_req = urllib.request.Request(
        f"https://mapi.storyblok.com/v1/spaces/{SPACE_ID}/assets",
        data=sign_payload,
        method="POST",
        headers={
            "Authorization": MAPI_TOKEN,
            "Content-Type": "application/json",
        },
    )

    try:
        with urllib.request.urlopen(sign_req) as resp:
            sign_result = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"  Sign error {e.code}: {e.read().decode()[:200]}")
        continue

    post_url = sign_result.get("post_url")
    fields = sign_result.get("fields", {})
    public_url = sign_result.get("pretty_url")
    asset_id = sign_result.get("id")

    if not post_url:
        print(f"  No post_url returned: {json.dumps(sign_result)[:200]}")
        continue

    # Step 2: Upload file to S3 using multipart form
    import io

    boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
    body_parts = []

    for key, value in fields.items():
        body_parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{key}\"\r\n\r\n{value}\r\n".encode())

    with open(filepath, "rb") as f:
        file_data = f.read()

    body_parts.append(
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"{friendly_name}.png\"\r\nContent-Type: image/png\r\n\r\n".encode()
        + file_data
        + b"\r\n"
    )
    body_parts.append(f"--{boundary}--\r\n".encode())

    body = b"".join(body_parts)

    upload_req = urllib.request.Request(
        post_url,
        data=body,
        method="POST",
        headers={
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "Content-Length": str(len(body)),
        },
    )

    try:
        with urllib.request.urlopen(upload_req) as resp:
            status = resp.status
    except urllib.error.HTTPError as e:
        status = e.code

    if status in (200, 201, 204):
        print(f"  OK! URL: {public_url}")
        uploaded[filename] = {"url": public_url, "id": asset_id}
    else:
        print(f"  Upload returned status {status}")

print(f"\n=== Uploaded {len(uploaded)}/{len(ASSET_NAMES)} assets ===")
for fn, info in uploaded.items():
    print(f"  {fn}: {info['url']}")

# Save mapping for later use
with open(os.path.join(os.path.dirname(__file__), "asset-urls.json"), "w") as f:
    json.dump(uploaded, f, indent=2)
