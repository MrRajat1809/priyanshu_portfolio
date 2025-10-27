import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Analytics({ measurementId = process.env.NEXT_PUBLIC_GA_ID }) {
    const router = useRouter();

    useEffect(() => {
        if (!measurementId) return;

        const handleRouteChange = (url) => {
            if (typeof window.gtag !== 'undefined') {
                window.gtag('config', measurementId, {
                    page_path: url,
                });
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events, measurementId]);

    if (!measurementId) {
        return null;
    }

    return (
        <>
            {/* Google Analytics */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            send_page_view: true
          });
        `}
            </Script>

            {/* Microsoft Clarity (Optional) */}
            <Script id="clarity-analytics" strategy="afterInteractive">
                {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
        `}
            </Script>
        </>
    );
}

// Custom hook for tracking events
export function useAnalytics() {
    const trackEvent = (eventName, eventParameters = {}) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', eventName, eventParameters);
        }
    };

    const trackPageView = (pagePath) => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
                page_path: pagePath,
            });
        }
    };

    const trackDownload = (fileName) => {
        trackEvent('file_download', {
            file_name: fileName,
            event_category: 'engagement',
            event_label: fileName
        });
    };

    const trackFormSubmission = (formName) => {
        trackEvent('form_submit', {
            form_name: formName,
            event_category: 'engagement',
            event_label: formName
        });
    };

    const trackExternalLink = (url, linkText) => {
        trackEvent('click', {
            event_category: 'outbound',
            event_label: url,
            link_text: linkText
        });
    };

    const trackSectionView = (sectionName) => {
        trackEvent('section_view', {
            section_name: sectionName,
            event_category: 'engagement',
            event_label: sectionName
        });
    };

    const trackResearchInteraction = (interactionType, researchItem) => {
        trackEvent('research_interaction', {
            interaction_type: interactionType,
            research_item: researchItem,
            event_category: 'research',
            event_label: `${interactionType} - ${researchItem}`
        });
    };

    const trackProjectInteraction = (interactionType, projectName) => {
        trackEvent('project_interaction', {
            interaction_type: interactionType,
            project_name: projectName,
            event_category: 'projects',
            event_label: `${interactionType} - ${projectName}`
        });
    };

    return {
        trackEvent,
        trackPageView,
        trackDownload,
        trackFormSubmission,
        trackExternalLink,
        trackSectionView,
        trackResearchInteraction,
        trackProjectInteraction
    };
}