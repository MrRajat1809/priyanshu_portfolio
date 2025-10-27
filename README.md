# 🧬 Priyanshu Kumar - Computational Structural Biologist Portfolio

A modern, fully responsive personal portfolio website built with **Next.js**, **React**, and **Tailwind CSS**. This site showcases my research in computational structural biology, machine learning projects, and academic achievements — all wrapped in a sleek, animated UI.

[🚀 Live Demo](https://mrrajat1809.github.io/priyanshu_portfolio)

---

## 📋 Overview

This portfolio is designed to:

* Highlight your **research publications** and academic vision
* Display **projects** with detailed modal views
* Serve as a gateway for **collaboration, outreach, or grad school applications**

---

## ✨ Features

### 🎨 Design & UX

* **Responsive Design** – Fully mobile-friendly layout
* **Dark/Light Mode** – System preference + manual toggle
* **Framer Motion Animations** – Smooth transitions for professional polish
* **Modern UI** – Glassmorphism, gradients, and accessible design

### 🧭 Website Sections

* **Hero Section** – Intro + call-to-action
* **About Section** – Education, skills, achievements, resume
* **Research Section** – Publications, research areas
* **Projects Section** – Modal cards with tech stack
* **Contact Section** – Validated form with multiple methods

### 🛠️ Technical Highlights

* **SEO Optimized** – Meta tags, Open Graph, JSON-LD, sitemap
* **Performance** – Lazy loading, code splitting, image optimization
* **Analytics** – Google Analytics & performance monitoring
* **CI/CD** – GitHub Actions for auto-deployment to GitHub Pages
* **Error Handling** – Error boundaries and performance monitoring

---

## 🏗️ Project Structure

```
priyanshu_portfolio/
├── .github/workflows/deploy.yml     # GitHub Actions deployment
├── components/                      # All UI sections and helpers
│   ├── HeroSection.js
│   ├── AboutSection.js
│   ├── ProjectsSection.js
│   ├── ResearchSection.js
│   ├── ContactSection.js
│   ├── SEO.js
│   ├── Analytics.js
│   ├── Loading.js
│   ├── ErrorBoundary.js
│   └── PerformanceMonitor.js
├── contexts/
│   └── ThemeProvider.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   ├── index.js
│   ├── 404.js                       # Custom 404 error page
│   └── sitemap.xml.js
├── public/
│   ├── images/                      # Profile, social images
│   ├── resume.pdf
│   ├── robots.txt
│   └── .nojekyll                    # GitHub Pages config
├── styles/
│   └── globals.css
├── tailwind.config.js
├── next.config.js
├── lighthouse.config.js             # Lighthouse CI config
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

* **Framework**: Next.js 14 (React 18)
* **Language**: JavaScript (ES6+)
* **Styling**: Tailwind CSS 3.3
* **Animations**: Framer Motion
* **Icons**: Lucide React

### Development & Deployment

* **Linting**: ESLint + Prettier
* **CI/CD**: GitHub Actions + GitHub Pages
* **Analytics**: Google Analytics 4

---

## 🚀 Getting Started

### 🩰 Prerequisites

* Node.js 18+
* npm or yarn
* Git

### 📆 Installation

```bash
git clone https://github.com/MrRajat1809/priyanshu_portfolio.git
cd priyanshu_portfolio
npm install # or yarn install
```

### 🔧 Optional: Add Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_CLARITY_ID=your_clarity_id
```

### 💻 Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

---

## 📜 Available Scripts

```bash
# Local Development
npm run dev

# Production Build
npm run build
npm run start

# Static Export for GitHub Pages
npm run export

# Code Quality
npm run lint
npm run lint:fix

# Analyze Bundle
npm run analyze
npm run size-limit
```

---

## 🎨 Customization Guide

### 📝 Content

* **Hero & About** → `components/HeroSection.js` & `AboutSection.js`
* **Resume** → Replace `public/resume.pdf`
* **Research** → `components/ResearchSection.js`
* **Projects** → `components/ProjectsSection.js`

### 🎨 Styling

* **Theme & Colors** → `tailwind.config.js`
* **Fonts** → Modify in `pages/_document.js`
* **Animations** → Inside each component (`Framer Motion` variants)

### ⚙️ Configuration

* **SEO** → `components/SEO.js`
* **Analytics** → `components/Analytics.js`
* **Deployment** → Adjust `next.config.js`

---

## 🚀 Deployment Instructions

### ✅ GitHub Pages (CI/CD)

* Push to the `main` branch
* GitHub Actions will automatically build and deploy
* Your site will be available at:
  `https://mrrajat1809.github.io/priyanshu_portfolio`

### 🗭 Alternatives

* **Vercel** – Instant builds from GitHub
* **Netlify** – Drag and drop `/out` folder after `npm run export`

---

## 📊 Performance Optimization

* Image optimization with Next.js
* Code splitting and lazy loading
* Lighthouse target scores:

  * 🟢 Performance: 95+
  * 🟢 Accessibility: 100
  * 🟢 Best Practices: 100
  * 🟢 SEO: 100

---

## 📞 Contact

**Priyanshu Kumar**
📧 [rkp6055@gmail.com](mailto:rkp6055@gmail.com)
🔗 [LinkedIn](https://linkedin.com/in/priyanshu-kumar1809)
🔗 [GitHub](https://github.com/MrRajat1809)

---

## 📄 License

This project is open source under the **MIT License**.

---

## 🙏 Acknowledgments

* [Next.js](https://nextjs.org)
* [Tailwind CSS](https://tailwindcss.com)
* [Framer Motion](https://www.framer.com/motion/)
* [Lucide Icons](https://lucide.dev)

---

*Last Updated: January 2025*
