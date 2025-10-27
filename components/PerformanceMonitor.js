import { useEffect, useState } from 'react';

// Hook for reporting performance metrics using modern web-vitals API
export function usePerformanceReporting() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const reportMetric = (metric) => {
            // Report to Google Analytics if available
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', metric.name, {
                    event_category: 'Web Vitals',
                    event_label: metric.id,
                    value: Math.round(metric.value),
                    non_interaction: true
                });
            }

            // Log to console in development
            if (process.env.NODE_ENV === 'development') {
                console.log('Web Vital:', metric);
            }
        };

        // Use modern Performance API for basic metrics
        const measureBasicMetrics = () => {
            try {
                // TTFB (Time to First Byte)
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    reportMetric({
                        name: 'TTFB',
                        value: navigation.responseStart - navigation.requestStart,
                        id: 'ttfb-native'
                    });
                }

                // FCP (First Contentful Paint)
                const paintEntries = performance.getEntriesByType('paint');
                const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
                if (fcpEntry) {
                    reportMetric({
                        name: 'FCP',
                        value: fcpEntry.startTime,
                        id: 'fcp-native'
                    });
                }

                // LCP (Largest Contentful Paint)
                if ('PerformanceObserver' in window) {
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        if (lastEntry) {
                            reportMetric({
                                name: 'LCP',
                                value: lastEntry.startTime,
                                id: 'lcp-native'
                            });
                        }
                    });

                    try {
                        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                    } catch (e) {
                        console.debug('LCP observation not supported');
                    }

                    // CLS (Cumulative Layout Shift)
                    let cumulativeScore = 0;
                    const clsObserver = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            const layoutShiftEntry = entry;
                            if (!layoutShiftEntry.hadRecentInput) {
                                cumulativeScore += layoutShiftEntry.value;
                            }
                        }
                        reportMetric({
                            name: 'CLS',
                            value: cumulativeScore,
                            id: 'cls-native'
                        });
                    });

                    try {
                        clsObserver.observe({ entryTypes: ['layout-shift'] });
                    } catch (e) {
                        console.debug('CLS observation not supported');
                    }

                    // FID (First Input Delay)
                    let firstInteraction = false;
                    const fidObserver = new PerformanceObserver((list) => {
                        if (firstInteraction) return;

                        const firstInput = list.getEntries()[0];
                        if (firstInput) {
                            firstInteraction = true;
                            const delay = firstInput.processingStart - firstInput.startTime;
                            reportMetric({
                                name: 'FID',
                                value: delay,
                                id: 'fid-native'
                            });
                        }
                    });

                    try {
                        fidObserver.observe({ entryTypes: ['first-input'] });
                    } catch (e) {
                        console.debug('FID observation not supported');
                    }
                }
            } catch (error) {
                console.debug('Performance measurement error:', error);
            }
        };

        // Try to import web-vitals library for enhanced metrics
        import('web-vitals')
            .then((webVitals) => {
                // Check for new API first (v3+)
                if (webVitals.onCLS && webVitals.onFID && webVitals.onFCP && webVitals.onLCP && webVitals.onTTFB) {
                    webVitals.onCLS(reportMetric);
                    webVitals.onFID(reportMetric);
                    webVitals.onFCP(reportMetric);
                    webVitals.onLCP(reportMetric);
                    webVitals.onTTFB(reportMetric);
                } else {
                    measureBasicMetrics();
                }
            })
            .catch(() => {
                measureBasicMetrics();
            });
    }, []);
}

export function PerformanceMonitor({ enabled = process.env.NODE_ENV === 'development' }) {
    const [metrics, setMetrics] = useState({});
    const [showMetrics, setShowMetrics] = useState(false);

    useEffect(() => {
        if (!enabled || typeof window === 'undefined') return;

        const captureWebVitalsForDisplay = () => {
            try {
                // Capture FCP (First Contentful Paint)
                const paintEntries = performance.getEntriesByType('paint');
                const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
                if (fcpEntry) {
                    setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
                }

                // Capture TTFB (Time to First Byte)
                const navigationEntry = performance.getEntriesByType('navigation')[0];
                if (navigationEntry) {
                    const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
                    setMetrics(prev => ({ ...prev, ttfb }));
                }

                // Set up observers for LCP, CLS, and FID if supported
                if ('PerformanceObserver' in window) {
                    // LCP Observer
                    const lcpObserver = new PerformanceObserver((list) => {
                        const entries = list.getEntries();
                        const lastEntry = entries[entries.length - 1];
                        if (lastEntry) {
                            setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
                        }
                    });

                    try {
                        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                    } catch (e) {
                        console.debug('LCP observation not supported');
                    }

                    // CLS Observer
                    let cumulativeScore = 0;
                    const clsObserver = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            const layoutShiftEntry = entry;
                            if (!layoutShiftEntry.hadRecentInput) {
                                cumulativeScore += layoutShiftEntry.value;
                            }
                        }
                        setMetrics(prev => ({ ...prev, cls: cumulativeScore }));
                    });

                    try {
                        clsObserver.observe({ entryTypes: ['layout-shift'] });
                    } catch (e) {
                        console.debug('CLS observation not supported');
                    }

                    // FID Observer
                    let firstInteraction = false;
                    const fidObserver = new PerformanceObserver((list) => {
                        if (firstInteraction) return;

                        const firstInput = list.getEntries()[0];
                        if (firstInput) {
                            firstInteraction = true;
                            const delay = firstInput.processingStart - firstInput.startTime;
                            setMetrics(prev => ({ ...prev, fid: delay }));
                        }
                    });

                    try {
                        fidObserver.observe({ entryTypes: ['first-input'] });
                    } catch (e) {
                        console.debug('FID observation not supported');
                    }

                    return () => {
                        lcpObserver.disconnect();
                        clsObserver.disconnect();
                        fidObserver.disconnect();
                    };
                }
            } catch (error) {
                console.debug('Performance capture error:', error);
            }
        };

        // Capture metrics after page load
        let cleanup;
        if (document.readyState === 'complete') {
            cleanup = captureWebVitalsForDisplay();
        } else {
            const handleLoad = () => {
                cleanup = captureWebVitalsForDisplay();
            };
            window.addEventListener('load', handleLoad);

            return () => {
                window.removeEventListener('load', handleLoad);
                cleanup?.();
            };
        }

        // Keyboard shortcut to toggle metrics (Ctrl/Cmd + Shift + M)
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'M') {
                setShowMetrics(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            cleanup?.();
        };
    }, [enabled]);

    // Function to get metric status (good, needs improvement, poor)
    const getMetricStatus = (metric, value) => {
        const thresholds = {
            lcp: { good: 2500, poor: 4000 },
            fid: { good: 100, poor: 300 },
            cls: { good: 0.1, poor: 0.25 },
            fcp: { good: 1800, poor: 3000 },
            ttfb: { good: 800, poor: 1800 }
        };

        const threshold = thresholds[metric];
        if (!threshold) return 'unknown';

        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs-improvement';
        return 'poor';
    };

    const formatMetric = (value, unit = 'ms') => {
        if (unit === 'score' && value < 1) {
            return value.toFixed(3);
        }
        return `${Math.round(value)}${unit}`;
    };

    // Don't render if disabled or metrics are hidden
    if (!enabled || !showMetrics) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 bg-black/90 text-white p-4 rounded-lg z-50 max-w-sm font-mono text-sm">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-green-400">⚡ Performance Metrics</h3>
                <button
                    onClick={() => setShowMetrics(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                    type="button"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-2">
                {Object.entries(metrics).map(([key, value]) => {
                    if (value === undefined) return null;

                    const status = getMetricStatus(key, value);
                    const statusColors = {
                        good: 'text-green-400',
                        'needs-improvement': 'text-yellow-400',
                        poor: 'text-red-400',
                        unknown: 'text-gray-400'
                    };

                    const metricLabels = {
                        lcp: 'LCP',
                        fid: 'FID',
                        cls: 'CLS',
                        fcp: 'FCP',
                        ttfb: 'TTFB'
                    };

                    const unit = key === 'cls' ? 'score' : 'ms';

                    return (
                        <div key={key} className="flex justify-between">
                            <span className="text-gray-300">
                                {metricLabels[key]}:
                            </span>
                            <span className={statusColors[status]}>
                                {formatMetric(value, unit)}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
                Press Ctrl+Shift+M to toggle
            </div>
        </div>
    );
}

// Development tools component
export function DevTools({ enabled = process.env.NODE_ENV === 'development' }) {
    const [showGrid, setShowGrid] = useState(false);
    const [showOutlines, setShowOutlines] = useState(false);

    // Use the performance reporting hook at the component level
    usePerformanceReporting();

    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (event) => {
            // Ctrl/Cmd + Shift + G for grid
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'G') {
                setShowGrid(prev => !prev);
            }
            // Ctrl/Cmd + Shift + O for outlines
            if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'O') {
                setShowOutlines(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [enabled]);

    useEffect(() => {
        if (showOutlines) {
            document.body.style.outline = '1px solid red';
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                el.style.outline = '1px solid rgba(255, 0, 0, 0.3)';
            });
        } else {
            document.body.style.outline = '';
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                el.style.outline = '';
            });
        }

        return () => {
            document.body.style.outline = '';
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                el.style.outline = '';
            });
        };
    }, [showOutlines]);

    return (
        <>
            <PerformanceMonitor enabled={enabled} />

            {/* Only show dev tools if enabled */}
            {enabled && (
                <>
                    {/* Grid Overlay */}
                    {showGrid && (
                        <div
                            className="fixed inset-0 pointer-events-none z-40"
                            style={{
                                backgroundImage: `
                  linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)
                `,
                                backgroundSize: '20px 20px'
                            }}
                        />
                    )}

                    {/* Dev Tools Panel */}
                    <div className="fixed top-4 right-4 bg-black/90 text-white p-3 rounded-lg z-50 font-mono text-xs">
                        <div className="text-green-400 font-bold mb-2">🔧 Dev Tools</div>
                        <div className="space-y-1 text-gray-300">
                            <div>⌘⇧M - Performance</div>
                            <div>⌘⇧G - Grid {showGrid ? '✓' : '○'}</div>
                            <div>⌘⇧O - Outlines {showOutlines ? '✓' : '○'}</div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}