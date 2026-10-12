# Bespoke Bioinformatics — website

A plain static site (HTML + CSS, ~1.8 MB). No build step, no database, nothing to patch.

## 1. Preview it
Open a terminal in this folder and run `python3 -m http.server 8000`, then visit http://localhost:8000.
(Double-clicking index.html also works, but use the server to see it exactly as it will appear online.)

## 2. Before you launch (checklist)
- [x] **Impressum + Privacy Policy**: done (privacy policy adapted from the Wix version; have a lawyer or the e-recht24 generator check both)
- [ ] **Contact form**: connected to a Google Apps Script web app (runs as your Workspace account and emails info@).
      Do a real test submission from the live site and check your inbox and spam. If you edit the script, redeploy it
      via Deploy > Manage deployments > edit > New version (the /exec URL stays the same).
- [ ] **ORCID link**: replace `https://orcid.org/` in publications.html with your own ORCID URL.
- [ ] **Testimonials**: the Arda quote (shortened) is shown first, then Iris Muller. Ask Adam Freund to OK the shortened wording. To add more, copy a `<figure class="testimonial">` block in past-projects.html.
- [ ] Optional: swap the banner photo (`assets/img/banner-cells.jpg`) or pricing background (see comment in `assets/css/style.css`).

## 3. Put it on GitHub (so changes are easy)
In this folder:
```
git init -b main
git add .
git commit -m "Initial version of bespokebioinformatics.com"
```
Then create an empty repository on github.com (e.g. `bespokebioinformatics`, private is fine), and run the two commands GitHub shows:
```
git remote add origin git@github.com:YOUR-USERNAME/bespokebioinformatics.git
git push -u origin main
```
From then on: edit a file, `git commit -am "message"`, `git push`.

## 4. Host it on DanubeData (EU, Germany)
Their free tier offers git, CLI and ZIP deploys, 2 custom domains, automatic TLS, 10 GB/month bandwidth. Check their dashboard/docs for the exact steps, which I haven't been able to test:
1. Create a static site and connect your GitHub repo (or upload a ZIP of this folder's contents so index.html is at the top level).
2. No build step is needed; the publish directory is the repo root.
3. Check the temporary address, then add `www.bespokebioinformatics.com` as a custom domain and create the DNS record they specify.
Note: the `_headers` file is a Cloudflare/Netlify convention and may be ignored. That is harmless.

## 5. Domain and email (do this carefully, in this order)
1. Find where the domain is registered (Wix dashboard → Domains). If it was bought through Wix, you can
   either (a) transfer it to a cheaper registrar (Cloudflare Registrar sells at cost, ~€10–15/yr; Wix requires
   unlocking it and an authorisation code; domains registered/transferred in the last 60 days can't move), or
   (b) keep it at Wix for now and only change its DNS/nameservers to point at Cloudflare.
2. **Email first:** if info@bespokebioinformatics.com currently runs through Wix/Google Workspace, set up
   replacement email *before* moving DNS. Cheapest: Cloudflare Email Routing (free) forwarding info@ to your normal inbox
   (replying "as" info@ needs an extra step, e.g. Gmail "Send mail as"). Otherwise keep Google Workspace / Zoho and
   copy its MX records into Cloudflare DNS.
3. Add the domain to Cloudflare, copy any existing records you still need (MX, SPF/TXT), then switch the nameservers.
4. Only cancel the Wix plan once the new site and email are confirmed working (and keep a note of your Calendly link,
   which is independent of Wix).

## 6. Editing content
Each page is a normal HTML file; open in any text editor. The header, "Let's talk" band and footer are repeated in
each file, so a change to the menu means editing every page (or ask Claude to regenerate the site).
Colours and fonts are variables at the top of `assets/css/style.css`.
Page file names match your old Wix URLs (services-2, about-8, contact-8 ...) to preserve Google rankings.

## 7. SEO and after launch
- Each page has its own title and description (in the `<head>` of each .html file); the home page also has JSON-LD structured data describing the business. Edit these directly.
- Submit https://www.bespokebioinformatics.com/sitemap.xml in Google Search Console and verify the domain with a DNS TXT record.
- Menu, "Let's talk" band and footer are repeated in every page; a menu change means editing every file (search and replace in your editor).
- Fonts: Montserrat and Nunito Sans (SIL Open Font License) stand in for Lulo Clean and Avenir.
- Images: NCI photos from Unsplash (credit in the footer). Journal covers and client logos belong to their owners.
