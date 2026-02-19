#!/usr/bin/env python3
"""Update home story to reference Storyblok CDN asset URLs."""
import json
import os
import urllib.request

SPACE_ID = "290635417094692"
MAPI_TOKEN = "lM0cvxnOiTxP8vfRYNSjIgtt-146566979415798-a_N3hgWnyEyGyarx3wza"
HOME_STORY_ID = "146567046690579"

with open(os.path.join(os.path.dirname(__file__), "asset-urls.json")) as f:
    asset_map = json.load(f)

def storyblok_asset(local_filename):
    info = asset_map.get(local_filename, {})
    url = info.get("url", "")
    if url:
        return {"filename": f"https:{url}", "id": info.get("id")}
    return None

hero_img = storyblok_asset("a4d848fc8e2e4a83a5179b20fc12c3245deb2b64.png")
feat1_img = storyblok_asset("50bd69f5fdd8bee31086dcd752e9faef3c2d5853.png")
feat2_img = storyblok_asset("a3c84ae7751b81b4cbd620fcee7d2577b3f201dc.png")
feat3_img = storyblok_asset("573e77a25801c64ed5aee33c55804dfe3fcf92d1.png")
avatar_img = storyblok_asset("283a376b0fafb9874fefe43652d98fad3cdad31c.png")
sec1_img = storyblok_asset("4c252a4b255cda49a808c6317a1e8e87c8b89453.png")
sec2_img = storyblok_asset("487818f4b6cf2397615f34f309fe40a712ebec95.png")
sec3_img = storyblok_asset("5281ab6aa0636038040ed64dad74e65a1211041f.png")
film_img = storyblok_asset("1f0e5946b884ef95fa586fc7af2e5bdca32525e7.png")
case_img = storyblok_asset("4dc6e4130302c1fff2514ea9247cc5842789902a.png")

body = [
    {
        "_uid": "nav-1",
        "component": "navigation",
        "items": [
            {"_uid": "nav-i1", "component": "nav_item", "label": "Pris", "href": "#pricing"},
            {"_uid": "nav-i2", "component": "nav_item", "label": "Kundcase", "href": "/case"},
            {"_uid": "nav-i3", "component": "nav_item", "label": "FAQ", "href": "/faq"},
            {"_uid": "nav-i4", "component": "nav_item", "label": "Kontakt", "href": "/contact"},
        ]
    },
    {
        "_uid": "hero-1",
        "component": "hero",
        "headline": "Vroff \u00e4r det nya m\u00e4nskligare s\u00e4ttet att samarbeta",
        "subtext": "Samla hela teamet p\u00e5 ett st\u00e4lle. Chatta, dela filer, h\u00e5ll videom\u00f6ten och planera projekt \u2013 utan kr\u00e5ngel.",
        "cta_text": "Prova p\u00e5",
        "background_image": hero_img,
    },
    {
        "_uid": "features-1",
        "component": "feature",
        "headline": "Detta \u00e4r Vroff",
        "description": "Vroff samlar kommunikation, fildelning och projektplanering i en enda app. Sluta v\u00e4xla mellan verktyg \u2013 allt finns h\u00e4r.",
        "items": [
            {"_uid": "feat-1", "component": "feature_item", "title": "Allt p\u00e5 ett st\u00e4lle", "description": "Chatt, videosamtal, fildelning och uppgiftshantering i samma vy. Du beh\u00f6ver aldrig l\u00e4mna Vroff.", "image": feat1_img},
            {"_uid": "feat-2", "component": "feature_item", "title": "Kalender", "description": "Synka teamets schema automatiskt. Se vem som \u00e4r ledig, boka m\u00f6ten och f\u00e5 p\u00e5minnelser \u2013 allt integrerat.", "background_color": "#b4bbfd", "image": feat2_img},
            {"_uid": "feat-3", "component": "feature_item", "title": "Smart s\u00f6kning", "description": "Hitta meddelanden, filer och anteckningar blixtsnabbt. Vroff indexerar allt s\u00e5 du aldrig tappar bort n\u00e5got.", "image": feat3_img},
        ]
    },
    {
        "_uid": "testimonials-1",
        "component": "testimonial",
        "headline": "Vad folk s\u00e4ger",
        "items": [
            {"_uid": "test-1", "component": "testimonial_item", "quote": "\"Vi sparar minst tv\u00e5 timmar om dagen sedan vi gick \u00f6ver till Vroff. Alla \u00e4lskar det.\"", "name": "Helen Hansson", "role": "HR-chef, TechAB", "avatar": avatar_img},
            {"_uid": "test-2", "component": "testimonial_item", "quote": "\"Vroff har revolutionerat hur vi samarbetar. Allt finns p\u00e5 ett st\u00e4lle och det bara funkar.\"", "name": "Erik Svensson", "role": "Produktchef, Startify", "avatar": avatar_img},
            {"_uid": "test-3", "component": "testimonial_item", "quote": "\"Enkelt att komma ig\u00e5ng och supporten \u00e4r f\u00f6rstklassig. Rekommenderar varmt.\"", "name": "Anna Karlsson", "role": "VD, Designbyr\u00e5n Forma", "avatar": avatar_img},
            {"_uid": "test-4", "component": "testimonial_item", "quote": "\"Vi har testat m\u00e5nga l\u00f6sningar men Vroff \u00e4r \u00f6verl\u00e4gsen. \u00c4ntligen ett verktyg som k\u00e4nns m\u00e4nskligt.\"", "name": "Maria Andersson", "role": "Teamledare, GreenConsult", "avatar": avatar_img},
        ]
    },
    {
        "_uid": "security-1",
        "component": "security",
        "headline": "S\u00e4kerhet",
        "description": "Din data \u00e4r trygg hos oss. Vi tar s\u00e4kerhet p\u00e5 allvar med kryptering, oberoende drift och svensk lagstiftning.",
        "items": [
            {"_uid": "sec-1", "component": "security_item", "title": "Krypterat", "description": "Sj\u00e4lvklart \u00e4r Vroff fullt krypterat (AES-256). Ingen annan \u00e4n dina medarbetare kan komma \u00e5t datan.", "image": sec1_img},
            {"_uid": "sec-2", "component": "security_item", "title": "Oberoende", "description": "Vroff driftas oberoende av tredjepartstj\u00e4nster. Din data stannar hos oss, utan mellanh\u00e4nder.", "image": sec2_img},
            {"_uid": "sec-3", "component": "security_item", "title": "Svenskt", "description": "Vroff utvecklas och driftas i Sverige och omfattas av GDPR, DORA, NIS2 och \u00f6vriga EU-regelverk.", "image": sec3_img},
        ]
    },
    {
        "_uid": "film-1",
        "component": "film_section",
        "title": "Se filmen",
        "duration": "4:13",
        "description": "Se hur Vroff fungerar i praktiken. Fr\u00e5n registrering till f\u00f6rsta m\u00f6tet p\u00e5 under en minut.",
        "thumbnail": film_img,
    },
    {
        "_uid": "stepper-1",
        "component": "stepper",
        "headline": "Komma ig\u00e5ng p\u00e5 30 sekunder",
        "steps": [
            {"_uid": "step-1", "component": "stepper_item", "label": "Ladda ned", "title": "Ladda ned Vroff", "content": "V\u00e4lj din plattform och ladda ned appen. Finns f\u00f6r Mac, Windows, iOS och Android."},
            {"_uid": "step-2", "component": "stepper_item", "label": "Skapa konto", "title": "Skapa ditt konto", "content": "Fyll i namn och e-post. Du f\u00e5r en bekr\u00e4ftelse direkt."},
            {"_uid": "step-3", "component": "stepper_item", "label": "Bjud in andra", "title": "Bjud in ditt team", "content": "L\u00e4gg till kollegor med e-post. De f\u00e5r en inbjudan inom sekunder."},
            {"_uid": "step-4", "component": "stepper_item", "label": "\u00d6ppna rummet", "title": "\u00d6ppna ert f\u00f6rsta rum", "content": "Skapa ett rum, ge det ett namn, och b\u00f6rja samarbeta direkt."},
            {"_uid": "step-5", "component": "stepper_item", "label": "Nu \u00e4r du ig\u00e5ng :-)", "title": "Klart!", "content": "Du och ditt team \u00e4r nu redo att samarbeta p\u00e5 ett m\u00e4nskligare s\u00e4tt."},
        ]
    },
    {
        "_uid": "pricing-1",
        "component": "pricing_section",
        "headline": "Pris",
        "compare_button_text": "Se fullst\u00e4ndig prisj\u00e4mf\u00f6relse",
        "tiers": [
            {
                "_uid": "tier-1", "component": "pricing_tier",
                "name": "Free", "sub": "Prova", "price": "0 SEK", "price_sub": "Gratis f\u00f6r alla",
                "desc": "Perfekt f\u00f6r att testa och komma ig\u00e5ng.",
                "features": [
                    {"_uid": "pf-1a", "component": "pricing_feature", "name": "5 anv\u00e4ndare", "included": True},
                    {"_uid": "pf-1b", "component": "pricing_feature", "name": "10 GB lagring", "included": True},
                    {"_uid": "pf-1c", "component": "pricing_feature", "name": "Grundl\u00e4ggande support", "included": True},
                    {"_uid": "pf-1d", "component": "pricing_feature", "name": "Mobil app", "included": True},
                    {"_uid": "pf-1e", "component": "pricing_feature", "name": "Videomoeten 30 min", "included": True},
                    {"_uid": "pf-1f", "component": "pricing_feature", "name": "Realtidsredigering", "included": False},
                    {"_uid": "pf-1g", "component": "pricing_feature", "name": "API-\u00e5tkomst", "included": False},
                ]
            },
            {
                "_uid": "tier-2", "component": "pricing_tier",
                "name": "Pro", "sub": "Vardagsanv\u00e4ndning", "price": "10 SEK", "price_sub": "Per m\u00e5nad med \u00e5rsrabatt.",
                "desc": "F\u00f6r v\u00e4xande team som beh\u00f6ver mer kraft.",
                "features": [
                    {"_uid": "pf-2a", "component": "pricing_feature", "name": "25 anv\u00e4ndare", "included": True},
                    {"_uid": "pf-2b", "component": "pricing_feature", "name": "100 GB lagring", "included": True},
                    {"_uid": "pf-2c", "component": "pricing_feature", "name": "Prioriterad support", "included": True},
                    {"_uid": "pf-2d", "component": "pricing_feature", "name": "Mobil app", "included": True},
                    {"_uid": "pf-2e", "component": "pricing_feature", "name": "Videomoeten 2 timmar", "included": True},
                    {"_uid": "pf-2f", "component": "pricing_feature", "name": "Realtidsredigering", "included": True},
                    {"_uid": "pf-2g", "component": "pricing_feature", "name": "API-\u00e5tkomst", "included": False},
                ]
            },
            {
                "_uid": "tier-3", "component": "pricing_tier",
                "name": "Max", "sub": "Allt vi har plus mer", "price": "20 SEK", "price_sub": "Per m\u00e5nad per person",
                "desc": "Fullst\u00e4ndig l\u00f6sning f\u00f6r st\u00f6rre organisationer.",
                "features": [
                    {"_uid": "pf-3a", "component": "pricing_feature", "name": "Obegr\u00e4nsat anv\u00e4ndare", "included": True},
                    {"_uid": "pf-3b", "component": "pricing_feature", "name": "1 TB lagring", "included": True},
                    {"_uid": "pf-3c", "component": "pricing_feature", "name": "Dedikerad support", "included": True},
                    {"_uid": "pf-3d", "component": "pricing_feature", "name": "Mobil app", "included": True},
                    {"_uid": "pf-3e", "component": "pricing_feature", "name": "Obegr\u00e4nsade videomoeten", "included": True},
                    {"_uid": "pf-3f", "component": "pricing_feature", "name": "Realtidsredigering", "included": True},
                    {"_uid": "pf-3g", "component": "pricing_feature", "name": "API-\u00e5tkomst", "included": True},
                ]
            },
        ]
    },
    {
        "_uid": "faq-1",
        "component": "faq",
        "headline": "Vanliga fr\u00e5gor",
        "cta_text": "Se alla fr\u00e5gor",
        "cta_link": "/faq",
        "items": [
            {"_uid": "faq-i1", "component": "faq_item", "question": "Vad kostar Vroff?", "answer": "Vroff har tre planer: Free (gratis), Pro (10 SEK/m\u00e5nad) och Max (20 SEK/m\u00e5nad per person). Free-planen r\u00e4cker f\u00f6r att testa och mindre team."},
            {"_uid": "faq-i2", "component": "faq_item", "question": "Kan jag anv\u00e4nda Vroff p\u00e5 mobilen?", "answer": "Ja! Vroff finns som app f\u00f6r iOS och Android, samt som webbapp. Allt synkas i realtid mellan enheter."},
            {"_uid": "faq-i3", "component": "faq_item", "question": "Hur s\u00e4kert \u00e4r Vroff?", "answer": "Vroff anv\u00e4nder AES-256-kryptering, driftas i Sverige under GDPR och NIS2, och din data delas aldrig med tredjeparter."},
            {"_uid": "faq-i4", "component": "faq_item", "question": "Kan jag migrera fr\u00e5n andra verktyg?", "answer": "Absolut. Vi har importfunktioner f\u00f6r Slack, Teams och Google Workspace. V\u00e5r support hj\u00e4lper dig genom hela processen."},
        ]
    },
    {
        "_uid": "cases-1",
        "component": "case_study",
        "headline": "Kundcase",
        "items": [
            {"_uid": "case-1", "component": "case_item", "name": "Katarina", "title": "Tr\u00e4ffa\nKatarina!", "description": "Katarina ledde digitaliseringen av sitt 50-personers team. Med Vroff minskade e-postfl\u00f6det med 80%.", "button_text": "L\u00e4s hela story", "slug": "katarina", "image": case_img},
            {"_uid": "case-2", "component": "case_item", "name": "Lena", "title": "Tr\u00e4ffa\nLena", "description": "Lena driver en designbyr\u00e5 med 12 anst\u00e4llda. Vroff ersatte fyra olika verktyg och sparade 15 timmar i veckan.", "button_text": "L\u00e4s hela story", "slug": "lena", "image": case_img},
            {"_uid": "case-3", "component": "case_item", "name": "Erik", "title": "Tr\u00e4ffa\nErik!", "description": "Erik \u00e4r CTO p\u00e5 ett snabbv\u00e4xande startup. Vroff gav hans team struktur utan att bromsa kreativiteten.", "button_text": "L\u00e4s hela story", "slug": "erik", "image": case_img},
        ]
    },
    {
        "_uid": "footer-1",
        "component": "footer",
        "columns": [
            {"_uid": "fc-1", "component": "footer_column", "title": "Produkt", "links": [
                {"_uid": "fl-1a", "component": "footer_link", "label": "Funktioner", "url": "#features"},
                {"_uid": "fl-1b", "component": "footer_link", "label": "Pris", "url": "#pricing"},
                {"_uid": "fl-1c", "component": "footer_link", "label": "S\u00e4kerhet", "url": "#security"},
                {"_uid": "fl-1d", "component": "footer_link", "label": "Uppdateringar", "url": "/updates"},
                {"_uid": "fl-1e", "component": "footer_link", "label": "Integrationer", "url": "/integrations"},
            ]},
            {"_uid": "fc-2", "component": "footer_column", "title": "F\u00f6retag", "links": [
                {"_uid": "fl-2a", "component": "footer_link", "label": "Om oss", "url": "/about"},
                {"_uid": "fl-2b", "component": "footer_link", "label": "Karri\u00e4r", "url": "/careers"},
            ]},
            {"_uid": "fc-3", "component": "footer_column", "title": "Resurser", "links": [
                {"_uid": "fl-3a", "component": "footer_link", "label": "Dokumentation", "url": "/docs"},
                {"_uid": "fl-3b", "component": "footer_link", "label": "Guider", "url": "/guides"},
                {"_uid": "fl-3c", "component": "footer_link", "label": "API", "url": "/api"},
            ]},
            {"_uid": "fc-4", "component": "footer_column", "title": "Support", "links": [
                {"_uid": "fl-4a", "component": "footer_link", "label": "Hj\u00e4lpcenter", "url": "/help"},
                {"_uid": "fl-4b", "component": "footer_link", "label": "Kontakt", "url": "/contact"},
            ]},
            {"_uid": "fc-5", "component": "footer_column", "title": "Juridik", "links": [
                {"_uid": "fl-5a", "component": "footer_link", "label": "Integritetspolicy", "url": "/privacy"},
                {"_uid": "fl-5b", "component": "footer_link", "label": "Villkor", "url": "/terms"},
                {"_uid": "fl-5c", "component": "footer_link", "label": "Cookies", "url": "/cookies"},
                {"_uid": "fl-5d", "component": "footer_link", "label": "GDPR", "url": "/gdpr"},
                {"_uid": "fl-5e", "component": "footer_link", "label": "S\u00e4kerhet", "url": "/security"},
            ]},
            {"_uid": "fc-6", "component": "footer_column", "title": "Socialt", "links": [
                {"_uid": "fl-6a", "component": "footer_link", "label": "LinkedIn", "url": "https://linkedin.com"},
                {"_uid": "fl-6b", "component": "footer_link", "label": "Twitter", "url": "https://twitter.com"},
                {"_uid": "fl-6c", "component": "footer_link", "label": "Instagram", "url": "https://instagram.com"},
                {"_uid": "fl-6d", "component": "footer_link", "label": "GitHub", "url": "https://github.com"},
            ]},
        ]
    },
]

payload = {
    "story": {
        "name": "Home",
        "slug": "home",
        "content": {
            "component": "page",
            "body": body,
        }
    },
    "publish": 1,
}

data = json.dumps(payload).encode("utf-8")
req = urllib.request.Request(
    f"https://mapi.storyblok.com/v1/spaces/{SPACE_ID}/stories/{HOME_STORY_ID}",
    data=data,
    method="PUT",
    headers={
        "Authorization": MAPI_TOKEN,
        "Content-Type": "application/json",
    },
)

try:
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())
        blocks = result.get("story", {}).get("content", {}).get("body", [])
        print(f"Success! Updated home story with {len(blocks)} blocks")
        for b in blocks:
            comp = b.get("component")
            has_img = False
            if b.get("background_image", {}).get("filename"):
                has_img = True
            if b.get("thumbnail", {}).get("filename"):
                has_img = True
            for item in b.get("items", []) + b.get("steps", []) + b.get("tiers", []):
                if item.get("image", {}).get("filename") or item.get("avatar", {}).get("filename"):
                    has_img = True
            print(f"  - {comp} {'(with images)' if has_img else ''}")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"Error {e.code}: {body[:500]}")
