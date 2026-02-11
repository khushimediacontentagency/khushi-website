'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { FaPlus, FaTrash, FaCheckCircle, FaSpinner, FaExclamationTriangle, FaChevronDown, FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaLink, FaHashtag, FaGlobe } from 'react-icons/fa';
import { CONFIG } from '../utils/config';

const UK_CITIES = [
  "Not Listed (Type Below)", "London", "Manchester", "Birmingham", "Leeds", "Glasgow", 
  "Southampton", "Liverpool", "Newcastle", "Nottingham", "Sheffield", 
  "Bristol", "Belfast", "Leicester", "Edinburgh", "Cardiff", "Coventry", 
  "Bradford", "Brighton", "Hull", "Stoke-on-Trent", "Wolverhampton"
];

function CustomSelect({ options, label, value, onChange, placeholder, error, icon: Icon }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && <label className="block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wide">{label}</label>}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-full bg-white/5 border ${error ? 'border-[#ff1267]' : 'border-white/10'} rounded-lg py-3 text-white flex justify-between items-center cursor-pointer hover:border-[#ff1267]/50 transition-all ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
      >
        {Icon && <Icon className="absolute left-3 text-[#ff1267] text-sm" />}
        <span className={!value ? "text-gray-500" : "text-white"}>
          {value || placeholder}
        </span>
        <FaChevronDown className={`text-xs transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#121212] border border-white/10 rounded-lg shadow-2xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 custom-scrollbar">
          {options.map((opt: string) => (
            <div 
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className="px-4 py-3 text-white hover:bg-[#ff1267] hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-0"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-[#ff1267] text-xs mt-1">{error.message || "Required"}</p>}
    </div>
  );
}

function ContactFormInner() {
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

  const { register: regService, handleSubmit: handleService, reset: resetService, setValue: setValService, watch: watchService, formState: { errors: servErrors } } = useForm<any>();
  const selectedService = watchService('serviceType');

  const { register: regCreator, handleSubmit: handleCreator, control, reset: resetCreator, setValue: setValCreator, watch: watchCreator, formState: { errors: creatErrors } } = useForm<any>({
    defaultValues: { 
      socials: [
        { platform: 'Instagram', link: '', followers: '' } 
      ],
      agencies: 'No', 
      locationSelect: ''
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "socials" });
  
  const agencyStatus = watchCreator('agencies');
  const locationSelection = watchCreator('locationSelect');

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

      await fetch(CONFIG.GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
      
      setSubmitStatus('success');
      setLastSubmitTime(now);
      type === 'service' ? resetService() : resetCreator();

    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      if (submitStatus !== 'rate-limited') setTimeout(() => setSubmitStatus('idle'), 6000);
    }
  };

  const inputStyle = (hasError: boolean, hasIcon: boolean = false) => `w-full bg-white/5 border ${hasError ? 'border-[#ff1267]' : 'border-white/10'} rounded-lg ${hasIcon ? 'pl-10 pr-4' : 'px-4'} py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff1267] focus:ring-1 focus:ring-[#ff1267] transition-all`;
  const labelStyle = "block text-sm font-medium text-gray-400 mb-1 uppercase tracking-wide";
  const tabBtnStyle = (isActive: boolean) => `flex-1 py-4 text-center font-bold uppercase tracking-widest transition-all duration-300 ${isActive ? 'bg-[#ff1267] text-white' : 'bg-neutral-900 text-gray-500 hover:bg-neutral-800'}`;

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-6 flex justify-start">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
        >
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
          <form onSubmit={handleService((data) => onFormSubmit(data, 'service'))} className="space-y-6">
            <input type="text" {...regService('website_hp')} className="hidden" tabIndex={-1} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className={labelStyle}>First Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
                  <input {...regService('firstName', { required: "First name is required" })} className={inputStyle(!!servErrors.firstName, true)} placeholder="First Name" />
                </div>
                {servErrors.firstName && <p className="text-[#ff1267] text-xs mt-1">{servErrors.firstName.message as string}</p>}
              </div>
              <div>
                <label className={labelStyle}>Last Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
                  <input {...regService('lastName', { required: "Last name is required" })} className={inputStyle(!!servErrors.lastName, true)} placeholder="Last Name" />
                </div>
                {servErrors.lastName && <p className="text-[#ff1267] text-xs mt-1">{servErrors.lastName.message as string}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
                  <input {...regService('email', { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} className={inputStyle(!!servErrors.email, true)} placeholder="Email" />
                </div>
                {servErrors.email && <p className="text-[#ff1267] text-xs mt-1">{servErrors.email.message as string}</p>}
              </div>
              <div>
                <label className={labelStyle}>Phone</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
                  <input {...regService('phone', { required: "Phone number is required" })} className={inputStyle(!!servErrors.phone, true)} placeholder="07941344450" />
                </div>
                {servErrors.phone && <p className="text-[#ff1267] text-xs mt-1">{servErrors.phone.message as string}</p>}
              </div>
            </div>

            <CustomSelect 
              label="Service Type" 
              placeholder="Select an option..."
              options={["Birthdays", "Graduation", "Wedding", "Brand Shoot", "Other"]}
              value={selectedService}
              onChange={(val: string) => setValService('serviceType', val, { shouldValidate: true })}
              error={servErrors.serviceType}
              icon={FaGlobe}
            />
            <input type="hidden" {...regService('serviceType', { required: "Please select a service type" })} />

            <div>
              <label className={labelStyle}>Event Details</label>
              <textarea {...regService('details', { required: "Please provide event details" })} className={`${inputStyle(!!servErrors.details)} min-h-37.5`} placeholder="Tell us more about your event..."></textarea>
              {servErrors.details && <p className="text-[#ff1267] text-xs mt-1">{servErrors.details.message as string}</p>}
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-[#ff1267] text-white font-bold uppercase py-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-[0.98]">
              {isSubmitting ? <FaSpinner className="animate-spin" /> : 'Submit Enquiry'}
            </button>
          </form>

        ) : (

          <form onSubmit={handleCreator((data) => onFormSubmit(data, 'creator'))} className="space-y-6">
            <input type="text" {...regCreator('website_hp')} className="hidden" tabIndex={-1} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>First Name</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
                  <input {...regCreator('firstName', { required: "First name is required" })} className={inputStyle(!!creatErrors.firstName, true)} placeholder="First Name" />
                </div>
                {creatErrors.firstName && <p className="text-[#ff1267] text-xs mt-1">{creatErrors.firstName.message as string}</p>}
              </div>
              <div>
                <label className={labelStyle}>Surname</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
                  <input {...regCreator('lastName', { required: "Surname is required" })} className={inputStyle(!!creatErrors.lastName, true)} placeholder="Surname" />
                </div>
                {creatErrors.lastName && <p className="text-[#ff1267] text-xs mt-1">{creatErrors.lastName.message as string}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
                  <input {...regCreator('email', { required: "Email is required" })} className={inputStyle(!!creatErrors.email, true)} placeholder="Email" />
                </div>
                {creatErrors.email && <p className="text-[#ff1267] text-xs mt-1">{creatErrors.email.message as string}</p>}
              </div>
              <div>
                <label className={labelStyle}>Phone</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
                  <input {...regCreator('phone', { required: "Phone number is required" })} className={inputStyle(!!creatErrors.phone, true)} placeholder="07941344450" />
                </div>
                {creatErrors.phone && <p className="text-[#ff1267] text-xs mt-1">{creatErrors.phone.message as string}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="w-full">
                  <CustomSelect 
                    label="Where are you based?"
                    placeholder="Select City"
                    options={UK_CITIES}
                    value={locationSelection}
                    onChange={(val: string) => setValCreator('locationSelect', val, { shouldValidate: true })}
                    error={creatErrors.locationSelect}
                    icon={FaMapMarkerAlt}
                  />
                  <input type="hidden" {...regCreator('locationSelect', { required: "Location is required" })} />
               </div>
               
               {locationSelection === "Not Listed (Type Below)" && (
                 <div className="w-full animate-in fade-in slide-in-from-left-2 duration-300">
                    <label className={labelStyle}>Enter Your City / Location</label>
                    <div className="relative">
                      <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
                      <input 
                        {...regCreator('locationCustom', { required: "Please specify your location" })} 
                        className={inputStyle(!!creatErrors.locationCustom, true)} 
                        placeholder="e.g. Dubai, New York, etc." 
                      />
                    </div>
                    {creatErrors.locationCustom && <p className="text-[#ff1267] text-xs mt-1">{creatErrors.locationCustom.message as string}</p>}
                 </div>
               )}
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/5">
                <label className="block text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                  <FaBuilding className="text-[#ff1267]" /> Are you currently with any other agencies?
                </label>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex gap-4 items-center min-w-[150px]">
                        <label className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg border transition-all ${agencyStatus === 'Yes' ? 'border-[#ff1267] bg-[#ff1267]/10' : 'border-white/10 bg-white/5'}`}>
                            <input 
                              type="radio" 
                              value="Yes" 
                              {...regCreator('agencies', { required: "Please select an option" })} 
                              className="accent-[#ff1267]"
                            />
                            <span className="text-white font-medium">Yes</span>
                        </label>
                        <label className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg border transition-all ${agencyStatus === 'No' ? 'border-[#ff1267] bg-[#ff1267]/10' : 'border-white/10 bg-white/5'}`}>
                            <input 
                              type="radio" 
                              value="No" 
                              {...regCreator('agencies', { required: "Please select an option" })} 
                              className="accent-[#ff1267]"
                            />
                            <span className="text-white font-medium">No</span>
                        </label>
                    </div>

                    {agencyStatus === 'Yes' && (
                        <div className="flex-1 w-full animate-in fade-in slide-in-from-left-2 duration-300">
                            <input 
                              {...regCreator('agencyList', { required: "Please list the agencies" })} 
                              className={inputStyle(!!creatErrors.agencyList)} 
                              placeholder="Please list them here..." 
                            />
                            {creatErrors.agencyList && <p className="text-[#ff1267] text-xs mt-1">{creatErrors.agencyList.message as string}</p>}
                        </div>
                    )}
                </div>
                {creatErrors.agencies && <p className="text-[#ff1267] text-xs mt-1">{creatErrors.agencies.message as string}</p>}
            </div>

            <div className="space-y-4">
              <label className={labelStyle}>Social Media & Follower Count</label>
              {fields.map((field, index) => (
                <SocialRow 
                  key={field.id} 
                  index={index} 
                  register={regCreator} 
                  remove={remove} 
                  control={control} 
                  showDelete={fields.length > 1} 
                  setVal={setValCreator} 
                  watch={watchCreator} 
                  errors={creatErrors} 
                />
              ))}
              <button type="button" onClick={() => append({ platform: '', link: '', followers: '' })} className="text-[#ff1267] text-xs font-bold uppercase flex items-center gap-2 hover:text-white transition-colors">
                <FaPlus /> Add Another Platform
              </button>
            </div>

            <div>
              <label className={labelStyle}>Creative Bio / Details</label>
              <textarea {...regCreator('details', { required: "Bio is required" })} className={`${inputStyle(!!creatErrors.details)} min-h-30`} placeholder="Tell us about your work and creative journey..."></textarea>
              {creatErrors.details && <p className="text-[#ff1267] text-xs mt-1">{creatErrors.details.message as string}</p>}
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full bg-white text-black font-bold uppercase py-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-[0.98]">
              {isSubmitting ? <FaSpinner className="animate-spin" /> : 'Apply Today'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function SocialRow({ index, register, remove, showDelete, setVal, watch, errors }: any) {
  const platform = watch(`socials.${index}.platform`);
  const linkError = errors?.socials?.[index]?.link;
  const followersError = errors?.socials?.[index]?.followers;
  
  const inputStyle = (hasError: boolean, hasIcon: boolean = false) => `w-full bg-white/5 border ${hasError ? 'border-[#ff1267]' : 'border-white/10'} rounded-lg ${hasIcon ? 'pl-10 pr-4' : 'px-4'} py-3 text-white focus:border-[#ff1267] focus:ring-0 outline-none transition-all`;

  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-start">
        
        <div className="w-full md:w-1/4 min-w-[140px]">
          <CustomSelect 
            placeholder="Platform"
            options={["Instagram", "TikTok", "YouTube", "Portfolio", "Other"]}
            value={platform}
            onChange={(val: string) => setVal(`socials.${index}.platform`, val, { shouldValidate: true })}
            icon={FaGlobe}
          />
        </div>

        <div className="flex-1 w-full">
          <div className="relative">
            <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
            <input 
                {...register(`socials.${index}.link`, { 
                  required: "Link is required",
                  pattern: {
                    value: /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,9}(\/[\w- ./?%&=@_]*)?$/i,
                    message: "Must be a valid link (e.g. https://instagram.com/jesalvadgama...)"
                  }
                })} 
                className={inputStyle(!!linkError, true)} 
                placeholder={platform ? `${platform} Link...` : "Profile Link..."} 
              />
          </div>
          {linkError && <p className="text-[#ff1267] text-xs mt-1">{linkError.message}</p>}
        </div>

        <div className="w-full md:w-1/4 min-w-[130px] flex gap-2">
            <div className="w-full relative">
                <FaHashtag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-xs" />
                <input 
                  type="text"
                  {...register(`socials.${index}.followers`, { 
                    pattern: {
                        value: /^(?:[0-9,.]+|n\/?a)$/i,
                        message: "Numbers or 'N/A' only"
                    }
                  })} 
                  className={inputStyle(!!followersError, true)} 
                  placeholder="Followers or N/A" 
                />
                {followersError && <p className="text-[#ff1267] text-xs mt-1">{followersError.message}</p>}
            </div>
            
            {showDelete && (
              <button type="button" onClick={() => remove(index)} className="text-gray-500 hover:text-[#ff1267] p-2 transition-colors flex items-center justify-center bg-white/5 rounded-lg border border-white/10 h-[50px] w-[50px]">
                <FaTrash size={14}/>
              </button>
            )}
        </div>
      </div>

      {platform === 'Other' && (
        <div className="animate-in fade-in slide-in-from-top-1 duration-200">
          <input 
            {...register(`socials.${index}.customPlatform`, { required: "Required" })} 
            className={inputStyle(false)} 
            placeholder="Platform Name (e.g. X, Snapchat)" 
          />
        </div>
      )}
    </div>
  );
}

export default function ContactForms() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><FaSpinner className="animate-spin text-[#ff1267] text-4xl" /></div>}>
      <ContactFormInner />
    </Suspense>
  );
}