#!/usr/bin/env python3
"""Fix inconsistent English category translations on FAQ items."""
import json, urllib.request

SPACE_ID = "290635417094692"
MAPI_TOKEN = "lM0cvxnOiTxP8vfRYNSjIgtt-146566979415798-a_N3hgWnyEyGyarx3wza"
FAQ_STORY_ID = "146577379109084"

CATEGORY_MAP = {
    "Allmänt": "General",
    "Pris": "Pricing",
    "Säkerhet": "Security",
    "Teknik": "Technical",
}

req = urllib.request.Request(
    f"https://mapi.storyblok.com/v1/spaces/{SPACE_ID}/stories/{FAQ_STORY_ID}",
    headers={"Authorization": MAPI_TOKEN},
)
with urllib.request.urlopen(req) as r:
    story = json.loads(r.read())["story"]

body = story["content"]["body"]

for b in body:
    if b.get("component") != "faq":
        continue
    for i, item in enumerate(b.get("items", [])):
        sv_cat = item.get("category", "")
        en_cat = CATEGORY_MAP.get(sv_cat, "")
        if en_cat:
            item["category__i18n__en"] = en_cat
            print(f"  [{i}] {sv_cat} -> {en_cat}")
        else:
            print(f"  [{i}] WARNING: unknown category '{sv_cat}'")

payload = json.dumps({
    "story": {
        "name": story["name"],
        "slug": story["slug"],
        "content": story["content"],
    },
    "publish": 1,
}).encode()

req2 = urllib.request.Request(
    f"https://mapi.storyblok.com/v1/spaces/{SPACE_ID}/stories/{FAQ_STORY_ID}",
    data=payload, method="PUT",
    headers={"Authorization": MAPI_TOKEN, "Content-Type": "application/json"},
)
with urllib.request.urlopen(req2) as r2:
    print("\nSaved and published.")

import time; time.sleep(1)

TOKEN = "ghcspBSax2RGiKZpZpPzcAtt"
vreq = urllib.request.Request(f"https://api.storyblok.com/v2/cdn/stories/faq?token={TOKEN}&version=draft&language=en&cv={int(time.time())}")
with urllib.request.urlopen(vreq) as vr:
    vbody = json.loads(vr.read())["story"]["content"]["body"]
    for vb in vbody:
        if vb.get("component") == "faq":
            print(f"\nVerify EN categories:")
            cats = set()
            for vi in vb.get("items", []):
                cats.add(vi.get("category", "?"))
            print(f"  {cats}")
            print(f"  all_label: {vb.get('all_label')}")
            print(f"  count_suffix: {vb.get('count_suffix')}")
