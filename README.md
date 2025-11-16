# Blue Key Mortgage Website
**Powered by BRX Mortgage**

A professional, static website for Blue Key Mortgage - FSRA-licensed mortgage broker serving Ontario.

## ✅ What's Included

### Pages (12 total)
- ✅ **Home** (index.html) - Main landing page with services overview
- ✅ **Reverse Mortgages** (reverse-mortgage.html) - Full detailed page
- ✅ **Refinancing** (refinancing.html) - Refinancing information
- ✅ **Services** (services.html) - Services overview page
- ✅ **Home Purchase** (home-purchase.html) - Placeholder (ready to customize)
- ✅ **First-Time Buyers** (first-time-buyers.html) - Placeholder (ready to customize)
- ✅ **Renewals** (renewals.html) - Placeholder (ready to customize)
- ✅ **Investment Properties** (investment-properties.html) - Placeholder (ready to customize)
- ✅ **Calculators** (calculators.html) - 3 working calculators with disclaimers
- ✅ **Blog** (blog.html) - Placeholder (ready for blog articles)
- ✅ **About Ragini** (about.html) - Professional bio page
- ✅ **Contact** (contact.html) - Contact form

### Features
✅ Consistent blue color scheme (#2563EB)
✅ "Blue Key Mortgage powered by BRX Mortgage" branding on every page
✅ NO phone numbers anywhere (as requested)
✅ Email: ragini@bluekeymortgage.ca
✅ Mobile responsive design
✅ Working calculators with proper disclaimers
✅ SEO optimized
✅ Clean, professional design

## 🚀 How to Deploy to Cloudflare Pages

### Step 1: Prepare Your Files
All your website files are ready in this folder:
- `/home/claude/bluekeymortgage-website/`

### Step 2: Upload to GitHub

1. **Go to GitHub.com** and sign in
2. **Create a new repository:**
   - Click the "+" icon → "New repository"
   - Name it: `bluekeymortgage-website`
   - Make it PUBLIC
   - Don't initialize with README (we already have files)
   - Click "Create repository"

3. **Upload your files:**
   - On the repository page, click "uploading an existing file"
   - Drag ALL files and folders from this directory
   - Add commit message: "Initial website upload"
   - Click "Commit changes"

### Step 3: Connect to Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Sign in to your account

2. **Create a Pages Project:**
   - Click "Workers & Pages" in the left sidebar
   - Click "Create application"
   - Choose "Pages"
   - Click "Connect to Git"

3. **Connect Your GitHub:**
   - Select your GitHub account
   - Choose the `bluekeymortgage-website` repository
   - Click "Begin setup"

4. **Configure Build Settings:**
   - **Project name:** bluekeymortgage (or whatever you want)
   - **Production branch:** main
   - **Build command:** (leave empty)
   - **Build output directory:** / (root)
   - Click "Save and Deploy"

5. **Wait for Deployment:**
   - Cloudflare will deploy your site (takes 1-2 minutes)
   - You'll get a URL like: `bluekeymortgage.pages.dev`

### Step 4: Add Custom Domain (Optional)

1. In Cloudflare Pages, go to your project
2. Click "Custom domains"
3. Click "Set up a custom domain"
4. Enter your domain (e.g., bluekeymortgage.ca)
5. Follow the DNS instructions

## 📝 Customization Guide

### Images
Currently using free stock photos from Unsplash. To use your own:
1. Add your images to the `images/` folder
2. Update image paths in HTML files
3. Example: Change `https://images.unsplash.com/...` to `images/your-photo.jpg`

### Contact Form
The contact form currently uses a placeholder. To make it work:
1. Sign up for free at https://formspree.io/
2. Create a form and get your form ID
3. In `js/main.js`, find line with `YOUR_FORM_ID`
4. Replace with your actual Formspree form ID

### Content Updates
- All text is in the HTML files - easy to edit
- Calculators work automatically - no changes needed
- Colors are in `css/styles.css` (search for `--primary-blue` to change)

## 🎨 Color Scheme
- Primary Blue: #2563EB
- Dark Blue: #1E40AF
- Navy (footer): #1E293B
- Light Blue (backgrounds): #EFF6FF

## ⚠️ Important Notes

### Compliance
- ✅ "Powered by BRX Mortgage" appears on every page
- ✅ FSRA-licensed mentioned throughout
- ✅ NO phone numbers (as requested)
- ✅ Disclaimers on all calculators

### What Needs Content
These pages are placeholders and need your content:
- home-purchase.html
- first-time-buyers.html
- renewals.html
- investment-properties.html
- blog.html

I can help you fill these in with proper content based on the screenshots you provided!

## 📞 Support

If you need help:
1. Deploying to Cloudflare
2. Adding more content to placeholder pages
3. Customizing images or colors
4. Setting up the contact form

Just let me know!

## 🎉 You're Ready!

Your website is professional, fast, SEO-optimized, and ready to deploy. No more frustration - just upload to GitHub and connect to Cloudflare Pages. You'll have a live website in minutes!

---
Built with ❤️ for Blue Key Mortgage
