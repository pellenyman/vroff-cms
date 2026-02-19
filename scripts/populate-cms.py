#!/usr/bin/env python3
"""Populate Storyblok home story with complete content for all sections."""
import json
import urllib.request

SPACE_ID = "290635417094692"
MAPI_TOKEN = "lM0cvxnOiTxP8vfRYNSjIgtt-146566979415798-a_N3hgWnyEyGyarx3wza"
HOME_STORY_ID = "146567046690579"

body = [
    # ─── HEADER / NAV ───
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
    # ─── HERO ───
    {
        "_uid": "hero-1",
        "component": "hero",
        "headline": "Vroff är det nya mänskligare sättet att samarbeta",
        "subtext": "Samla hela teamet på ett ställe. Chatta, dela filer, håll videomöten och planera projekt – utan krångel.",
        "cta_text": "Prova på",
    },
    # ─── FEATURES ───
    {
        "_uid": "features-1",
        "component": "feature",
        "headline": "Detta är Vroff",
        "description": "Vroff samlar kommunikation, fildelning och projektplanering i en enda app. Sluta växla mellan verktyg – allt finns här.",
        "items": [
            {
                "_uid": "feat-1",
                "component": "feature_item",
                "title": "Allt på ett ställe",
                "description": "Chatt, videosamtal, fildelning och uppgiftshantering i samma vy. Du behöver aldrig lämna Vroff.",
            },
            {
                "_uid": "feat-2",
                "component": "feature_item",
                "title": "Kalender",
                "description": "Synka teamets schema automatiskt. Se vem som är ledig, boka möten och få påminnelser – allt integrerat.",
                "background_color": "#b4bbfd",
            },
            {
                "_uid": "feat-3",
                "component": "feature_item",
                "title": "Smart sökning",
                "description": "Hitta meddelanden, filer och anteckningar blixtsnabbt. Vroff indexerar allt så du aldrig tappar bort något.",
            },
        ]
    },
    # ─── TESTIMONIALS ───
    {
        "_uid": "testimonials-1",
        "component": "testimonial",
        "headline": "Vad folk säger",
        "items": [
            {"_uid": "test-1", "component": "testimonial_item", "quote": "\"Vi sparar minst två timmar om dagen sedan vi gick över till Vroff. Alla älskar det.\"", "name": "Helen Hansson", "role": "HR-chef, TechAB"},
            {"_uid": "test-2", "component": "testimonial_item", "quote": "\"Vroff har revolutionerat hur vi samarbetar. Allt finns på ett ställe och det bara funkar.\"", "name": "Erik Svensson", "role": "Produktchef, Startify"},
            {"_uid": "test-3", "component": "testimonial_item", "quote": "\"Enkelt att komma igång och supporten är förstklassig. Rekommenderar varmt.\"", "name": "Anna Karlsson", "role": "VD, Designbyrån Forma"},
            {"_uid": "test-4", "component": "testimonial_item", "quote": "\"Vi har testat många lösningar men Vroff är överlägsen. Äntligen ett verktyg som känns mänskligt.\"", "name": "Maria Andersson", "role": "Teamledare, GreenConsult"},
        ]
    },
    # ─── SECURITY ───
    {
        "_uid": "security-1",
        "component": "security",
        "headline": "Säkerhet",
        "description": "Din data är trygg hos oss. Vi tar säkerhet på allvar med kryptering, oberoende drift och svensk lagstiftning.",
        "items": [
            {"_uid": "sec-1", "component": "security_item", "title": "Krypterat", "description": "Självklart är Vroff fullt krypterat (AES-256). Ingen annan än dina medarbetare kan komma åt datan."},
            {"_uid": "sec-2", "component": "security_item", "title": "Oberoende", "description": "Vroff driftas oberoende av tredjepartstjänster. Din data stannar hos oss, utan mellanhänder."},
            {"_uid": "sec-3", "component": "security_item", "title": "Svenskt", "description": "Vroff utvecklas och driftas i Sverige och omfattas av GDPR, DORA, NIS2 och övriga EU-regelverk."},
        ]
    },
    # ─── FILM ───
    {
        "_uid": "film-1",
        "component": "film_section",
        "title": "Se filmen",
        "duration": "4:13",
        "description": "Se hur Vroff fungerar i praktiken. Från registrering till första mötet på under en minut.",
    },
    # ─── GET STARTED / STEPPER ───
    {
        "_uid": "stepper-1",
        "component": "stepper",
        "headline": "Komma igång på 30 sekunder",
        "steps": [
            {"_uid": "step-1", "component": "stepper_item", "label": "Ladda ned", "title": "Ladda ned Vroff", "content": "Välj din plattform och ladda ned appen. Finns för Mac, Windows, iOS och Android."},
            {"_uid": "step-2", "component": "stepper_item", "label": "Skapa konto", "title": "Skapa ditt konto", "content": "Fyll i namn och e-post. Du får en bekräftelse direkt."},
            {"_uid": "step-3", "component": "stepper_item", "label": "Bjud in andra", "title": "Bjud in ditt team", "content": "Lägg till kollegor med e-post. De får en inbjudan inom sekunder."},
            {"_uid": "step-4", "component": "stepper_item", "label": "Öppna rummet", "title": "Öppna ert första rum", "content": "Skapa ett rum, ge det ett namn, och börja samarbeta direkt."},
            {"_uid": "step-5", "component": "stepper_item", "label": "Nu är du igång :-)", "title": "Klart!", "content": "Du och ditt team är nu redo att samarbeta på ett mänskligare sätt."},
        ]
    },
    # ─── PRICING ───
    {
        "_uid": "pricing-1",
        "component": "pricing_section",
        "headline": "Pris",
        "compare_button_text": "Se fullständig prisjämförelse",
        "tiers": [
            {
                "_uid": "tier-1", "component": "pricing_tier",
                "name": "Free", "sub": "Prova", "price": "0 SEK", "price_sub": "Gratis för alla",
                "desc": "Perfekt för att testa och komma igång.",
                "features": [
                    {"_uid": "pf-1a", "component": "pricing_feature", "name": "5 användare", "included": True},
                    {"_uid": "pf-1b", "component": "pricing_feature", "name": "10 GB lagring", "included": True},
                    {"_uid": "pf-1c", "component": "pricing_feature", "name": "Grundläggande support", "included": True},
                    {"_uid": "pf-1d", "component": "pricing_feature", "name": "Mobil app", "included": True},
                    {"_uid": "pf-1e", "component": "pricing_feature", "name": "Videomöten 30 min", "included": True},
                    {"_uid": "pf-1f", "component": "pricing_feature", "name": "Realtidsredigering", "included": False},
                    {"_uid": "pf-1g", "component": "pricing_feature", "name": "API-åtkomst", "included": False},
                ]
            },
            {
                "_uid": "tier-2", "component": "pricing_tier",
                "name": "Pro", "sub": "Vardagsanvändning", "price": "10 SEK", "price_sub": "Per månad med årsrabatt.",
                "desc": "För växande team som behöver mer kraft.",
                "features": [
                    {"_uid": "pf-2a", "component": "pricing_feature", "name": "25 användare", "included": True},
                    {"_uid": "pf-2b", "component": "pricing_feature", "name": "100 GB lagring", "included": True},
                    {"_uid": "pf-2c", "component": "pricing_feature", "name": "Prioriterad support", "included": True},
                    {"_uid": "pf-2d", "component": "pricing_feature", "name": "Mobil app", "included": True},
                    {"_uid": "pf-2e", "component": "pricing_feature", "name": "Videomöten 2 timmar", "included": True},
                    {"_uid": "pf-2f", "component": "pricing_feature", "name": "Realtidsredigering", "included": True},
                    {"_uid": "pf-2g", "component": "pricing_feature", "name": "API-åtkomst", "included": False},
                ]
            },
            {
                "_uid": "tier-3", "component": "pricing_tier",
                "name": "Max", "sub": "Allt vi har plus mer", "price": "20 SEK", "price_sub": "Per månad per person",
                "desc": "Fullständig lösning för större organisationer.",
                "features": [
                    {"_uid": "pf-3a", "component": "pricing_feature", "name": "Obegränsat användare", "included": True},
                    {"_uid": "pf-3b", "component": "pricing_feature", "name": "1 TB lagring", "included": True},
                    {"_uid": "pf-3c", "component": "pricing_feature", "name": "Dedikerad support", "included": True},
                    {"_uid": "pf-3d", "component": "pricing_feature", "name": "Mobil app", "included": True},
                    {"_uid": "pf-3e", "component": "pricing_feature", "name": "Obegränsade videomöten", "included": True},
                    {"_uid": "pf-3f", "component": "pricing_feature", "name": "Realtidsredigering", "included": True},
                    {"_uid": "pf-3g", "component": "pricing_feature", "name": "API-åtkomst", "included": True},
                ]
            },
        ]
    },
    # ─── FAQ ───
    {
        "_uid": "faq-1",
        "component": "faq",
        "headline": "Vanliga frågor",
        "cta_text": "Se alla frågor",
        "cta_link": "/faq",
        "items": [
            {"_uid": "faq-i1", "component": "faq_item", "question": "Vad kostar Vroff?", "answer": "Vroff har tre planer: Free (gratis), Pro (10 SEK/månad) och Max (20 SEK/månad per person). Free-planen räcker för att testa och mindre team."},
            {"_uid": "faq-i2", "component": "faq_item", "question": "Kan jag använda Vroff på mobilen?", "answer": "Ja! Vroff finns som app för iOS och Android, samt som webbapp. Allt synkas i realtid mellan enheter."},
            {"_uid": "faq-i3", "component": "faq_item", "question": "Hur säkert är Vroff?", "answer": "Vroff använder AES-256-kryptering, driftas i Sverige under GDPR och NIS2, och din data delas aldrig med tredjeparter."},
            {"_uid": "faq-i4", "component": "faq_item", "question": "Kan jag migrera från andra verktyg?", "answer": "Absolut. Vi har importfunktioner för Slack, Teams och Google Workspace. Vår support hjälper dig genom hela processen."},
        ]
    },
    # ─── CASES ───
    {
        "_uid": "cases-1",
        "component": "case_study",
        "headline": "Kundcase",
        "items": [
            {"_uid": "case-1", "component": "case_item", "name": "Katarina", "title": "Träffa\nKatarina!", "description": "Katarina ledde digitaliseringen av sitt 50-personers team. Med Vroff minskade e-postflödet med 80%.", "button_text": "Läs hela story", "slug": "katarina"},
            {"_uid": "case-2", "component": "case_item", "name": "Lena", "title": "Träffa\nLena", "description": "Lena driver en designbyrå med 12 anställda. Vroff ersatte fyra olika verktyg och sparade 15 timmar i veckan.", "button_text": "Läs hela story", "slug": "lena"},
            {"_uid": "case-3", "component": "case_item", "name": "Erik", "title": "Träffa\nErik!", "description": "Erik är CTO på ett snabbväxande startup. Vroff gav hans team struktur utan att bromsa kreativiteten.", "button_text": "Läs hela story", "slug": "erik"},
        ]
    },
    # ─── FOOTER ───
    {
        "_uid": "footer-1",
        "component": "footer",
        "columns": [
            {"_uid": "fc-1", "component": "footer_column", "title": "Produkt", "links": [
                {"_uid": "fl-1a", "component": "footer_link", "label": "Funktioner", "url": "#features"},
                {"_uid": "fl-1b", "component": "footer_link", "label": "Pris", "url": "#pricing"},
                {"_uid": "fl-1c", "component": "footer_link", "label": "Säkerhet", "url": "#security"},
                {"_uid": "fl-1d", "component": "footer_link", "label": "Uppdateringar", "url": "/updates"},
                {"_uid": "fl-1e", "component": "footer_link", "label": "Integrationer", "url": "/integrations"},
            ]},
            {"_uid": "fc-2", "component": "footer_column", "title": "Företag", "links": [
                {"_uid": "fl-2a", "component": "footer_link", "label": "Om oss", "url": "/about"},
                {"_uid": "fl-2b", "component": "footer_link", "label": "Karriär", "url": "/careers"},
            ]},
            {"_uid": "fc-3", "component": "footer_column", "title": "Resurser", "links": [
                {"_uid": "fl-3a", "component": "footer_link", "label": "Dokumentation", "url": "/docs"},
                {"_uid": "fl-3b", "component": "footer_link", "label": "Guider", "url": "/guides"},
                {"_uid": "fl-3c", "component": "footer_link", "label": "API", "url": "/api"},
            ]},
            {"_uid": "fc-4", "component": "footer_column", "title": "Support", "links": [
                {"_uid": "fl-4a", "component": "footer_link", "label": "Hjälpcenter", "url": "/help"},
                {"_uid": "fl-4b", "component": "footer_link", "label": "Kontakt", "url": "/contact"},
            ]},
            {"_uid": "fc-5", "component": "footer_column", "title": "Juridik", "links": [
                {"_uid": "fl-5a", "component": "footer_link", "label": "Integritetspolicy", "url": "/privacy"},
                {"_uid": "fl-5b", "component": "footer_link", "label": "Villkor", "url": "/terms"},
                {"_uid": "fl-5c", "component": "footer_link", "label": "Cookies", "url": "/cookies"},
                {"_uid": "fl-5d", "component": "footer_link", "label": "GDPR", "url": "/gdpr"},
                {"_uid": "fl-5e", "component": "footer_link", "label": "Säkerhet", "url": "/security"},
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
        print(f"Success! Updated home story with {len(blocks)} blocks:")
        for b in blocks:
            print(f"  - {b.get('component')}")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"Error {e.code}: {body[:500]}")
