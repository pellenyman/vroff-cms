#!/usr/bin/env python3
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

body = story.get("content", {}).get("body", [])

for b in body:
    if b.get("component") == "faq":
        b["all_label__i18n__en"] = "All"
        b["count_suffix__i18n__en"] = "questions"
        b["headline__i18n__en"] = "Frequently Asked Questions"
        b["cta_text__i18n__en"] = "See all questions"

        for item in b.get("items", []):
            sv_cat = item.get("category", "")
            en_cat = CATEGORY_MAP.get(sv_cat, sv_cat)
            item["category__i18n__en"] = en_cat

            if item.get("question"):
                pass  # keep existing translations

        print(f"Fixed faq block: all_label=All, count_suffix=questions")
        print(f"  Categories mapped: {CATEGORY_MAP}")

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
    print("FAQ story updated")

# Verify
import time
time.sleep(1)
TOKEN = "ghcspBSax2RGiKZpZpPzcAtt"
vreq = urllib.request.Request(f"https://api.storyblok.com/v2/cdn/stories/faq?token={TOKEN}&version=draft&language=en")
with urllib.request.urlopen(vreq) as vr:
    vbody = json.loads(vr.read()).get("story",{}).get("content",{}).get("body",[])
    for vb in vbody:
        if vb.get("component") == "faq":
            print(f"\nVerify EN:")
            print(f"  headline: {vb.get('headline')}")
            print(f"  all_label: {vb.get('all_label')}")
            print(f"  count_suffix: {vb.get('count_suffix')}")
            cats = set()
            for vi in vb.get("items",[]):
                cats.add(vi.get("category","?"))
            print(f"  categories: {cats}")
