// Build-time loader for the personal notes on each project page.
// Notes live in content/projects/<slug>.md. Only used inside getStaticProps.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { BASE_PATH } from './site';

const NOTES_DIR = path.join(process.cwd(), 'content', 'projects');
const WORDS_PER_MINUTE = 200;

const stripTags = (html) => html.replace(/<[^>]+>/g, '').replace(/&[#\w]+;/g, '');

const slugify = (text) =>
  stripTags(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const formatDate = (value) => {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
};

function createParser() {
  const used = new Map();
  const parser = new Marked({ gfm: true });
  parser.use({
    // Root-relative links and images need the site's base path in production.
    walkTokens(token) {
      if ((token.type === 'image' || token.type === 'link') && /^\/(?!\/)/.test(token.href)) {
        token.href = `${BASE_PATH}${token.href}`;
      }
    },
    renderer: {
      // The project title is the page's only h1, so '#' headings render as h2.
      heading({ tokens, depth }) {
        const level = Math.max(depth, 2);
        const html = this.parser.parseInline(tokens);
        let id = slugify(html) || 'section';
        const count = used.get(id) || 0;
        used.set(id, count + 1);
        if (count) id = `${id}-${count}`;
        return `<h${level} id="${id}">${html}</h${level}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const attrs = [
          `href="${href}"`,
          title ? `title="${title}"` : '',
          external ? 'target="_blank" rel="noopener noreferrer"' : '',
        ];
        return `<a ${attrs.filter(Boolean).join(' ')}>${text}</a>`;
      },
    },
  });
  return parser;
}

export function readNotes(slug) {
  const file = path.join(NOTES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const body = content.replace(/<!--[\s\S]*?-->/g, '').trim();
  if (!body) return null;

  const words = stripTags(body).split(/\s+/).filter(Boolean).length;
  return {
    title: data.title && data.title !== 'Notes' ? String(data.title) : null,
    updated: formatDate(data.updated),
    minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    html: createParser().parse(body),
  };
}
