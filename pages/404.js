'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { ThemeProvider } from '../contexts/ThemeProvider';
import SEO from '../components/SEO';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timeout = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <ThemeProvider>
      <SEO
        title="404 - Page Not Found | Priyanshu Kumar"
        description="The page you're looking for doesn't exist."
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              404
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-800 dark:text-white mb-4"
          >
            Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto"
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            You&apos;ll be redirected to the homepage in 5 seconds.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={handleGoHome}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Go Home Now
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12"
          >
            <svg
              className="w-64 h-64 mx-auto text-blue-200 dark:text-blue-900"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </ThemeProvider>
  );
}
