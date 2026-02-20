#!/usr/bin/env python3
import json, urllib.request

SPACE_ID = "290635417094692"
MAPI_TOKEN = "lM0cvxnOiTxP8vfRYNSjIgtt-146566979415798-a_N3hgWnyEyGyarx3wza"
FAQ_STORY_ID = "146577379109084"

req = urllib.request.Request(
    f"https://mapi.storyblok.com/v1/spaces/{SPACE_ID}/stories/{FAQ_STORY_ID}",
    headers={"Authorization": MAPI_TOKEN},
)
with urllib.request.urlopen(req) as r:
    story = json.loads(r.read())["story"]

body = story.get("content", {}).get("body", [])

for b in body:
    if b.get("component") == "faq":
        b["all_label"] = "Alla"
        b["count_suffix"] = "frågor"
        print(f"Updated faq block: all_label=Alla, count_suffix=frågor")
        print(f"  Items: {len(b.get('items', []))}")

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
    print("FAQ story updated and published")
