# 더포레 브랜드·배포·연동 가이드 v1.0.0

## Brand
- Positioning: caring and credible premium rehab/wellness concept for patients and 40–60s family guardians.
- Name: 더포레 요양병원 / THE FORET CARE HOSPITAL.
- Tagline: 다시, 걷고. 다시, 일상을 누리는 곳.
- Colors: Forest `#28553b`, Sage `#e9efe6`, Warm cream `#f9f7f1`, Bronze `#ba9b70`, text `#24382c`.
- Logo: original tree/leaf motif (`assets/logo.svg`) — scalable, not based on any existing hospital logo.
- Brand voice: calm, factual, non-coercive, respectful and family-focused.

## Design pages
1. Main: hero, service center cards, architecture, admission pathway, news.
2. Centers: neurorehab, assisted gait robotics, cancer wellness, renal care (all conceptual).
3. Rooms: private/shared space concepts; 360 viewer requires actual panoramic assets and rights.
4. Estimate: selectable disease category, occupancy, care category, 15/30/60 days; fictitious unit rates.
5. Admission: checklist and no-upload demo mode.
6. Journal: evidence-aware medical content briefs.
7. Blog: Blogger theme preview, not an actual active Google Blog.

## Actual launch gate
- Confirm provider license and legal business details, official address and telephone, specialist rosters, supported treatments, hours, bed counts, facilities, image rights, accurate fee schedule and medical-ad review before removing DEMO notice.
- Authenticate Blogger property and API scopes; prevent cross-posting duplicates using source canonical identifiers.
- For real patient uploads: server-backed authentication, least-privilege clinician access, encrypted object storage, DLP, audit logs, retention/deletion policies, anti-malware scanning and incident response. Keep patient uploads OUT of GitHub, Vercel public directories and RSS/blog.
- Confirm Google Search Console domain ownership and submit sitemap there; a published sitemap is not proof of registration.

## SEO and publication
- `https://fore.lexid.site/sitemap.xml` provides page discoverability; `robots.txt` references it.
- `rss.xml` contains non-PHI journal summaries only.
- 2026 finance/medical information must be reviewed by qualified staff before posting.
- See `blogger/BLOGGER_INTEGRATION.md` for secure OAuth publishing flow.
