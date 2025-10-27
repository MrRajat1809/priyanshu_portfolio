import Head from 'next/head';

export default function SEO({
    title = "Priyanshu Kumar - Computational Structural Biology | Network Science | Research",
    description = "Biotechnology undergraduate with research focus on computational structural biology and network science. First-author bioRxiv publication on AlphaFold structure evaluation methodology, analyzing 145,000+ protein structures with machine learning approaches.",
    canonical = "https://mrrajat1809.github.io/priyanshu_portfolio",
    ogImage = "https://mrrajat1809.github.io/priyanshu_portfolio/images/og-image.jpg",
    ogType = "website",
    twitterCard = "summary_large_image",
    structuredData,
}) {
    const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Priyanshu Kumar",
        jobTitle: "Computational Biology Researcher",
        description: description,
        url: canonical,
        image: ogImage,
        sameAs: [
            "https://github.com/MrRajat1809",
            "https://linkedin.com/in/priyanshu-kumar1809",
            "https://mrrajat1809.github.io/priyanshu_portfolio",
            "https://orcid.org/0009-0004-1576-027X"
        ],
        affiliation: {
            "@type": "Organization",
            name: "Chandigarh University",
            url: "https://www.cuchd.in/"
        },
        alumniOf: {
            "@type": "Organization",
            name: "Chandigarh University"
        },
        knowsAbout: [
            "Computational Biology",
            "Network Science",
            "Stochastic Modeling",
            "Protein Structure Prediction",
            "AlphaFold",
            "Structural Biology",
            "Machine Learning",
            "Small-World Networks",
            "Markov Processes",
            "Bioinformatics",
            "Data-Driven Research"
        ],
        award: [
            "Tech Invent 2024 - Second Place"
        ]
    };

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="en" />
            <meta name="author" content="Priyanshu Kumar" />

            {/* Canonical URL */}
            <link rel="canonical" href={canonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:url" content={canonical} />
            <meta property="og:site_name" content="Priyanshu Kumar - Portfolio" />
            <meta property="og:locale" content="en_US" />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:creator" content="@priyanshu_kumar" />

            {/* Additional Meta Tags */}
            <meta name="keywords" content="computational biology, network science, stochastic modeling, protein structure prediction, AlphaFold, AF2Rank, structural biology, bioinformatics, machine learning, small-world networks, Markov processes, research, Priyanshu Kumar, Rosetta, bioRxiv" />
            <meta name="theme-color" content="#3b82f6" />
            <meta name="msapplication-TileColor" content="#3b82f6" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData || defaultStructuredData, null, 2)
                }}
            />
        </Head>
    );
}