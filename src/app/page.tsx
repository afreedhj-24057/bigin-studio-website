import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import Why from '@/components/sections/Why';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import AiSection from '@/components/sections/AiSection';
import AiAgentSetup from '@/components/sections/AiAgentSetup';
import Installation from '@/components/sections/Installation';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bigin Studio — Your Bigin Development Workspace',
  openGraph: {
    type: 'website',
    title: 'Bigin Studio — Your Bigin Development Workspace. Simplified.',
    description: 'Set up your Bigin project, manage Git, run the Lyte server and get your AI coding tools configured — in one workspace for macOS.',
  },
  twitter: {
    card: 'summary',
    title: 'Bigin Studio — Your Bigin Development Workspace',
    description: 'A macOS development workspace for the Bigin team.',
  },
};

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Why />
        <Features />
        <HowItWorks />
        <AiSection />
        <AiAgentSetup />
        <Installation />
        <Faq />
      </main>
      <Footer variant="home" />
    </>
  );
}
