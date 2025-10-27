# 🚀 Getting Started with Your Portfolio

Welcome to your new **JavaScript-based portfolio**! This guide will walk you through setting up, customizing, and deploying your portfolio with ease.

---

## 📋 Prerequisites

Before getting started, ensure you have the following installed:

* [Node.js 18.0.0+](https://nodejs.org/)
* npm 8.0.0+ (comes with Node.js)
* [Git](https://git-scm.com/)

---

## 🛠️ Quick Setup

### Option 1: Automatic Setup (Recommended)

```bash
git clone https://github.com/MrRajat1809/priyanshu_portfolio.git
cd priyanshu_portfolio
chmod +x setup.sh
./setup.sh
npm run dev
```

### Option 2: Manual Setup

```bash
git clone https://github.com/MrRajat1809/priyanshu_portfolio.git
cd priyanshu_portfolio
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

---

## 🎨 Customization Guide

### 1. Personal Information

**File:** `components/HeroSection.js`

```js
const stats = [
  { value: "Your CGPA", label: "Your Achievement", color: "from-blue-500 to-blue-600" },
  { value: "Your Count", label: "Your Metric", color: "from-purple-500 to-purple-600" },
  { value: "Your Score", label: "Your Achievement", color: "from-pink-500 to-pink-600" }
];
```

**File:** `components/AboutSection.js`

```js
const skills = [
  {
    category: "Your Category",
    icon: Code,
    items: ["Your", "Skills", "Here"],
    color: "from-blue-500 to-blue-600"
  },
];
```

### 2. Research & Publications

**File:** `components/ResearchSection.js`

```js
const publications = [
  {
    id: 'your-publication',
    title: 'Your Publication Title',
    authors: ['Your Name', 'Co-authors'],
    journal: 'Journal Name',
    year: '2024',
    status: 'published',
    doi: 'your.doi.here',
    abstract: 'Your abstract here...',
    technologies: ['Tech1', 'Tech2'],
    type: 'journal'
  }
];
```

### 3. Projects

**File:** `components/ProjectsSection.js`

```js
const projects = [
  {
    id: 'your-project',
    title: 'Project Title',
    description: 'Short description...',
    longDescription: 'Detailed description...',
    technologies: ['React', 'Node.js'],
    githubUrl: 'https://github.com/yourusername/repo',
    liveUrl: 'https://yourproject.com',
    status: 'completed',
    featured: true,
    year: '2024',
    category: 'development'
  }
];
```

### 4. Contact Information

**File:** `components/ContactSection.js`

```js
const contactMethods = [
  {
    id: 'email',
    label: 'Email',
    value: 'your.email@domain.com',
    icon: Mail,
    href: 'mailto:your.email@domain.com',
    description: 'Your description'
  }
];
```

### 5. SEO & Meta Tags

**File:** `components/SEO.js`

```js
const defaultTitle = "Your Name - Your Title";
const defaultDescription = "Your description...";
const defaultCanonical = "https://yourdomain.com";
```

---

## 🖼️ Assets Setup

| Asset            | Path                         | Notes               |
| ---------------- | ---------------------------- | ------------------- |
| Profile Image    | `public/images/profile.jpg`  | 400x400px, JPG/PNG  |
| Resume           | `public/resume.pdf`          | PDF format          |
| Open Graph Image | `public/images/og-image.jpg` | 1200x630px, JPG/PNG |
| Favicon          | `public/favicon.ico`         | 32x32px or 16x16px  |

---

## ⚙️ Environment Variables

**File:** `.env.local`

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
NEXT_PUBLIC_CONTACT_API_URL=https://api.yourservice.com
NODE_ENV=development
```

---

## 🚀 Deployment

### GitHub Pages (Recommended)

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

Then:

* Go to GitHub repo Settings → Pages
* Set source to **GitHub Actions**
* (Optional) Add `CNAME` file in `public/` for custom domain

### Alternative: Vercel

```bash
npm install -g vercel
vercel --prod
```

### Alternative: Netlify

```bash
npm run build
# Drag and drop the `/out` folder to Netlify dashboard
```

---

## 🛠️ Development Commands

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Lint code
npm run lint:fix    # Fix linting issues
npm run analyze     # Analyze bundle size
npm test            # Run tests (if configured)
```

---

## 🎨 Styling Guide

* Built with **Tailwind CSS** + custom utilities
* Includes:

  * `.gradient-text`
  * `.glass`
  * `.animated-underline`
  * `.line-clamp-*`

**Dark Mode** is handled by `ThemeProvider` with system detection.

**Custom Colors:** Update in `tailwind.config.js`:

```js
colors: {
  primary: {
    // your color values
  }
}
```

---

## ⚡ Troubleshooting

### Build Errors

```bash
rm -rf .next
npm run build
```

### Dependency Issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### Image Issues

* Ensure files are in `public/`
* Paths are **case-sensitive**
* Use relative paths like `/images/profile.jpg`

### Dev Tools

* Ctrl/Cmd + Shift + M → Toggle performance metrics
* Ctrl/Cmd + Shift + G → Toggle grid overlay
* Ctrl/Cmd + Shift + O → Toggle outlines

---

## 📱 Testing

* **Browsers:** Chrome, Firefox, Safari, Edge
* **Devices:** Desktop, Tablet, Mobile (min width 320px)
* **Tool:**

```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

---

## 🤝 Contributing

```bash
git checkout -b feature/my-feature
# make changes
git commit -m "Add feature"
git push origin feature/my-feature
# Open a Pull Request
```

---

## 📞 Support

* Read this documentation
* Search existing [GitHub Issues](https://github.com/MrRajat1809/priyanshu_portfolio/issues)
* Email: **[rkp6055@gmail.com](mailto:rkp6055@gmail.com)**

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

*Last updated: January 2025*

Happy coding! 🚀
