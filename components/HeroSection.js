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
        { value: "9.2/10", label: "CGPA | Rank 1/107", color: "from-blue-500 to-blue-600" },
        { value: "145K+", label: "Protein Structures Analyzed", color: "from-purple-500 to-purple-600" },
        { value: "61.5%", label: "ML Model Precision", color: "from-pink-500 to-pink-600" }
    ];

    const socialLinks = [
        { icon: Github, href: "https://github.com/MrRajat1809", label: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com/in/priyanshu-kumar1809", label: "LinkedIn" },
        { icon: ExternalLink, href: "https://mrrajat1809.github.io/priyanshu_portfolio", label: "Personal Site" }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
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
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
                        />
                        <Image
                            src="/priyanshu_portfolio/images/profile.jpg"
                            alt="Priyanshu Kumar"
                            width={160}
                            height={160}
                            className="relative rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                        />
                    </div>
                </motion.div>

                {/* Name and Title */}
                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    <span className="gradient-text">Priyanshu Kumar</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4"
                >
                    Computational Structural Biologist & ML Researcher
                </motion.p>

                <motion.p
                    variants={itemVariants}
                    className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    Pioneering the intersection of artificial intelligence and structural biology through
                    innovative protein structure prediction and physics-informed neural networks.
                    Currently pursuing B.E. in Biotechnology with a focus on computational methodologies.
                </motion.p>

                {/* Stats */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all glass"
                        >
                            <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                {stat.value}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-sm">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    <motion.a
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        href="mailto:rkp6055@gmail.com"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                    >
                        <Mail size={20} />
                        Get In Touch
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        href="/priyanshu_portfolio/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                    >
                        <Download size={20} />
                        Download CV
                    </motion.a>

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://github.com/MrRajat1809"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-all"
                    >
                        <Github size={20} />
                        GitHub
                    </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center gap-6 mb-12"
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            whileHover={{ scale: 1.2, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
                            title={social.label}
                        >
                            <social.icon size={24} className="text-gray-700 dark:text-gray-300" />
                        </motion.a>
                    ))}
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col items-center"
                >
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Discover My Journey</p>
                    <motion.button
                        onClick={scrollToNext}
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
                    >
                        <ArrowDown size={24} className="text-gray-700 dark:text-gray-300" />
                    </motion.button>
                </motion.div>
            </motion.div>
        </section>
    );
}