'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    ExternalLink,
    Calendar,
    Users,
    TrendingUp,
    Microscope,
    Brain,
    Database,
    Award,
    FileText,
    ChevronRight,
    Quote,
    X
} from 'lucide-react';

export default function ResearchSection() {
    const [selectedPublication, setSelectedPublication] = useState(null);

    const researchAreas = [
        {
            id: 'protein-structure',
            title: 'Protein Structure Prediction',
            description: 'Advanced computational methods for predicting and evaluating protein structures using AlphaFold and novel refinement techniques.',
            icon: Microscope,
            color: 'from-blue-500 to-blue-600',
            publications: 1,
            keywords: ['AlphaFold', 'Structure Evaluation', 'Context-Aware Refinement', 'Machine Learning']
        },
        {
            id: 'physics-ml',
            title: 'Physics-Informed ML',
            description: 'Integration of physical laws and constraints into machine learning models for biomolecular modeling and dynamics.',
            icon: Brain,
            color: 'from-purple-500 to-purple-600',
            publications: 1,
            keywords: ['PINNs', 'Deep Learning', 'Protein Dynamics', 'Physics Constraints']
        },
        {
            id: 'structural-biology',
            title: 'Computational Structural Biology',
            description: 'Development of computational frameworks for understanding protein structure-function relationships.',
            icon: Database,
            color: 'from-green-500 to-green-600',
            publications: 2,
            keywords: ['Bioinformatics', 'Structural Analysis', 'Drug Discovery', 'Enzyme Engineering']
        }
    ];

    const publications = [
        {
            id: 'af2rank-2025',
            title: 'AF2Rank Revisited: Reproducing AlphaFold-Based Structure Evaluation and a Hypothesis for Context-Aware Refinement (CAR-AF)',
            authors: ['Priyanshu Kumar', 'Co-authors (if any)'],
            journal: 'bioRxiv (Under Review - The Journal of Supercomputing)',
            year: '2025',
            status: 'under-review',
            doi: '10.1101/2025.04.30.651434',
            abstract: 'This study reproduces and extends the AF2Rank methodology for evaluating AlphaFold protein structure predictions. We processed over 145,000 protein decoy structures and developed a novel reverse classification model achieving 61.5% precision across 133 protein targets. The work introduces a Context-Aware Refinement (CAR-AF) framework to improve AlphaFold predictions through physics-informed constraints and structural validation metrics.',
            impact: 'High',
            technologies: ['Python', 'JAX', 'TensorFlow', 'XGBoost', 'SHAP', 'Optuna'],
            type: 'preprint'
        },
        {
            id: 'pinns-protein',
            title: 'Physics-Informed Neural Networks for Protein Dynamics: A Novel Approach to Biomolecular Modeling',
            authors: ['Priyanshu Kumar', 'Mathematics Faculty Collaborator'],
            journal: 'In Preparation',
            year: '2024',
            status: 'in-preparation',
            abstract: 'This ongoing research explores the integration of Physics-Informed Neural Networks (PINNs) with protein structure modeling. We develop hybrid architectures that combine differential equations with deep learning to predict protein dynamics while respecting fundamental physical laws. The approach shows promise for more accurate and interpretable protein behavior prediction.',
            impact: 'Expected High',
            technologies: ['PyTorch', 'JAX', 'Physics Modeling', 'Deep Learning'],
            type: 'journal'
        }
    ];

    const getStatusConfig = (status) => {
        switch (status) {
            case 'published':
                return {
                    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
                    icon: '✓',
                    label: 'Published'
                };
            case 'under-review':
                return {
                    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
                    icon: '⏳',
                    label: 'Under Review'
                };
            case 'preprint':
                return {
                    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
                    icon: '📄',
                    label: 'Preprint'
                };
            case 'in-preparation':
                return {
                    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
                    icon: '✍️',
                    label: 'In Preparation'
                };
            default:
                return {
                    color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
                    icon: '•',
                    label: status
                };
        }
    };

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

    const researchMetrics = [
        { label: "Publications", value: "2+", icon: BookOpen, color: "text-blue-600" },
        { label: "Under Review", value: "1", icon: FileText, color: "text-purple-600" },
        { label: "Research Areas", value: "3", icon: Microscope, color: "text-green-600" },
        { label: "Collaborations", value: "Faculty", icon: Users, color: "text-orange-600" }
    ];

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
                            Research & Publications
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Advancing the frontiers of computational biology through innovative research and cutting-edge methodologies
                    </p>
                </motion.div>

                {/* Research Areas */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                        Research Areas
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {researchAreas.map((area) => (
                            <motion.div
                                key={area.id}
                                variants={itemVariants}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 group cursor-pointer"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className={`p-3 bg-gradient-to-r ${area.color} rounded-xl`}
                                    >
                                        <area.icon className="w-6 h-6 text-white" />
                                    </motion.div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {area.title}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {area.publications} publication{area.publications !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                                    {area.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {area.keywords.slice(0, 3).map((keyword) => (
                                        <span
                                            key={keyword}
                                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                    {area.keywords.length > 3 && (
                                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-xs">
                                            +{area.keywords.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Research Vision */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl"
                    >
                        <div className="flex items-start gap-6">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="flex-shrink-0"
                            >
                                <Quote className="w-12 h-12 text-blue-200" />
                            </motion.div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    Research Vision
                                </h3>
                                <p className="text-blue-100 text-lg leading-relaxed">
                                    Developing innovative computational frameworks that integrate deep learning methodologies
                                    with physics-based modeling to advance protein structure prediction capabilities. The research
                                    focus includes the use of artificial intelligence for drug discovery, enzyme engineering, and
                                    the elucidation of protein-environment interactions.
                                </p>
                                <p className="text-blue-200 mt-4 font-medium">
                                    — Long-term objective: Contributing to CASP challenges and translating computational
                                    innovations into therapeutic applications
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Publications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                        Publications & Research Output
                    </h3>
                    <div className="space-y-6">
                        {publications.map((publication) => {
                            const statusConfig = getStatusConfig(publication.status);

                            return (
                                <motion.div
                                    key={publication.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 cursor-pointer group"
                                    onClick={() => setSelectedPublication(publication)}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                                                    <span className="mr-1">{statusConfig.icon}</span>
                                                    {statusConfig.label}
                                                </span>
                                                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                                    <Calendar size={14} />
                                                    <span className="text-sm">{publication.year}</span>
                                                </div>
                                                {publication.type === 'journal' && (
                                                    <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                                )}
                                            </div>
                                            <h4 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {publication.title}
                                            </h4>
                                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                                                <span className="font-medium">Authors:</span> {publication.authors.join(', ')}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                                                <span className="font-medium">Journal:</span> {publication.journal}
                                            </p>
                                        </div>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="ml-4"
                                        >
                                            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                                        </motion.div>
                                    </div>

                                    {/* Abstract Preview */}
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                        {publication.abstract}
                                    </p>

                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {publication.technologies.slice(0, 4).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-xs font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {publication.technologies.length > 4 && (
                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs">
                                                +{publication.technologies.length - 4} more
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-3">
                                            {publication.doi && (
                                                <motion.a
                                                    whileHover={{ scale: 1.05 }}
                                                    href={`https://doi.org/${publication.doi}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center gap-1"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <FileText size={14} />
                                                    DOI: {publication.doi}
                                                </motion.a>
                                            )}
                                        </div>
                                        {publication.impact && (
                                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                                <TrendingUp size={14} />
                                                <span className="text-sm font-medium">{publication.impact} Impact</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Research Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-4 gap-6 mb-16"
                >
                    {researchMetrics.map((metric) => (
                        <motion.div
                            key={metric.label}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border border-gray-100 dark:border-gray-700"
                        >
                            <metric.icon className={`w-8 h-8 ${metric.color} mx-auto mb-3`} />
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                {metric.value}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-sm">
                                {metric.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Publication Modal */}
                <AnimatePresence>
                    {selectedPublication && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedPublication(null)}
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
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                                {selectedPublication.title}
                                            </h3>
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(selectedPublication.status).color}`}>
                                                    {getStatusConfig(selectedPublication.status).label}
                                                </span>
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    {selectedPublication.year} • {selectedPublication.journal}
                                                </span>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            onClick={() => setSelectedPublication(null)}
                                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <X size={24} />
                                        </motion.button>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Abstract</h4>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {selectedPublication.abstract}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedPublication.technologies.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {selectedPublication.doi && (
                                            <motion.a
                                                whileHover={{ scale: 1.05 }}
                                                href={`https://doi.org/${selectedPublication.doi}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                                            >
                                                <ExternalLink size={20} />
                                                <span>View Publication</span>
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}