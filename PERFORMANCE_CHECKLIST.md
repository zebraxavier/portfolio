# Production Performance Checklist

Before deploying to production, complete this checklist to achieve Lighthouse scores of 95+.

## ✅ Build & Bundle

- [ ] Run `npm run build` successfully (no errors)
- [ ] Check bundle sizes with `npm run build` output
- [ ] Verify all vendor chunks are below 500 kB
- [ ] Ensure tree-shaking removed unused code
- [ ] Check dist/ folder size (should be <2 MB for SPA)

## ✅ Environment Variables

- [ ] Update `.env` with production `VITE_API_URL`
- [ ] Update `VITE_BASE_URL` to actual production domain
- [ ] Replace Google Analytics ID (`G-XXXXXXXXXX`) in `index.html` with your real Measurement ID
- [ ] Confirm `.env` is in `.gitignore` (NEVER commit secrets)

## ✅ Content & SEO

- [ ] Replace placeholder content:
  - `ADMIN_EMAIL` in backend `.env` (admin@example.com → real email)
  - Email, GitHub, LinkedIn URLs in `Contact.jsx` and `Footer.jsx`
  - Real project links in `Projects.jsx` (replace all `#` hrefs)
  - Base URL in `SEO.jsx` and `sitemap.xml` (xavierleonard.dev → your domain)
  - Social URLs in Footer (GitHub, LinkedIn, Twitter)
  - Twitter handle in `SEO.jsx`
- [ ] Add real `/public/photo.jpg` (your actual headshot)
- [ ] Add `/public/resume.pdf` (your actual PDF resume)
- [ ] Create `/public/apple-touch-icon.png` (180×180px icon for iOS)
- [ ] Update `sitemap.xml` lastmod dates to current date
- [ ] Test Open Graph image: share on Twitter/LinkedIn/Slack to verify `/og-image.svg` displays correctly

## ✅ Analytics & Tracking

- [ ] Sign up for Google Analytics 4 (analytics.google.com)
- [ ] Create a new GA4 property for your portfolio
- [ ] Get your Measurement ID (format: `G-XXXXXXXXXX`)
- [ ] Replace placeholder in `index.html` (line ~50) with your real ID
- [ ] Verify GA4 is receiving events: open site, go to GA4 Realtime view, confirm page_view
- [ ] Test custom events:
  - Download Resume → `resume_download`
  - Click Contact → `contact_form_submission`
  - Theme toggle → `theme_change`

## ✅ Accessibility (WCAG 2.2 AA)

- [ ] Run Lighthouse Accessibility audit (target: 100)
- [ ] Test keyboard navigation (Tab, Enter, Esc)
- [ ] Verify all interactive elements have visible focus indicators
- [ ] Test with screen reader (macOS VoiceOver, NVDA, or JAWS)
- [ ] Confirm all images have alt text
- [ ] Verify color contrast meets AA standard (4.5:1 minimum)
- [ ] Test light theme contrast separately
- [ ] Verify form error messages are announced by screen readers

## ✅ Performance (Core Web Vitals)

- [ ] Run Lighthouse Performance audit (target: ≥95)
- [ ] **LCP (Largest Contentful Paint)**: <2.5s
  - Check hero image loads quickly
  - Ensure fonts preload correctly
- [ ] **FID (First Input Delay)**: <100ms
  - Minimize JavaScript execution time
- [ ] **CLS (Cumulative Layout Shift)**: <0.1
  - Set explicit width/height on images
  - Reserve space for web fonts
- [ ] Test on throttled connection (Fast 3G in DevTools)
- [ ] Verify smooth scroll doesn't drop below 60 FPS
- [ ] Check Framer Motion animations respect `prefers-reduced-motion`

## ✅ Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (macOS + iOS)
- [ ] Edge (latest)
- [ ] Test on mobile (iOS Safari + Android Chrome)
- [ ] Test light theme in all browsers
- [ ] Test dark theme in all browsers
- [ ] Verify theme toggle works consistently
- [ ] Test custom cursor on desktop (should hide on mobile)

## ✅ Security

- [ ] Verify backend has CORS whitelist configured (only production domain)
- [ ] Check Netlify security headers are deployed (run: `curl -I https://yoursite.com`)
- [ ] Confirm no API keys or secrets in frontend code
- [ ] Test contact form honeypot catches bots
- [ ] Verify backend rate limiting (5 contact messages per 15 min per IP)
- [ ] Test JWT auth for admin routes (should return 401 without valid token)

## ✅ Backend Deployment (if using)

- [ ] Deploy backend to Render, Railway, or similar
- [ ] Set all backend environment variables:
  - `PORT`
  - `MONGODB_URI` (use MongoDB Atlas connection string)
  - `JWT_SECRET` (min 32 random chars)
  - `CLIENT_ORIGIN` (your production frontend URL)
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD_HASH` (generate with: `node -e "const b=require('bcryptjs');b.hash('yourpassword',12).then(console.log)"`)
  - `NODE_ENV=production`
- [ ] Verify MongoDB Atlas IP whitelist allows backend server
- [ ] Test contact form submission end-to-end (frontend → backend → MongoDB)
- [ ] Check backend health endpoint: `https://your-backend.com/api/health`

## ✅ Frontend Deployment (Netlify)

- [ ] Push code to GitHub
- [ ] Connect repo to Netlify
- [ ] Set build command: `npm run build`
- [ ] Set publish directory: `dist`
- [ ] Add environment variables in Netlify dashboard:
  - `VITE_API_URL=https://your-backend.com/api`
  - `VITE_BASE_URL=https://yoursite.com`
- [ ] Deploy and test
- [ ] Verify SPA routing works (refresh on `/about` → should load, not 404)
- [ ] Check Netlify build logs for errors

## ✅ Post-Deploy Verification

- [ ] Visit production site, confirm no console errors
- [ ] Test every route: Home, About, Projects, Certificates, Education, Resume, Contact
- [ ] Submit contact form → verify Toast success + backend receives message
- [ ] Download resume → verify PDF downloads
- [ ] Toggle theme → verify localStorage persists + no FOUC on refresh
- [ ] Check mobile responsiveness on real devices
- [ ] Run Lighthouse on production URL (all 4 categories)
- [ ] Submit sitemap to Google Search Console: `https://yoursite.com/sitemap.xml`
- [ ] Verify robots.txt is accessible: `https://yoursite.com/robots.txt`
- [ ] Test Open Graph preview: paste URL into Twitter/LinkedIn/Slack, confirm card displays

## ✅ Ongoing Maintenance

- [ ] Monitor GA4 for traffic and events
- [ ] Update resume.pdf when needed
- [ ] Keep dependencies updated: `npm outdated` → `npm update`
- [ ] Run Lighthouse quarterly to catch regressions
- [ ] Backup MongoDB data regularly (if using backend)

---

## Lighthouse Target Scores

| Category        | Target |
|----------------|--------|
| Performance    | ≥ 95   |
| Accessibility  | 100    |
| Best Practices | 100    |
| SEO            | 100    |

## Quick Commands

```bash
# Development
npm run dev               # Start frontend dev server (port 5173)
npm run backend           # Start backend dev server (port 5000) with watch mode

# Production Build
npm run build             # Build optimized frontend bundle to dist/
npm run preview           # Preview production build locally (port 4173)

# Backend Production
npm run backend:start     # Start backend in production mode

# Linting
npm run lint              # Run oxlint on codebase
```

## Resources

- **Lighthouse CI**: https://github.com/GoogleChrome/lighthouse-ci
- **Web.dev Core Web Vitals**: https://web.dev/vitals/
- **WCAG 2.2 Guidelines**: https://www.w3.org/WAI/WCAG22/quickref/
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **GA4 Documentation**: https://support.google.com/analytics/answer/9304153
