import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Home, Mail, AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.setState({ error, errorInfo });

        // Log error to analytics if available
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'exception', {
                description: error.toString(),
                fatal: false
            });
        }
    }

    handleRefresh = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.reload();
    };

    handleGoHome = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-red-900/20 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        {/* Error Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                            className="mb-8"
                        >
                            <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
                            </div>
                        </motion.div>

                        {/* Error Message */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                Oops! Something went wrong
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                Don not worry, this isnt a critical error in my computational models!
                                Just a minor glitch in the portfolio interface.
                            </p>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <motion.details
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mb-6 text-left"
                                >
                                    <summary className="cursor-pointer text-red-600 dark:text-red-400 font-medium mb-2">
                                        Technical Details (Development Mode)
                                    </summary>
                                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-auto">
                                        <p className="font-semibold text-red-600 dark:text-red-400 mb-2">
                                            {this.state.error.name}: {this.state.error.message}
                                        </p>
                                        <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-xs">
                                            {this.state.error.stack}
                                        </pre>
                                        {this.state.errorInfo && (
                                            <pre className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-xs">
                                                {this.state.errorInfo.componentStack}
                                            </pre>
                                        )}
                                    </div>
                                </motion.details>
                            )}
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap justify-center gap-4 mb-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={this.handleRefresh}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                            >
                                <RefreshCw size={20} />
                                Try Again
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={this.handleGoHome}
                                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                            >
                                <Home size={20} />
                                Go Home
                            </motion.button>

                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="mailto:rkp6055@gmail.com?subject=Portfolio Error Report"
                                className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-all"
                            >
                                <Mail size={20} />
                                Report Issue
                            </motion.a>
                        </motion.div>

                        {/* Fun Message */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-gray-500 dark:text-gray-400 italic"
                        >
                            <p className="mb-2">
                                In computational biology, we debug proteins. In web development, we debug portfolios.
                            </p>
                            <p className="text-sm">
                                — Priyanshu Kumar, probably
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

// Hook for error reporting
export function useErrorHandler() {
    const reportError = (error, errorInfo) => {
        console.error('Error reported:', error, errorInfo);

        // Log to analytics
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'exception', {
                description: error.toString(),
                fatal: false
            });
        }

        // Could also send to error reporting service like Sentry
        // Sentry.captureException(error, { extra: errorInfo });
    };

    return { reportError };
}

// Higher-order component for error boundaries
export function withErrorBoundary(Component, fallback) {
    const WrappedComponent = (props) => (
        <ErrorBoundary fallback={fallback}>
            <Component {...props} />
        </ErrorBoundary>
    );

    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
    return WrappedComponent;
}