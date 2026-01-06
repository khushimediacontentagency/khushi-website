'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '../components/header';
import ContactForms from '../components/contactforms';

function FormsContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const content = {
    creator: {
      title: (
        <>
          Join Our <span className="text-[#ff1267]">Creative</span> Network
        </>
      ),
      description: "Are you a photographer, influencer, or content creator? Fill in your details below to collaborate with the Khushi Media team and advance your career."
    },
    service: {
      title: (
        <>
          Book Your <span className="text-[#ff1267]">Next</span> Shoot
        </>
      ),
      description: "Ready to elevate your brand or capture a special life moment? Tell us about your vision, and let's bring it to life with professional content."
    },
    default: {
      title: (
        <>
          Let's <span className="text-[#ff1267]">Create</span> Together
        </>
      ),
      description: "Ready to book a shoot or join our creative network? Select your path below and fill in the details."
    }
  };

  const activeContent = tab === 'creator' ? content.creator : tab === 'service' ? content.service : content.default;

  return (
    <main className="grow container mx-auto px-4 py-8 pt-32 pb-16 flex flex-col items-center">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">
          {activeContent.title}
        </h1>
        <p className="text-xl text-gray-400 font-light leading-relaxed">
          {activeContent.description}
        </p>
      </div>

      <ContactForms />
    </main>
  );
}

export default function FormsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <FormsContent />
      </Suspense>
      <footer className="py-8 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} KhushiMedia. All rights reserved.
      </footer>
    </div>
  );
}