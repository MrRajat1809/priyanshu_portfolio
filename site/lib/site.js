// Prefix for files in public/ when the site is served from a sub-path.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const asset = (path) => `${BASE_PATH}${path}`;

export const SITE_URL = 'https://mrrajat1809.github.io/priyanshu_portfolio';
