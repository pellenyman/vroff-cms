#!/usr/bin/env python3
import json, urllib.request

SPACE_ID = "290635417094692"
MAPI_TOKEN = "lM0cvxnOiTxP8vfRYNSjIgtt-146566979415798-a_N3hgWnyEyGyarx3wza"
HOME_STORY_ID = "146567046690579"

req = urllib.request.Request(
    f"https://mapi.storyblok.com/v1/spaces/{SPACE_ID}/stories/{HOME_STORY_ID}",
    headers={"Authorization": MAPI_TOKEN},
)
with urllib.request.urlopen(req) as r:
    story = json.loads(r.read()).get("story", {})

body = story.get("content", {}).get("body", [])

for b in body:
    if b.get("component") == "navigation":
        for item in b.get("items", []):
            if item.get("label") == "FAQ":
                item["label"] = "Frågor"
                print("Fixed: FAQ -> Frågor")

payload = json.dumps({
    "story": {
        "name": story["name"],
        "slug": story["slug"],
        "content": story["content"],
    },
    "publish": 1,
}).encode()

req2 = urllib.request.Request(
    f"https://mapi.storyblok.com/v1/spaces/{SPACE_ID}/stories/{HOME_STORY_ID}",
    data=payload, method="PUT",
    headers={"Authorization": MAPI_TOKEN, "Content-Type": "application/json"},
)
with urllib.request.urlopen(req2) as r2:
    result = json.loads(r2.read())
    nav = [b for b in result["story"]["content"]["body"] if b.get("component") == "navigation"][0]
    for item in nav.get("items", []):
        print(f"  Nav: {item.get('label')}")
