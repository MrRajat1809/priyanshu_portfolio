'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    ExternalLink,
    Calendar,
    Star,
    X,
    Code,
    BookOpen,
    Award,
    Mail
} from 'lucide-react';

export default function ProjectsSection() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);

    const categoryIcons = {
        research: BookOpen,
        development: Code,
        academic: Award
    };

    const projects = [
        {
            id: 'af2rank',
            title: 'AF2Rank Reproduction & Extension',
            description: 'Reproduction and extension of the AF2Rank methodology for evaluating AlphaFold structure predictions, analyzing 145,000+ decoy structures across 133 protein targets.',
            longDescription: 'Independent research project reproducing and extending the AF2Rank methodology for protein structure evaluation. Processed over 145,000 Rosetta decoy structures from CASP13 and CASP14 datasets using JAX and TensorFlow. Developed a reverse-classification model using XGBoost that achieved 61.5% accuracy in predicting protein targets from AlphaFold confidence patterns, demonstrating that these metrics encode target-specific structural information. Includes comprehensive model interpretation using SHAP analysis.',
            technologies: ['Python', 'JAX', 'TensorFlow', 'XGBoost', 'SHAP', 'Optuna', 'Biopython'],
            githubUrl: 'https://github.com/MrRajat1809/af2rank-revisited',
            paperUrl: 'https://doi.org/10.1101/2025.04.30.651434',
            status: 'completed',
            featured: true,
            year: '2024',
            category: 'research',
            metrics: [
                { label: 'Structures Processed', value: '145,000+' },
                { label: 'Model Accuracy', value: '61.5%' },
                { label: 'Protein Targets', value: '133' }
            ]
        },
        {
            id: 'pinns',
            title: 'Physics-Informed Neural Networks for Protein Dynamics',
            description: 'Investigation of hybrid neural network architectures that incorporate physics-based constraints for protein modeling, in collaboration with mathematics faculty.',
            longDescription: 'Collaborative research project with mathematics faculty exploring the application of Physics-Informed Neural Networks (PINNs) to structural biology. This work investigates hybrid architectures that integrate differential equations with deep learning approaches for protein structure modeling. The project examines how physics-based constraints can be incorporated into neural network training to improve predictions of protein dynamics and conformational changes.',
            technologies: ['PyTorch', 'Python', 'JAX', 'SciPy', 'Physics Modeling', 'Deep Learning'],
            githubUrl: 'https://github.com/MrRajat1809/protein-pinns',
            status: 'ongoing',
            featured: true,
            year: '2024',
            category: 'research',
            metrics: [
                { label: 'Physics Constraints', value: '12+' },
                { label: 'Model Type', value: 'Hybrid' },
                { label: 'Status', value: 'Faculty Collab' }
            ]
        },
        {
            id: 'ebook-reader',
            title: 'Full-Stack E-Book Reader Application',
            description: 'Web-based e-book reading platform with annotation and highlighting features, supporting multiple document formats.',
            longDescription: 'Full-stack e-book reading application built with React frontend and Node.js backend. Implements features including text highlighting, annotation systems, bookmarking, and reading progress tracking. Supports multiple document formats including EPUB and PDF through integration with EPUB.js library.',
            technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'EPUB.js'],
            githubUrl: 'https://github.com/MrRajat1809/E-Book-Reader',
            status: 'completed',
            featured: false,
            year: '2024',
            category: 'development'
        },
        {
            id: 'bioiot-emergency',
            title: 'IoT-Based Water Quality Monitoring System',
            description: 'IoT system for real-time water quality monitoring using multiple biosensors. Awarded 2nd place at Tech Invent 2024.',
            longDescription: 'IoT-based water quality monitoring system developed for Tech Invent 2024 competition, where it received second place. The system employs multiple biosensor types for real-time water quality assessment, with automated detection of parameter anomalies and alert generation. Implements Arduino-based sensor integration with cloud connectivity for data logging and remote monitoring.',
            technologies: ['Arduino', 'Python', 'IoT Sensors', 'Machine Learning', 'Cloud'],
            githubUrl: 'https://github.com/MrRajat1809/bioiot-water',
            status: 'completed',
            featured: false,
            year: '2024',
            category: 'academic',
            metrics: [
                { label: 'Competition Rank', value: '2nd Place' },
                { label: 'Sensors', value: '8+' },
                { label: 'Response Time', value: '<30s' }
            ]
        }
    ];

    const filters = [
        { id: 'all', label: 'All Projects', count: projects.length },
        { id: 'featured', label: 'Featured', count: projects.filter(p => p.featured).length },
        { id: 'research', label: 'Research', count: projects.filter(p => p.category === 'research').length },
        { id: 'development', label: 'Development', count: projects.filter(p => p.category === 'development').length },
        { id: 'academic', label: 'Academic', count: projects.filter(p => p.category === 'academic').length }
    ];

    const filteredProjects = projects.filter(project => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'featured') return project.featured;
        return project.category === activeFilter;
    });

    const getStatusConfig = (status) => {
        switch (status) {
            case 'completed':
                return {
                    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
                    icon: '',
                    label: 'Completed'
                };
            case 'ongoing':
                return {
                    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
                    icon: '',
                    label: 'In Progress'
                };
            case 'planned':
                return {
                    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
                    icon: '',
                    label: 'Planned'
                };
            default:
                return {
                    color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
                    icon: '',
                    label: status
                };
        }
    };

    return (
        <section className="py-24 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
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
                            Technical Projects
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Research and development projects in computational biology, machine learning, and software engineering
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-3 mb-16"
                >
                    {filters.map((filter) => (
                        <motion.button
                            key={filter.id}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === filter.id
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            {filter.label} ({filter.count})
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => {
                            const statusConfig = getStatusConfig(project.status);
                            const CategoryIcon = categoryIcons[project.category];

                            return (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ y: -8 }}
                                    onHoverStart={() => setHoveredProject(project.id)}
                                    onHoverEnd={() => setHoveredProject(null)}
                                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-100 dark:border-gray-700"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="p-6">
                                        {/* Project Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <motion.div
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                    className={`p-2 rounded-lg ${project.featured
                                                            ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                                                            : 'bg-gray-100 dark:bg-gray-700'
                                                        }`}
                                                >
                                                    <CategoryIcon
                                                        size={20}
                                                        className={project.featured ? 'text-white' : 'text-gray-600 dark:text-gray-300'}
                                                    />
                                                </motion.div>
                                                {project.featured && (
                                                    <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                                                        <Star className="fill-current" size={16} />
                                                        <span className="text-sm font-medium">Featured</span>
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                                <span className="mr-1">{statusConfig.icon}</span>
                                                {statusConfig.label}
                                            </span>
                                        </div>

                                        {/* Project Title & Description */}
                                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Metrics */}
                                        {project.metrics && (
                                            <div className="grid grid-cols-3 gap-2 mb-4">
                                                {project.metrics.map((metric, idx) => (
                                                    <div key={idx} className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                        <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                                            {metric.value}
                                                        </div>
                                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                                            {metric.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.technologies.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-sm font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-sm">
                                                    +{project.technologies.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Links */}
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-3">
                                                {project.githubUrl && (
                                                    <motion.a
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <Github size={20} />
                                                    </motion.a>
                                                )}
                                                {project.liveUrl && (
                                                    <motion.a
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLink size={20} />
                                                    </motion.a>
                                                )}
                                                {project.paperUrl && (
                                                    <motion.a
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        href={project.paperUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <BookOpen size={20} />
                                                    </motion.a>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                                                <Calendar size={14} />
                                                <span className="text-sm">{project.year}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Effect Bar */}
                                    <motion.div
                                        className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: hoveredProject === project.id ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Project Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                                transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-8">
                                    {/* Modal Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <motion.div
                                                whileHover={{ rotate: 360 }}
                                                transition={{ duration: 0.6 }}
                                                className={`p-3 rounded-xl ${selectedProject.featured
                                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                                                        : 'bg-gray-100 dark:bg-gray-700'
                                                    }`}
                                            >
                                                {React.createElement(categoryIcons[selectedProject.category], {
                                                    size: 24,
                                                    className: selectedProject.featured ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                                                })}
                                            </motion.div>
                                            <div>
                                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                                    {selectedProject.title}
                                                </h3>
                                                <div className="flex items-center gap-3">
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(selectedProject.status).color}`}>
                                                        <span className="mr-1">{getStatusConfig(selectedProject.status).icon}</span>
                                                        {getStatusConfig(selectedProject.status).label}
                                                    </span>
                                                    {selectedProject.featured && (
                                                        <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                                                            <Star className="fill-current" size={16} />
                                                            <span className="text-sm font-medium">Featured</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                        <Calendar size={16} />
                                                        <span className="text-sm">{selectedProject.year}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSelectedProject(null)}
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <X size={24} className="text-gray-600 dark:text-gray-300" />
                                        </motion.button>
                                    </div>

                                    {/* Project Description */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mb-8"
                                    >
                                        <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                                            Project Overview
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                            {selectedProject.longDescription}
                                        </p>
                                    </motion.div>

                                    {/* Metrics */}
                                    {selectedProject.metrics && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="mb-8"
                                        >
                                            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                                Key Metrics
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {selectedProject.metrics.map((metric, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        whileHover={{ scale: 1.05 }}
                                                        className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl"
                                                    >
                                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                                            {metric.value}
                                                        </div>
                                                        <div className="text-gray-600 dark:text-gray-300 font-medium">
                                                            {metric.label}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Technologies */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="mb-8"
                                    >
                                        <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                            Technologies & Tools
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedProject.technologies.map((tech, idx) => (
                                                <motion.span
                                                    key={tech}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.1 * idx }}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-lg font-medium text-sm shadow-sm"
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Action Buttons */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex flex-wrap gap-4"
                                    >
                                        {selectedProject.githubUrl && (
                                            <motion.a
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                href={selectedProject.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 bg-gray-900 dark:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                                            >
                                                <Github size={20} />
                                                <span>View Source Code</span>
                                            </motion.a>
                                        )}
                                        {selectedProject.liveUrl && (
                                            <motion.a
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                href={selectedProject.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                                            >
                                                <ExternalLink size={20} />
                                                <span>Live Demo</span>
                                            </motion.a>
                                        )}
                                        {selectedProject.paperUrl && (
                                            <motion.a
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                href={selectedProject.paperUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                                            >
                                                <BookOpen size={20} />
                                                <span>Read Paper</span>
                                            </motion.a>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-20"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Research Collaboration
                        </h3>
                        <p className="text-blue-100 mb-6 text-lg">
                            Open to discussing research collaborations, project opportunities, and academic exchanges in computational structural biology and related fields.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="mailto:rkp6055@gmail.com"
                                className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                            >
                                <Mail size={20} />
                                <span>Start a Conversation</span>
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://github.com/MrRajat1809"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-white/10"
                            >
                                <Github size={20} />
                                <span>Follow My Work</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}