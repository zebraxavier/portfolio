# Deployment Checklist — Xavier Leonard Portfolio

## ✅ Content Migration: COMPLETE
All portfolio content has been updated with real information from your resume.

---

## 📋 Pre-Deployment Tasks

### Critical (Do These First)

#### 1. ✅ Add Resume PDF
**Status:** ⚠️ ACTION REQUIRED

Your resume download/preview buttons point to `/Xavier_Leonard_Resume.pdf`. 

**Action:**
```bash
# Copy your resume PDF to the public folder
# Rename it to match the expected filename
copy "Xavier-leonard-DOA-resume-pdf.pdf" "e:\Portfolio\public\Xavier_Leonard_Resume.pdf"
```

Or if you prefer a different filename, update these files:
- `src/features/resume/Resume.jsx` (lines 13-14: `RESUME_PDF_URL` and `RESUME_VIEW_URL`)

---

#### 2. ⚠️ Update Social Media URLs
**Status:** ACTION RECOMMENDED

Currently set to:
- GitHub: `https://github.com/xavierleonard`
- LinkedIn: `https://linkedin.com/in/xavierleonard`
- Twitter: `https://twitter.com/xavierleonard`

**If these are placeholder URLs**, update in:
1. `src/components/SEO/SEO.jsx` (lines 5-6)
2. `src/components/Footer/Footer.jsx` (lines 6-8)
3. `src/features/contact/Contact.jsx` (lines 13-15)

**If these are correct**, skip this step.

---

#### 3. ⚠️ Add Profile Photo
**Status:** OPTIONAL BUT RECOMMENDED

Current photo: `/public/photo.jpg` (if exists)

**Action:**
- Replace with your actual professional photo
- Recommended specs:
  - Size: 400×400 px minimum
  - Format: JPG or PNG
  - Aspect ratio: 1:1 (square)
  - File size: < 500 KB
  - Name: `photo.jpg`

---

### Optional Enhancements

#### 4. 🔗 Add Project Links (When Ready)
**Status:** OPTIONAL (Can do post-deployment)

Currently all project demo/GitHub links are set to `#` (placeholder).

**When you have live projects:**
- Edit `src/features/projects/Projects.jsx`
- Update the `PROJECTS` array:
  ```javascript
  {
    id: 'transport',
    link: 'https://your-live-demo.com',    // ← Add real URL
    github: 'https://github.com/you/repo', // ← Add real repo
    // ...
  }
  ```

---

#### 5. 🌐 Set Production URL
**Status:** OPTIONAL (Update when deployed)

**Option A: Environment Variable (Recommended)**
Create `.env` file in project root:
```env
VITE_BASE_URL=https://yourdomain.com
```

**Option B: Direct Edit**
Edit `src/components/SEO/SEO.jsx` line 4:
```javascript
const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://xavierleonard.dev';
//                                                  ↑ Change this
```

---

#### 6. 📊 Setup Google Analytics
**Status:** OPTIONAL

**To enable GA4:**
1. Get your GA4 Measurement ID (format: `G-XXXXXXXXXX`)
2. Edit `index.html` line 48:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
   ```
3. Edit line 52:
   ```javascript
   gtag('config', 'G-YOUR-ID', { send_page_view: false });
   ```

**To disable GA4:**
- Remove lines 47-54 in `index.html`

---

#### 7. 🔧 Backend Configuration
**Status:** OPTIONAL (Contact form functionality)

The contact form sends data to `/api/contact` (backend).

**Check backend is configured:**
```bash
# Navigate to backend folder
cd backend

# Check environment variables
cat .env

# Should contain:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# EMAIL_HOST=smtp.gmail.com (or your email provider)
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASS=your_app_password
```

**Test backend:**
```bash
npm run backend:start
# Should start on http://localhost:5000
```

**If not using backend:**
- Contact form won't work (displays error)
- Consider using a form service (Formspree, Netlify Forms, etc.)

---

## 🚀 Build & Deploy

### Step 1: Final Build Test
```bash
cd e:\Portfolio
npm run build
```

**Expected output:**
```
✓ 535 modules transformed
✓ built in 600-800ms
```

**If errors occur:** Fix them before deploying.

---

### Step 2: Test Production Build Locally
```bash
npm run preview
```

Visit: `http://localhost:4173`

**Test checklist:**
- [ ] Home page loads
- [ ] All navigation links work
- [ ] Projects display correctly
- [ ] Education timeline renders
- [ ] Certificates show up
- [ ] Contact form displays (may not submit without backend)
- [ ] Resume download button appears
- [ ] Theme toggle works
- [ ] Matrix rain background visible
- [ ] Responsive on mobile (open DevTools)

---

### Step 3: Deploy

#### Option A: Netlify (Recommended)

**Via Netlify UI:**
1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Drag & drop the `dist` folder
3. Done! (or connect GitHub for auto-deploy)

**Via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

**Configuration:**
- Build command: `npm run build`
- Publish directory: `dist`
- Already configured in `netlify.toml` ✅

---

#### Option B: Vercel

**Via Vercel CLI:**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**Configuration:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

---

#### Option C: GitHub Pages

**Setup:**
1. Push code to GitHub
2. Edit `vite.config.js`, add:
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',  // ← Add this line
     plugins: [react()],
     // ... rest of config
   });
   ```
3. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
4. Add to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
5. Deploy:
   ```bash
   npm run deploy
   ```

---

## ✅ Post-Deployment Verification

### Check These After Deploy:

#### 1. SEO Verification
- [ ] Open live site in incognito
- [ ] View page source (`Ctrl+U`)
- [ ] Verify `<title>` shows your name
- [ ] Verify meta description is accurate
- [ ] Check Open Graph tags (`og:title`, `og:description`, `og:image`)

#### 2. Performance Check
- [ ] Run Lighthouse audit (DevTools > Lighthouse)
- [ ] Target scores:
  - Performance: 95+
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 100

#### 3. Functionality Test
- [ ] Test on mobile device
- [ ] Test on tablet
- [ ] Test on desktop
- [ ] Try dark/light theme toggle
- [ ] Click all navigation links
- [ ] Try resume download
- [ ] Test contact form (if backend deployed)
- [ ] Check social links open correctly

#### 4. Search Engine Submission (Optional)
- [ ] Submit sitemap to Google Search Console
  - Sitemap URL: `https://yourdomain.com/sitemap.xml`
- [ ] Submit to Bing Webmaster Tools

---

## 🔒 Security Notes

### Exposed Information in Portfolio:
- ✅ Email: `zebraxavier100@gmail.com` (public contact)
- ✅ Phone: `+919150509193` (in structured data only, not displayed)
- ✅ Location: Tamil Nadu, India (general location, no exact address)
- ✅ Social profiles: GitHub, LinkedIn (public anyway)

### Not Exposed:
- No API keys in frontend code
- Backend `.env` not committed to git
- MongoDB connection string not exposed

**If you want to hide phone number from structured data:**
- Edit `src/components/SEO/SEO.jsx`
- Remove line with `telephone:` property

---

## 📊 Current Status Summary

| Task | Status | Priority |
|------|--------|----------|
| Content migration | ✅ Complete | - |
| Design system | ✅ Preserved | - |
| Build passing | ✅ Yes | - |
| Resume PDF | ⚠️ Add file | **HIGH** |
| Social URLs | ⚠️ Verify | **HIGH** |
| Profile photo | ⚠️ Optional | Medium |
| Project links | 🔲 Later | Low |
| Domain URL | 🔲 After deploy | Low |
| Google Analytics | 🔲 Optional | Low |
| Backend config | 🔲 Optional | Low |

---

## 🎯 Minimum Viable Deployment

**To deploy RIGHT NOW with minimal setup:**

1. ✅ Content is ready (already done)
2. ⚠️ Add resume PDF to `/public` folder
3. ⚠️ Verify social URLs are correct (or update them)
4. ✅ Run `npm run build`
5. 🚀 Deploy `dist` folder to Netlify/Vercel
6. ✅ Done!

**Everything else can be updated post-deployment** — the site will work and look professional with just these steps.

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### Resume Download Not Working
- Check file exists: `e:\Portfolio\public\Xavier_Leonard_Resume.pdf`
- Check filename matches `Resume.jsx` (lines 13-14)
- After adding file, rebuild: `npm run build`

### Images Not Loading
- Verify files exist in `/public` folder
- Images should be at `/public/photo.jpg`, `/public/favicon.svg`, etc.
- Rebuild after adding images

### Contact Form Not Working
- Check browser console for errors
- Verify backend is running (if using backend)
- Check backend URL in `src/services/api.js`

---

## ✨ You're Ready!

Your portfolio has been professionally updated with content from your resume while maintaining the premium Matrix atmosphere design. Follow the checklist above to deploy.

**Questions or issues?** Review the documentation in:
- `PREMIUM_UPGRADE_COMPLETE.md` (design system details)
- `CONTENT_UPDATE_COMPLETE.md` (what content was changed)
- This file (deployment guide)

---

**Built with precision. Content verified. Ready to launch. 🚀**
