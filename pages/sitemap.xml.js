// Dynamic sitemap generator for the portfolio

const DOMAIN = 'https://mrrajat1809.github.io/priyanshu_portfolio';

const generateSitemap = () => {
    const pages = [
        {
            url: '',
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 1.0
        },
        {
            url: '/#about',
            lastmod: new Date().toISOString(),
            changefreq: 'monthly',
            priority: 0.8
        },
        {
            url: '/#research',
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.9
        },
        {
            url: '/#projects',
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.8
        },
        {
            url: '/#contact',
            lastmod: new Date().toISOString(),
            changefreq: 'monthly',
            priority: 0.7
        }
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${pages
            .map(
                (page) => `    <url>
        <loc>${DOMAIN}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`
            )
            .join('\n')}
</urlset>`;

    return sitemap;
};

export const getServerSideProps = async ({ res }) => {
    const sitemap = generateSitemap();

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return {
        props: {}
    };
};

export default function Sitemap() {
    return null;
}