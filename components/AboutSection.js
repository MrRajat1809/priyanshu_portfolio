'use client';

import { motion } from 'framer-motion';
import {
    Brain,
    Code,
    GraduationCap,
    Target,
    Award,
    BookOpen,
    Download,
    ExternalLink,
    Network
} from 'lucide-react';

export default function AboutSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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

    const skills = [
        {
            category: "Programming & Scientific Computing",
            icon: Code,
            items: ["Python", "C++", "Bash", "LaTeX", "Jupyter", "Google Colab"],
            color: "from-blue-500 to-blue-600"
        },
        {
            category: "Machine Learning & Modeling",
            icon: Brain,
            items: ["TensorFlow", "PyTorch", "XGBoost", "scikit-learn", "SHAP", "Optuna"],
            color: "from-purple-500 to-purple-600"
        },
        {
            category: "Computational Biology",
            icon: BookOpen,
            items: ["AlphaFold2", "ColabFold", "Rosetta Suite", "Biopython", "PyMOL", "ChimeraX"],
            color: "from-green-500 to-green-600"
        },
        {
            category: "Data Analysis & Network Science",
            icon: Network,
            items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "PCA/t-SNE/UMAP", "Network Analysis"],
            color: "from-orange-500 to-orange-600"
        }
    ];

    const achievements = [
        {
            title: "CGPA 8.13/10",
            description: "First Year Academic Performance",
            icon: Award,
            color: "text-yellow-600"
        },
        {
            title: "First Author",
            description: "bioRxiv Publication (Under Review - Springer)",
            icon: BookOpen,
            color: "text-green-600"
        },
        {
            title: "Tech Invent 2024",
            description: "Second Place - IoT Water Quality System",
            icon: Target,
            color: "text-blue-600"
        }
    ];

    return (
        <section className="py-24 px-4 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                            About Me
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Bridging computational biology, network science, and stochastic modeling to decode biological systems
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column - Story */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                                Research Background
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                I am a second-year Biotechnology undergraduate at Chandigarh University with research
                                interests in computational structural biology and network science. My work focuses on
                                developing reproducible computational pipelines for protein structure evaluation,
                                investigating the application of machine learning methods to structural biology problems,
                                and exploring network-theoretic approaches to biological systems.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                Through independent research, I have reproduced and extended the AF2Rank methodology
                                for AlphaFold-based structure evaluation, analyzing over 145,000 Rosetta decoy structures.
                                This work demonstrates how machine learning models can quantitatively assess protein
                                structure quality and explores connections between model confidence patterns and
                                network-theoretic properties of protein systems.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h4 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Research Interests
                            </h4>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                My research interests lie in developing integrative computational frameworks that combine
                                deep learning, network theory, and physics-based modeling for structural biology applications.
                                I am particularly interested in improving protein structure prediction methodologies,
                                understanding network properties in biological systems, and applying stochastic modeling
                                approaches to computational neuroscience and systems biology.
                            </p>
                        </motion.div>

                        {/* Achievements */}
                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center"
                                >
                                    <achievement.icon className={`w-8 h-8 ${achievement.color} mx-auto mb-2`} />
                                    <h5 className="font-bold text-gray-900 dark:text-white mb-1">
                                        {achievement.title}
                                    </h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {achievement.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Skills & Education */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Education */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                                Education
                            </h3>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl"
                                    >
                                        <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </motion.div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Bachelor of Engineering
                                        </h4>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                                            Biotechnology • Chandigarh University
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <span className="font-semibold">CGPA:</span> 8.13/10 (First Year)
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <span className="font-semibold">Focus:</span> Computational Biology, Network Science
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        <span className="font-semibold">Duration:</span> Aug 2024 – Jul 2028
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Skills */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                                Technical Skills
                            </h3>
                            <div className="space-y-4">
                                {skills.map((skillGroup, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <motion.div
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                                className={`p-2 bg-gradient-to-r ${skillGroup.color} rounded-lg`}
                                            >
                                                <skillGroup.icon className="w-5 h-5 text-white" />
                                            </motion.div>
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {skillGroup.category}
                                            </h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {skillGroup.items.map((skill, skillIndex) => (
                                                <motion.span
                                                    key={skill}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: skillIndex * 0.1 }}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium"
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div variants={itemVariants} className="pt-6">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/priyanshu_portfolio/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                            >
                                <Download size={20} />
                                <span>Download Full Resume</span>
                                <ExternalLink size={16} />
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}