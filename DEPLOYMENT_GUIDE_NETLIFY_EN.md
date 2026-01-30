# Zahnzusatzversicherung Landingpage - Netlify Deployment Guide

## 📦 Project Overview

This is a **React 19 + Tailwind CSS 4** landing page with:
- ✅ Health-Check Form (2-Step)
- ✅ EmailJS Integration (Form Submission)
- ✅ Chatbase Integration (Live Chat)
- ✅ Responsive Design
- ✅ SEO Optimized

---

## 🚀 Deployment to Netlify (Step-by-Step)

### Step 1: Prerequisites

You need:
- **Node.js 18+** (https://nodejs.org/)
- **npm** or **pnpm** (pnpm recommended)
- **Git** (https://git-scm.com/)
- **Netlify Account** (https://netlify.com - free)

Verify installation:
```bash
node --version
npm --version
git --version
```

---

### Step 2: Extract Project

1. Extract `zahnzusatz_landingpage_export.zip`
2. Open Terminal/CMD in the project folder
3. Navigate to the directory:
```bash
cd zahnzusatz_landingpage
```

---

### Step 3: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Zahnzusatzversicherung landing page"
```

---

### Step 4: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
2. Name it: `zahnzusatz_landingpage`
3. **Do NOT initialize with README**
4. Copy the commands from GitHub and run them:

```bash
git remote add origin https://github.com/YOUR_USERNAME/zahnzusatz_landingpage.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### Step 5: Connect to Netlify

#### Option A: Automatic Deployment (Recommended)

1. Go to **https://app.netlify.com**
2. Click **"New site from Git"**
3. Choose **GitHub**
4. Authorize Netlify to access your GitHub account
5. Select the repository: `zahnzusatz_landingpage`
6. Click **"Deploy site"**

Netlify will automatically:
- Build the project
- Deploy to production
- Assign a temporary domain

#### Option B: Manual Deployment

1. Go to **https://app.netlify.com**
2. Click **"Deploy manually"**
3. Drag and drop the `dist/` folder (after running `npm run build`)

---

### Step 6: Configure Build Settings (if needed)

If Netlify doesn't detect the build settings automatically:

1. Go to **Site settings → Build & deploy → Build settings**
2. Set the following:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

---

### Step 7: Connect Your Custom Domain

1. Go to **Site settings → Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name (e.g., `zahnzusatz.example.com`)
4. Follow the DNS configuration steps
5. Netlify will automatically provision an SSL certificate

**DNS Configuration:**
- Add a CNAME record pointing to your Netlify site
- Or update your nameservers to Netlify's nameservers

---

### Step 8: Environment Variables

1. Go to **Site settings → Build & deploy → Environment**
2. Click **"Edit variables"**
3. Add the following variables:

```
VITE_ANALYTICS_ENDPOINT = https://your-analytics-domain.com (optional)
VITE_ANALYTICS_WEBSITE_ID = your-website-id (optional)
VITE_APP_TITLE = Zahnzusatzversicherung
VITE_APP_ID = zahnzusatz_landingpage
```

---

## 🔧 Important Configurations

### EmailJS Integration

The EmailJS configuration is in `client/src/pages/HealthCheck.tsx`:

```typescript
const serviceID = "service_xxxxxxx";
const templateID = "template_xxxxxxx";
const publicKey = "your_public_key";
```

**Verify these values** and update them if needed!

To get your EmailJS credentials:
1. Go to https://www.emailjs.com/
2. Log in to your account
3. Copy your Service ID, Template ID, and Public Key
4. Update them in `HealthCheck.tsx`

### Chatbase Integration

The Chatbase ID is in `client/index.html`:

```html
<script id="LSJBnNuHnDnD6Edt9WfcI" ...></script>
```

This is already configured and should work as-is.

---

## 📧 Email Template in EmailJS

Your email template should include these variables:

```
New Inquiry from Landing Page - Zahnzusatzversicherung

CUSTOMER DATA:
Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Date of Birth: {{birthdate}}
ZIP Code: {{zip}}

GENERAL INFORMATION:
1. Insurance Status: {{q1}}
2. Desired Coverage - Dental Prosthetics: {{q2}}
3. Desired Coverage - Dental Treatment: {{q3}}
4. Desired Coverage - Prophylaxis: {{q4}}

HEALTH INFORMATION:
5. Ongoing Dental Treatment: {{q5}}
6. Dental Treatments in Last 3 Years: {{q6}}
7. Missing Teeth: {{q7}}
8. Dental Prosthetics Present: {{q8}}

Consent: {{consent}}
```

---

## 🌐 Domain Configuration

### SSL/HTTPS

Netlify automatically provides **free SSL certificates** via Let's Encrypt.

### DNS Settings

If you have a custom domain:

1. **Option 1: Netlify Nameservers (Recommended)**
   - Update your domain registrar to use Netlify's nameservers
   - Netlify will handle all DNS management

2. **Option 2: CNAME Record**
   - Add a CNAME record: `your-domain.com` → `your-site.netlify.app`
   - Keep your current nameservers

---

## 🧪 Testing Before Launch

Check the following:

- [ ] Homepage loads correctly
- [ ] Health-Check form works
- [ ] Form data is sent via email
- [ ] Chatbot is visible and functional
- [ ] Mobile view is responsive
- [ ] All links work
- [ ] Images load correctly
- [ ] Analytics works (if configured)
- [ ] HTTPS is enabled
- [ ] Custom domain resolves correctly

---

## 🔄 Continuous Deployment

After connecting to GitHub:

1. **Make changes** to your code
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
3. **Netlify automatically deploys** the new version

You can monitor deployments in **Netlify Dashboard → Deploys**

---

## 🐛 Troubleshooting

### Problem: Build fails on Netlify
**Solution:**
1. Check the build logs: **Deploys → Failed deploy → Logs**
2. Common issues:
   - Missing dependencies: Run `npm install` locally
   - Node version mismatch: Specify Node version in `netlify.toml`
   - Environment variables not set

**Create `netlify.toml` in project root:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

### Problem: Form not sending emails
**Solution:**
- Verify EmailJS Service ID, Template ID, and Public Key
- Check browser console (F12) for errors
- Test EmailJS configuration at https://www.emailjs.com/

### Problem: Chatbot not displaying
**Solution:**
- Verify Chatbase ID is correct in `index.html`
- Clear browser cache
- Test in incognito window
- Check browser console for errors

### Problem: Custom domain not working
**Solution:**
- Wait 24-48 hours for DNS propagation
- Verify DNS records in your domain registrar
- Check Netlify domain settings
- Try flushing DNS: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

---

## 📊 Performance Monitoring

### Netlify Analytics
1. Go to **Site settings → Analytics**
2. Enable **Netlify Analytics** (paid feature)
3. Monitor traffic and performance

### Google Analytics (Free Alternative)
1. Create Google Analytics account
2. Add tracking code to `client/index.html`
3. Monitor traffic and user behavior

---

## 🔐 Security Best Practices

### Environment Variables
**Never commit sensitive data:**
- EmailJS keys → Use Netlify environment variables
- API keys → Use Netlify environment variables
- Secrets → Use Netlify environment variables

### HTTPS
- Netlify provides **free SSL certificates**
- Always use HTTPS for production
- Redirect HTTP to HTTPS automatically

### Form Security
- EmailJS handles form submission securely
- Never expose API keys in client-side code
- Use Netlify environment variables for sensitive data

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Git repository created and pushed
- [ ] Netlify site connected to GitHub
- [ ] Build settings configured correctly
- [ ] Environment variables set
- [ ] EmailJS credentials verified
- [ ] Chatbase ID verified
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Form submission tested
- [ ] Mobile responsiveness tested
- [ ] All links verified
- [ ] Analytics configured (optional)
- [ ] Monitoring set up

---

## 📝 Project Structure

```
zahnzusatz_landingpage/
├── client/
│   ├── public/              # Static assets (images, logos)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Pages (Home, HealthCheck)
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Utility functions
│   │   ├── App.tsx          # Main app
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   └── index.html           # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind configuration
└── netlify.toml             # Netlify configuration
```

---

## 🔄 Updating Your Site

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Push Updates to Production

```bash
# Make changes to your code
# Then commit and push:
git add .
git commit -m "Update: description"
git push origin main

# Netlify automatically deploys!
```

---

## 📞 Support Resources

- **Netlify Documentation:** https://docs.netlify.com/
- **React Documentation:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **EmailJS:** https://www.emailjs.com/docs/
- **Chatbase:** https://www.chatbase.co/docs/

---

## 🎉 Next Steps After Deployment

1. **Monitor traffic:** Check Netlify analytics
2. **Optimize performance:** Use Netlify's performance tools
3. **Set up backups:** GitHub is your backup
4. **Keep dependencies updated:** Run `npm update` regularly
5. **Monitor errors:** Set up error tracking (Sentry, LogRocket)

---

## 🎯 Success!

Your landing page is now live on Netlify! 🚀

For questions or issues, refer to the troubleshooting section or contact Netlify support.

Good luck with your Zahnzusatzversicherung business! 😊
