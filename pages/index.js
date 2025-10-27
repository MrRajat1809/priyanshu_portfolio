'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from '../contexts/ThemeProvider';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ResearchSection from '../components/ResearchSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import Analytics from '../components/Analytics';
import ErrorBoundary from '../components/ErrorBoundary';

export default function Home() {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'research', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Account for navbar height
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    };

    const quickLinks = [
        { label: 'About', href: 'about' },
        { label: 'Research', href: 'research' },
        { label: 'Projects', href: 'projects' },
        { label: 'Contact', href: 'contact' }
    ];

    const socialFooterLinks = [
        { href: 'mailto:rkp6055@gmail.com', label: 'Email', icon: 'Email' },
        { href: 'https://github.com/MrRajat1809', label: 'GitHub', icon: 'GitHub' },
        { href: 'https://linkedin.com/in/priyanshu-kumar1809', label: 'LinkedIn', icon: 'LinkedIn' }
    ];

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    <SEO />
                    <Analytics />

                    <Navbar
                        activeSection={activeSection}
                        onSectionChange={(section) => {
                            setActiveSection(section);
                            scrollToSection(section);
                        }}
                    />

                    <main>
                        {/* Hero Section */}
                        <section id="home">
                            <HeroSection />
                        </section>

                        {/* About Section */}
                        <section id="about">
                            <AboutSection />
                        </section>

                        {/* Research Section */}
                        <section id="research">
                            <ResearchSection />
                        </section>

                        {/* Projects Section */}
                        <section id="projects">
                            <ProjectsSection />
                        </section>

                        {/* Contact Section */}
                        <section id="contact">
                            <ContactSection />
                        </section>
                    </main>

                    {/* Enhanced Footer */}
                    <footer className="bg-gray-900 dark:bg-black text-white py-12 md:py-16">
                        <div className="max-w-7xl mx-auto px-4 md:px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12"
                            >
                                {/* Brand */}
                                <div className="md:col-span-2">
                                    <h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        Priyanshu Kumar
                                    </h3>
                                    <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">
                                        Second-year Biotechnology undergraduate with research interests in computational
                                        structural biology, network science, and stochastic modeling. Focus on developing
                                        reproducible computational frameworks for structural biology research.
                                    </p>
                                    <div className="flex gap-3">
                                        {socialFooterLinks.map((link) => (
                                            <motion.a
                                                key={link.label}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all"
                                                title={link.label}
                                            >
                                                <span className="text-xs font-medium">{link.icon}</span>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div>
                                    <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Quick Links</h4>
                                    <div className="space-y-2">
                                        {quickLinks.map((link) => (
                                            <motion.button
                                                key={link.label}
                                                whileHover={{ x: 4 }}
                                                onClick={() => scrollToSection(link.href)}
                                                className="block text-gray-300 hover:text-blue-400 transition-colors text-sm md:text-base"
                                            >
                                                {link.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Research Areas */}
                                <div>
                                    <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Research Focus</h4>
                                    <div className="space-y-2 text-gray-300 text-xs md:text-sm">
                                        <p>• Protein Structure Prediction</p>
                                        <p>• Network Science</p>
                                        <p>• Stochastic Modeling</p>
                                        <p>• Computational Neuroscience</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Bottom Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="border-t border-gray-700 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
                            >
                                <div className="text-gray-300 text-center md:text-left">
                                    <p className="text-base md:text-lg mb-1 md:mb-2">
                                        © 2025 Priyanshu Kumar. All rights reserved.
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-400">
                                        Built with Next.js, JavaScript, Tailwind CSS, and Framer Motion
                                    </p>
                                </div>

                                {/* Back to Top */}
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection('home')}
                                    className="bg-blue-600 hover:bg-blue-700 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                                >
                                    Back to Top ↑
                                </motion.button>
                            </motion.div>
                        </div>
                    </footer>

                    {/* Floating Action Button for Mobile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2 }}
                        className="fixed bottom-6 right-6 z-40 md:hidden"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => scrollToSection('contact')}
                            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all"
                            title="Quick Contact"
                        >
                            <span className="text-xs font-bold">Contact</span>
                        </motion.button>
                    </motion.div>
                </div>
            </ThemeProvider>
        </ErrorBoundary>
    );
}