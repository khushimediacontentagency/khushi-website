'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { FaSpinner, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaBuilding, FaPlus, FaTrash, FaLink, FaHashtag } from 'react-icons/fa';
import { CustomSelect, inputStyle, labelStyle } from './shared';

const UK_CITIES = [
  "Not Listed (Type Below)", "London", "Manchester", "Birmingham", "Leeds", "Glasgow", 
  "Southampton", "Liverpool", "Newcastle", "Nottingham", "Sheffield", 
  "Bristol", "Belfast", "Leicester", "Edinburgh", "Cardiff", "Coventry", 
  "Bradford", "Brighton", "Hull", "Stoke-on-Trent", "Wolverhampton"
];

function SocialRow({ index, register, remove, showDelete, setVal, watch, errors }: any) {
  const platform = watch(`socials.${index}.platform`);
  const linkError = errors?.socials?.[index]?.link;
  const followersError = errors?.socials?.[index]?.followers;

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
                    message: "Valid link needed"
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
                    required: "Required",
                    pattern: {
                        value: /^(?:[0-9,.]+|n\/?a)$/i,
                        message: "Numbers or 'N/A'"
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
          <input {...register(`socials.${index}.customPlatform`, { required: "Required" })} className={inputStyle(false)} placeholder="Platform Name (e.g. X, Snapchat)" />
        </div>
      )}
    </div>
  );
}

export default function CreatorForm({ onSubmit, isSubmitting }: any) {
  const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm<any>({
    defaultValues: { 
      socials: [
        { platform: 'Instagram', link: '', followers: '' },
        { platform: 'TikTok', link: '', followers: '' }
      ],
      agencies: 'No', 
      locationSelect: ''
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: "socials" });
  const agencyStatus = watch('agencies');
  const locationSelection = watch('locationSelect');

  return (
    <form onSubmit={handleSubmit((data) => { onSubmit(data, 'creator'); reset(); })} className="space-y-6">
      <input type="text" {...register('website_hp')} className="hidden" tabIndex={-1} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>First Name</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
            <input {...register('firstName', { required: "First name is required" })} className={inputStyle(!!errors.firstName, true)} placeholder="First Name" />
          </div>
          {errors.firstName && <p className="text-[#ff1267] text-xs mt-1">{errors.firstName.message as string}</p>}
        </div>
        <div>
          <label className={labelStyle}>Surname</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
            <input {...register('lastName', { required: "Surname is required" })} className={inputStyle(!!errors.lastName, true)} placeholder="Surname" />
          </div>
          {errors.lastName && <p className="text-[#ff1267] text-xs mt-1">{errors.lastName.message as string}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
            <input {...register('email', { required: "Email is required" })} className={inputStyle(!!errors.email, true)} placeholder="Email" />
          </div>
          {errors.email && <p className="text-[#ff1267] text-xs mt-1">{errors.email.message as string}</p>}
        </div>
        <div>
          <label className={labelStyle}>Phone</label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
            <input {...register('phone', { required: "Phone number is required" })} className={inputStyle(!!errors.phone, true)} placeholder="07941344450" />
          </div>
          {errors.phone && <p className="text-[#ff1267] text-xs mt-1">{errors.phone.message as string}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="w-full">
            <CustomSelect 
              label="Where are you based?"
              placeholder="Select City"
              options={UK_CITIES}
              value={locationSelection}
              onChange={(val: string) => setValue('locationSelect', val, { shouldValidate: true })}
              error={errors.locationSelect}
              icon={FaMapMarkerAlt}
            />
            <input type="hidden" {...register('locationSelect', { required: "Location is required" })} />
         </div>
         
         {locationSelection === "Not Listed (Type Below)" && (
           <div className="w-full animate-in fade-in slide-in-from-left-2 duration-300">
              <label className={labelStyle}>Enter Your City</label>
              <div className="relative">
                <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
                <input {...register('locationCustom', { required: "Please specify location" })} className={inputStyle(!!errors.locationCustom, true)} placeholder="e.g. Dubai" />
              </div>
              {errors.locationCustom && <p className="text-[#ff1267] text-xs mt-1">{errors.locationCustom.message as string}</p>}
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
                      <input type="radio" value="Yes" {...register('agencies', { required: "Please select" })} className="accent-[#ff1267]" />
                      <span className="text-white font-medium">Yes</span>
                  </label>
                  <label className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg border transition-all ${agencyStatus === 'No' ? 'border-[#ff1267] bg-[#ff1267]/10' : 'border-white/10 bg-white/5'}`}>
                      <input type="radio" value="No" {...register('agencies', { required: "Please select" })} className="accent-[#ff1267]" />
                      <span className="text-white font-medium">No</span>
                  </label>
              </div>

              {agencyStatus === 'Yes' && (
                  <div className="flex-1 w-full animate-in fade-in slide-in-from-left-2 duration-300">
                      <input {...register('agencyList', { required: "Please list agencies" })} className={inputStyle(!!errors.agencyList)} placeholder="Please list them here..." />
                      {errors.agencyList && <p className="text-[#ff1267] text-xs mt-1">{errors.agencyList.message as string}</p>}
                  </div>
              )}
          </div>
          {errors.agencies && <p className="text-[#ff1267] text-xs mt-1">{errors.agencies.message as string}</p>}
      </div>

      <div className="space-y-4">
        <label className={labelStyle}>Social Media & Follower Count</label>
        {fields.map((field, index) => (
          <SocialRow 
            key={field.id} index={index} register={register} remove={remove} control={control} showDelete={fields.length > 1} setVal={setValue} watch={watch} errors={errors} 
          />
        ))}
        <button type="button" onClick={() => append({ platform: '', link: '', followers: '' })} className="text-[#ff1267] text-xs font-bold uppercase flex items-center gap-2 hover:text-white transition-colors">
          <FaPlus /> Add Another Platform
        </button>
      </div>

      <div>
        <label className={labelStyle}>Creative Bio / Details</label>
        <textarea {...register('details', { required: "Bio is required" })} className={`${inputStyle(!!errors.details)} min-h-36`} placeholder="Tell us about your work and creative journey..."></textarea>
        {errors.details && <p className="text-[#ff1267] text-xs mt-1">{errors.details.message as string}</p>}
      </div>

      <button disabled={isSubmitting} type="submit" className="w-full bg-white text-black font-bold uppercase py-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-[0.98]">
        {isSubmitting ? <FaSpinner className="animate-spin" /> : 'Apply Today'}
      </button>
    </form>
  );
}