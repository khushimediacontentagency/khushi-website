'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import Header from '../components/header';
import ServiceForm from '../components/forms/serviceform';
import CreatorForm from '../components/forms/creatorform';
import { CONFIG } from '../utils/config';

function FormsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'service' | 'creator'>('service');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'rate-limited'>('idle');
  const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);

  const hideTabs = searchParams.get('hideTabs') === 'true';

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'creator') setActiveTab('creator');
    else setActiveTab('service');
  }, [searchParams]);

  const onFormSubmit = async (data: any, type: 'service' | 'creator') => {
    if (data.website_hp) return; 
    
    const now = Date.now();
    if (lastSubmitTime && now - lastSubmitTime < 60000) {
      setSubmitStatus('rate-limited');
      return;
    }

    setIsSubmitting(true);
    try {
      let payload = { ...data, type };
      
      if (type === 'creator') {
        payload.finalLocation = data.locationSelect === "Not Listed (Type Below)" ? data.locationCustom : data.locationSelect;
        payload.socials = data.socials.map((s: any) => ({
          platform: s.platform === 'Other' ? (s.customPlatform || 'Other') : s.platform,
          link: s.link,
          followers: s.followers || 'N/A'
        }));
      }

      const fetchRequests = [
        fetch(CONFIG.GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) })
      ];

      if (CONFIG.GOOGLE_SCRIPT_URL_BACKUP) {
        fetchRequests.push(
          fetch(CONFIG.GOOGLE_SCRIPT_URL_BACKUP, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) })
        );
      }

      await Promise.allSettled(fetchRequests);
      setSubmitStatus('success');
      setLastSubmitTime(now);

    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      if (submitStatus !== 'rate-limited') setTimeout(() => setSubmitStatus('idle'), 6000);
    }
  };

  const tabBtnStyle = (isActive: boolean) => `flex-1 py-4 text-center font-bold uppercase tracking-widest transition-all duration-300 ${isActive ? 'bg-[#ff1267] text-white' : 'bg-neutral-900 text-gray-500 hover:bg-neutral-800'}`;

  const content = {
    creator: {
      title: <>Join Our <span className="text-[#ff1267]">Creative</span> Network</>,
      description: "Are you a photographer, influencer, or content creator? Fill in your details below to collaborate with the Khushi Media team."
    },
    service: {
      title: <>Book Your <span className="text-[#ff1267]">Next</span> Shoot</>,
      description: "Ready to elevate your brand or capture a special life moment? Tell us about your vision, and let's bring it to life."
    },
    default: {
      title: <>Let's <span className="text-[#ff1267]">Create</span> Together</>,
      description: "Ready to book a shoot or join our creative network? Select your path below and fill in the details."
    }
  };

  const activeContent = activeTab === 'creator' ? content.creator : activeTab === 'service' ? content.service : content.default;

  return (
    <main className="grow container mx-auto px-4 py-8 pt-32 pb-16 flex flex-col items-center">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">{activeContent.title}</h1>
        <p className="text-xl text-gray-400 font-light leading-relaxed">{activeContent.description}</p>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-6 flex justify-start">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
            <FaArrowLeft /> Back
          </button>
        </div>

        {submitStatus === 'rate-limited' && (
          <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/50 rounded-lg flex items-center gap-3 text-amber-500 animate-pulse">
            <FaExclamationTriangle />
            <p className="text-sm">Please wait a minute before submitting again.</p>
          </div>
        )}

        {!hideTabs && (
          <div className="flex rounded-t-2xl overflow-hidden border border-white/10 border-b-0">
            <button onClick={() => setActiveTab('service')} className={tabBtnStyle(activeTab === 'service')}>Book Services</button>
            <button onClick={() => setActiveTab('creator')} className={tabBtnStyle(activeTab === 'creator')}>Become a Creator</button>
          </div>
        )}

        <div className={`bg-neutral-900 border border-white/10 rounded-b-2xl p-6 md:p-10 shadow-2xl relative ${hideTabs ? 'rounded-t-2xl' : ''}`}>
          {submitStatus === 'success' && (
            <div className="absolute inset-0 z-50 bg-neutral-900/95 flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300 rounded-b-2xl">
              <FaCheckCircle className="text-6xl text-[#ff1267] mb-4" />
              <h3 className="text-3xl font-bold text-white mb-2">Submission Sent!</h3>
              <p className="text-gray-300">Check your email for confirmation.</p>
            </div>
          )}

          {activeTab === 'service' ? (
             <ServiceForm onSubmit={onFormSubmit} isSubmitting={isSubmitting} />
          ) : (
             <CreatorForm onSubmit={onFormSubmit} isSubmitting={isSubmitting} />
          )}
        </div>
      </div>
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