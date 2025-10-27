import React from 'react';
import { motion } from 'framer-motion';

// Main Loading component
export default function Loading({
    text = "Loading...",
    size = 'md',
    fullScreen = false
}) {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    const containerClass = fullScreen
        ? 'fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 flex items-center justify-center z-50'
        : 'flex items-center justify-center p-8';

    return (
        <div className={containerClass}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
            >
                {/* DNA Helix Loader */}
                <div className={`relative ${sizeClasses[size]}`}>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <div className="w-full h-full border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full"></div>
                    </motion.div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2"
                    >
                        <div className="w-full h-full border-2 border-purple-200 dark:border-purple-800 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-full border-2 border-transparent border-t-purple-600 rounded-full"></div>
                    </motion.div>
                </div>

                {/* Loading text with animation */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 dark:text-gray-300 font-medium"
                >
                    {text}
                </motion.p>

                {/* Animated dots */}
                <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

// Skeleton Loading Component
export function SkeletonLoader({
    lines = 3,
    className = "",
    avatar = false
}) {
    return (
        <div className={`animate-pulse ${className}`}>
            {avatar && (
                <div className="flex items-center space-x-3 mb-4">
                    <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
            )}
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className={`bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 ${i === lines - 1 ? 'w-3/4' : 'w-full'
                        }`}
                    style={{ height: '1.25rem' }}
                />
            ))}
        </div>
    );
}

// Page Loading Component
export function PageLoader() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <Loading
                text="Initializing Portfolio..."
                size="lg"
                fullScreen
            />
        </div>
    );
}

// Card Loading Component
export function CardLoader({ count = 3 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                    <SkeletonLoader lines={4} avatar />
                </div>
            ))}
        </div>
    );
}

// Button Loading Component
export function ButtonLoader({ text = "Loading..." }) {
    return (
        <div className="flex items-center gap-2">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
            <span>{text}</span>
        </div>
    );
}

// Text Loading Component with typewriter effect
export function TypewriterLoader({
    text = "Loading your content...",
    speed = 100
}) {
    const [displayText, setDisplayText] = React.useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    return (
        <div className="flex items-center gap-2">
            <span className="font-mono">{displayText}</span>
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-blue-600 dark:text-blue-400"
            >
                |
            </motion.span>
        </div>
    );
}

// Progress Loading Component
export function ProgressLoader({
    progress = 0,
    text = "Loading..."
}) {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {text}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(progress)}%
                </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>
        </div>
    );
}

// Spinner variants
export function SpinnerLoader({ size = 'md', color = 'blue' }) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4'
    };

    const colorClasses = {
        blue: 'border-blue-600 border-t-transparent',
        gray: 'border-gray-600 border-t-transparent',
        white: 'border-white border-t-transparent'
    };

    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
        />
    );
}

// Pulse Loader
export function PulseLoader({ color = 'blue' }) {
    const colorClasses = {
        blue: 'bg-blue-600',
        gray: 'bg-gray-600',
        purple: 'bg-purple-600'
    };

    return (
        <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                    }}
                    className={`w-3 h-3 ${colorClasses[color]} rounded-full`}
                />
            ))}
        </div>
    );
}

// Wave Loader
export function WaveLoader({ color = 'blue' }) {
    const colorClasses = {
        blue: 'bg-blue-600',
        gray: 'bg-gray-600',
        purple: 'bg-purple-600'
    };

    return (
        <div className="flex space-x-1 items-end">
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    animate={{
                        scaleY: [1, 2, 1],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1
                    }}
                    className={`w-1 h-8 ${colorClasses[color]} rounded-full`}
                />
            ))}
        </div>
    );
}