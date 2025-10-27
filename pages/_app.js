import '../styles/globals.css';

// Initialize performance monitoring
if (typeof window !== 'undefined') {
    // Load web-vitals for performance monitoring
    import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
        onCLS(console.log);
        onFID(console.log);
        onFCP(console.log);
        onLCP(console.log);
        onTTFB(console.log);
    });
}

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}