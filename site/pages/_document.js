import { Html, Head, Main, NextScript } from 'next/document';
import { asset } from '../lib/site';

// Runs before first paint so the stored theme does not flash.
// The `js` class enables scroll-reveal start states only when scripts run.
const themeScript = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('portfolio-theme');var d=t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.add(d?'dark':'light');}catch(e){}`;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" href={asset('/favicon.svg')} type="image/svg+xml" />
        <link rel="icon" href={asset('/favicon.ico')} sizes="32x32" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
