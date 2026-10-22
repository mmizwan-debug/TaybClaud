# Tayb Meals — SEO / GEO log

**Target audience (owner, 2026-10-22):** Malayalis (Kerala) AND Tamil-speaking people in Dubai, equal priority, plus other South Indians. North Indian/global meals are secondary.

## 2026-10-22 — Morning check (first run)

### Rankings
Search tool used is a US-based web index, not Google UAE, so positions are a rough signal only.
- "monthly mess dubai": taybmeals.com not found. Shows Royal Kalavara Monthly Mess (Karama, magicpin), plus unrelated Airbnb/Dubizzle results.
- "kerala mess dubai": not found. Results are Kerala restaurant guides (Property Finder, Gulf News) — no mess/subscription players.
- "tiffin service dubai": not found. Gulf News "tiffin culture in the UAE" article, Tiffin Wala Bur Dubai (hidubai.com).
- "home food delivery dubai monthly": not found. Gulf News meal-plan articles, Meals on Me, MakeMyMeal.
- "monthly meal plan dubai AED": not found. Dominated by diet meal plans (Right Bite, Meals on Me, EMP).
- "monthly mess karama": not found. Royal Kalavara (magicpin) again.
- "mess jebel ali": not found. No mess businesses at all — only port/area pages (low competition gap).
- "Tayb Meals Dubai" (brand): not found. Results show "Tayeb Kitchen Restaurant" (Deira) and "Tayba Gourmet" — name-confusion risk.

### AI/GEO visibility
- "best tiffin service in Dubai": sources are Gulf News (tiffin culture article), hidubai.com (Dubai govt business directory), a Google Business listing (Dabbawaalah Tiffin Services), limetray (Tiffin & More). Tayb Meals not mentioned anywhere.
- Likely AI-cited sources for this niche: Gulf News / Khaleej Times articles, hidubai.com, magicpin, Google Maps/Business Profile, Right Bite & Meals on Me blogs ("best meal plan in Dubai 2026").
- No third-party page found that mentions Tayb Meals → AI assistants have nothing to cite yet.

### Site health
- Live fetch of taybmeals.com was blocked from this run's sandbox (proxy/permission), so live load not verified. Checks below are from the repo code.
- Titles + meta descriptions present on all 3 pages; canonicals present; OG tags on homepage; robots.txt OK and points to sitemap.
- JSON-LD on index.html parses OK: FoodEstablishment + FAQPage (13 questions). Missing: url, areaServed, offers (199/359/459), openingHours, sameAs, geo. menu.html and delivery-timings.html have no JSON-LD.
- **sitemap.xml is missing /menu.html** (only / and /delivery-timings.html).
- No broken local links/images found in the 3 pages.
- **Homepage never uses the words people search: "monthly mess" (0), "mess" (0), "tiffin" (0), "Kerala" (0), "Jebel Ali" (0).** Title is generic: "Modern Food Delivery in Dubai".

### Plan for tonight
1. Rewrite homepage title/meta/intro copy to include the real search terms, e.g. title "Monthly Mess & Tiffin Service in Dubai from AED 199 | Tayb Meals"; mention Kerala, South & North Indian homestyle food and key areas (Jebel Ali, Al Quoz, Karama, DIP...) in visible text.
2. Strengthen JSON-LD: add url, areaServed (Dubai areas list), Offer/OfferCatalog for AED 199/359/459 monthly plans, openingHours Mo–Sa, sameAs (WhatsApp/socials); add FAQ "Is Tayb Meals a monthly mess / tiffin service?" and "Do you serve Kerala food?".
3. Add menu.html to sitemap.xml and update lastmod.

### Owner to-do
- Create/claim Google Business Profile ("Tayb Meals – Monthly Mess & Tiffin, Dubai").
- List on hidubai.com (free Dubai business directory) and magicpin.

### Update 2026-10-22 (owner)
- Owner applied the homepage SEO prompt: new title "Monthly Mess & Tiffin Service in Dubai from AED 199", menu.html added to sitemap, JSON-LD still parses OK. Homepage now mentions Kerala 17×, mess 17×, tiffin 16×, Tamil 2×.
- Next ideas for this audience: more Tamil Nadu / South Indian wording where it's true to the menu; a /kerala-mess-dubai.html page (as a PR); area pages for Karama, Al Qusais, Al Nahda, International City.

### Update 2026-10-22 (owner request) — delivery areas
- Expanded delivery areas from 42 to 122 across the timing zones (js/delivery-zones.js), the areaServed JSON-LD and the "Where do you deliver?" FAQ. New areas were put in the zone of their nearest existing neighbour — owner to confirm times for: Palm Jumeirah, Emirates Hills/Springs/Meadows, Arabian Ranches, Damac Hills 1&2, Expo City, The Valley, Dubai Creek Harbour, JAFZA.

### Update 2026-10-22 (afternoon)
- Done: "all across Dubai" wording everywhere (owner request); menu.html title/meta now Kerala & South Indian with real dishes; delivery-timings title/meta; added /llms.txt; robots.txt explicitly allows GPTBot, OAI-SearchBot, Google-Extended, PerplexityBot, ClaudeBot. Owner updated hours to Mon–Sat 7am–9pm, Sun 11am–2pm.
- Evening run: skip these; next ideas are a short quotable "About Tayb Meals" paragraph and a /kerala-mess-dubai.html page proposal (PR).
- Owner confirmed timings for far areas: Palm Jumeirah, Arabian Ranches, Damac Hills 2, Expo City, The Valley, Dubai Creek Harbour, JAFZA → new Zone F (breakfast & lunch before 7:30 AM, dinner before 8:00 PM).
- Arabian Ranches 2 & 3 moved to Zone F (owner confirmed).
- Owner approved: hero welcome line "வணக்கம் · നമസ്കാരം · Welcome" above the homepage headline (Tamil + Malayalam greeting).
- New page /about.html (owner approved): quotable summary, story, Kerala + Tamil Nadu dishes, who we cook for, at-a-glance facts table, how to start; AboutPage + Breadcrumb JSON-LD linked to #business on index; footer "About Us" link on all pages; added to sitemap and llms.txt.
- Owner to confirm: testimonials are real customers; "200+" vs "250+" dishes; "7 days a week" line vs Mon–Sat; "A-grade DFA certified kitchen" (only in meta keywords).
