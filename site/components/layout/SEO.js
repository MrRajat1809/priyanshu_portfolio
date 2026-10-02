import Head from 'next/head';
import { links, profile } from '../../lib/content';
import { SITE_URL } from '../../lib/site';

const DEFAULT_TITLE = 'Priyanshu Kumar · Sepsis research and clinical data science';
const DEFAULT_DESCRIPTION =
  'Undergraduate researcher studying sepsis with transcriptomic and critical-care data: a published 36-gene mortality signature, the ClinicalTensorSepsis multi-database resource, and cross-database outcome modeling.';
const DEFAULT_IMAGE = '/images/og-image.png';

const person = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  description: DEFAULT_DESCRIPTION,
  sameAs: [links.github, links.linkedin, links.orcid],
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Chandigarh University' },
  knowsAbout: [
    'Sepsis',
    'Clinical data science',
    'Critical care databases',
    'Transcriptomics',
    'Machine learning',
    'Missing-data imputation',
  ],
};

export default function SEO({ title, description = DEFAULT_DESCRIPTION, path = '/', image = DEFAULT_IMAGE }) {
  const fullTitle = title ? `${title} · ${profile.name}` : DEFAULT_TITLE;
  const url = `${SITE_URL}${path}`;
  const imageUrl = `${SITE_URL}${image}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="author" content={profile.name} />
      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#f0eee9" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#111315" media="(prefers-color-scheme: dark)" />

      <meta property="og:type" content={title ? 'article' : 'profile'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={profile.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {!title && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />}
    </Head>
  );
}
