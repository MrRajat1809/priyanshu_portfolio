import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/layout/SEO';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Eyebrow } from '../components/ui';

export default function NotFound() {
  return (
    <>
      <SEO title="Page not found" path="/404/" />
      <Header home={false} />
      <main id="main" className="container-page flex min-h-[60vh] flex-col justify-center py-24">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          The address may have changed. The research, publications, and project pages are all linked from the home page.
        </p>
        <Link href="/" className="link mt-8 inline-flex items-center gap-1.5 self-start text-sm">
          <ArrowLeft aria-hidden="true" size={14} strokeWidth={1.75} />
          Back to the home page
        </Link>
      </main>
      <Footer />
    </>
  );
}
