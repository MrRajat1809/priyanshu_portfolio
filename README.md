Priyanshu Kumar - Computational Structural Biologist Portfolio
Show Image
Show Image
Show Image
Show Image
🚀 Live Demo
View Portfolio
📋 Overview
A modern, responsive portfolio website showcasing computational structural biology research, machine learning projects, and academic achievements. Built with Next.js, React, and Tailwind CSS with smooth animations and a professional design.
✨ Features
🎨 Design & UX

Responsive Design: Mobile-first approach, works on all devices
Dark/Light Mode: Automatic system detection + manual toggle
Smooth Animations: Framer Motion for professional transitions
Modern UI: Glass morphism, gradients, and contemporary design

🧭 Sections

Hero Section: Introduction with call-to-action buttons
About Section: Education, skills, achievements, and downloadable resume
Research Section: Publications, research areas, and academic vision
Projects Section: Featured projects with detailed modals and tech stacks
Contact Section: Interactive form with multiple contact methods

🛠️ Technical Features

SEO Optimized: Meta tags, Open Graph, structured data, sitemap
Performance: Optimized images, lazy loading, code splitting
Analytics: Google Analytics and performance monitoring
GitHub Pages: Automated deployment via GitHub Actions
Form Handling: Contact form with validation and submission

🏗️ Project Structure
priyanshu-portfolio/
├── 📁 .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment
├── 📁 components/
│   ├── AboutSection.js             # About page with education & skills
│   ├── ContactSection.js           # Contact form with validation  
│   ├── HeroSection.js              # Landing hero with animations
│   ├── Navbar.js                   # Navigation with theme toggle
│   ├── ProjectsSection.js          # Projects grid with modals
│   ├── ResearchSection.js          # Publications and research
│   ├── SEO.js                      # SEO component with meta tags
│   ├── Analytics.js                # Google Analytics integration
│   ├── ErrorBoundary.js            # Error handling wrapper
│   ├── Loading.js                  # Loading components
│   └── PerformanceMonitor.js       # Dev tools for optimization
├── 📁 contexts/
│   └── ThemeProvider.js            # Dark/light theme management
├── 📁 pages/
│   ├── _app.js                     # Next.js app wrapper
│   ├── _document.js                # HTML document structure
│   ├── index.js                    # Main homepage
│   └── sitemap.xml.js              # Dynamic sitemap generation
├── 📁 public/
│   ├── favicon.ico                 # Site favicon
│   ├── images/
│   │   ├── profile.jpg             # Profile picture
│   │   └── og-image.jpg            # Social media preview
│   ├── resume.pdf                  # Downloadable resume
│   └── robots.txt                  # SEO robots file
├── 📁 styles/
│   └── globals.css                 # Global styles with utilities
├── ⚙️ next.config.js               # Next.js configuration
├── ⚙️ tailwind.config.js           # Tailwind CSS configuration
├── ⚙️ package.json                 # Dependencies and scripts
└── 📄 README.md                    # This file
🛠️ Tech Stack
Frontend

Framework: Next.js 14 (React 18)
Styling: Tailwind CSS 3.3
Animations: Framer Motion 10.x
Icons: Lucide React
Language: JavaScript (ES6+)

Development & Deployment

Build Tool: Next.js built-in
Linting: ESLint + Prettier
Deployment: GitHub Pages via GitHub Actions
Version Control: Git + GitHub

External Integrations

Analytics: Google Analytics 4
Forms: Native form handling
SEO: Next.js built-in + custom meta

🚀 Getting Started
Prerequisites

Node.js 18.0.0 or higher
npm or yarn package manager
Git

Installation

Clone the repository
bashgit clone https://github.com/MrRajat1809/priyanshu_portfolio.git
cd priyanshu_portfolio

Install dependencies
bashnpm install
# or
yarn install

Set up environment variables (Optional)
bash# Create .env.local file
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_CLARITY_ID=your_clarity_id

Run development server
bashnpm run dev
# or
yarn dev

Open in browser
Navigate to http://localhost:3000

📝 Available Scripts
bash# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix lint issues automatically

# Deployment
npm run deploy       # Build and prepare for deployment
npm run export       # Export static files for GitHub Pages

# Analysis
npm run analyze      # Bundle analyzer
npm run size-limit   # Check bundle sizes
🎨 Customization
📝 Content Updates

Personal Information: Update components/HeroSection.js and components/AboutSection.js
Research: Modify publications in components/ResearchSection.js
Projects: Update project data in components/ProjectsSection.js
Resume: Replace public/resume.pdf with your own

🎨 Styling

Colors: Update theme colors in tailwind.config.js
Fonts: Modify font imports in pages/_document.js
Animations: Customize Framer Motion variants in components

⚙️ Configuration

SEO: Update meta tags in components/SEO.js
Analytics: Configure tracking in components/Analytics.js
Deployment: Modify next.config.js for different hosting

🚀 Deployment
GitHub Pages (Current Setup)

Push to main branch
GitHub Actions automatically builds and deploys
Site available at: https://mrrajat1809.github.io/priyanshu_portfolio

Alternative Deployments

Vercel: Connect GitHub repo for instant deployment
Netlify: Drag & drop /out folder after npm run build
Custom Server: Use npm run start after building

📊 Performance
Optimization Features

Image Optimization: Next.js automatic optimization
Code Splitting: Automatic chunk splitting
Lazy Loading: Components load on demand
Bundle Analysis: Monitor size with npm run analyze

Lighthouse Scores (Target)

Performance: 95+
Accessibility: 100
Best Practices: 100
SEO: 100

🔧 Development Tools
Included Dev Features

Error Boundaries: Graceful error handling
Performance Monitor: Real-time metrics in development
Dark Mode: System preference detection
Hot Reload: Instant updates during development

📞 Contact & Support
Priyanshu Kumar

Email: rkp6055@gmail.com
LinkedIn: priyanshu-kumar1809
GitHub: MrRajat1809
Portfolio: Live Site

📄 License
This project is open source and available under the MIT License.
🙏 Acknowledgments

Next.js Team: For the amazing framework
Tailwind CSS: For the utility-first styling
Framer Motion: For smooth animations
Lucide React: For beautiful icons


Last Updated: January 2025
