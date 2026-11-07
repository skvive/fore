# Blogger publishing architecture (not connected yet)

1. Sign in to the intended Google account and create/verify a Blogger blog. Record `BLOG_ID` and verify editor/admin permissions.
2. Configure a Google Cloud project, Blogger API v3 and OAuth consent. Grant only `https://www.googleapis.com/auth/blogger` to an editor account; store refresh tokens in private Vercel/Neon secrets, never in GitHub, JS or HTML.
3. Poll `https://fore.lexid.site/rss.xml` daily and validate unique canonical `guid` and source revision. Show a review queue for medical fact checking and advertising compliance; only approved posts may publish.
4. Use Blogger API `posts.insert` with `blogId` and approved sanitized HTML. Keep link back to the canonical source URL and disclose original author/time. Map published Blogger post ID to source GUID for idempotency.
5. Optionally poll published Blogger posts through API (with the same authenticated principal), import approved summaries into `/journal.html` during a site rebuild. Do not scrape private drafts or publish personal health data.
6. Recurring automation: source RSS -> content quality gate -> deduplication -> human approval -> Blogger API -> official-site notice update -> logs/retry. Enable only after OAuth and moderation are configured.

**Current state:** Website RSS feed and Blogger design prototype are included. No BLOG_ID, OAuth credentials, or approved medical posts are available. Therefore there is no live Blogger write or reciprocal synchronization.
