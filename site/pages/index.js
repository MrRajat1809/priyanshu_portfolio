import SEO from '../components/layout/SEO';
import Header from '../components/layout/Header';
import Hero from '../components/home/Hero';
import ResearchProgram from '../components/home/ResearchProgram';
import SelectedWork from '../components/home/SelectedWork';
import Publications from '../components/home/Publications';
import Methods from '../components/home/Methods';
import About from '../components/home/About';
import Contact from '../components/home/Contact';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <>
      <SEO />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-bg focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ResearchProgram />
        <SelectedWork />
        <Publications />
        <Methods />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
