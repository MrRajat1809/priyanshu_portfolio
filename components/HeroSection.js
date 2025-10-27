'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const scrollToNext = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    const stats = [
        { value: "8.13/10", label: "Academic CGPA", color: "from-blue-500 to-blue-600" },
        { value: "145,000+", label: "Protein Structures Analyzed", color: "from-purple-500 to-purple-600" },
        { value: "First Author", label: "bioRxiv Publication", color: "from-pink-500 to-pink-600" }
    ];

    const socialLinks = [
        { icon: Github, href: "https://github.com/MrRajat1809", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com/in/priyanshu-kumar1809", label: "LinkedIn" },
        { icon: ExternalLink, href: "https://mrrajat1809.github.io/priyanshu_portfolio", label: "Personal Site" }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-20 md:pt-24">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animate-float"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                    }}
                />
                <div
                    className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animate-float"
                    style={{
                        transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
                        animationDelay: '2s'
                    }}
                />
                <div
                    className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow animate-float"
                    style={{
                        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                        animationDelay: '4s'
                    }}
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center px-4 max-w-5xl mx-auto"
            >
                {/* Profile Image */}
                <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="mb-6 mt-8 md:mt-0"
                >
                    <div className="relative inline-block">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
                        />
                        <Image
                            src="/images/profile.jpg"
                            alt="Priyanshu Kumar"
                            width={140}
                            height={140}
                            className="relative rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                        />
                    </div>
                </motion.div>

                {/* Name and Title */}
                <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-6xl font-bold mb-4"
                >
                    <span className="gradient-text">Priyanshu Kumar</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-3"
                >
                    Computational Structural Biology | Network Science | Stochastic Modeling
                </motion.p>

                <motion.p
                    variants={itemVariants}
                    className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed px-4"
                >
                    Second-year Biotechnology undergraduate at Chandigarh University developing reproducible
                    computational frameworks for protein structure evaluation and network analysis. Research
                    focus on integrating machine learning with physics-based modeling for structural biology applications.
                </motion.p>

                {/* Stats */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 max-w-4xl mx-auto px-4"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all glass"
                        >
                            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                {stat.value}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 px-4"
                >
                    <motion.a
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        href="mailto:rkp6055@gmail.com"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                    >
                        <Mail size={18} />
                        Get In Touch
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        href="/priyanshu_portfolio/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                    >
                        <Download size={18} />
                        Download CV
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://github.com/MrRajat1809"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium transition-all text-sm md:text-base"
                    >
                        <Github size={18} />
                        GitHub
                    </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center gap-4 mb-8"
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            whileHover={{ scale: 1.15, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
                            title={social.label}
                        >
                            <social.icon size={20} className="text-gray-700 dark:text-gray-300" />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col items-center mt-4"
                >
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3">Discover My Journey</p>
                    <motion.button
                        onClick={scrollToNext}
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                    >
                        <ArrowDown size={20} className="text-gray-700 dark:text-gray-300" />
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
}