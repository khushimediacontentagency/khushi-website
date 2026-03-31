'use client';
import { useForm } from 'react-hook-form';
import { FaSpinner, FaUser, FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa';
import { CustomSelect, inputStyle, labelStyle } from './shared';

export default function ServiceForm({ onSubmit, isSubmitting }: any) {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<any>();
  const selectedService = watch('serviceType');

  return (
    <form onSubmit={handleSubmit((data) => { onSubmit(data, 'service'); reset(); })} className="space-y-6">
      <input type="text" {...register('website_hp')} className="hidden" tabIndex={-1} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label className={labelStyle}>First Name</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
            <input disabled={isSubmitting} {...register('firstName', { required: "First name is required" })} className={inputStyle(!!errors.firstName, true)} placeholder="First Name" />
          </div>
          {errors.firstName && <p className="text-[#ff1267] text-xs mt-1">{errors.firstName.message as string}</p>}
        </div>
        <div>
          <label className={labelStyle}>Last Name</label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
            <input disabled={isSubmitting} {...register('lastName', { required: "Last name is required" })} className={inputStyle(!!errors.lastName, true)} placeholder="Last Name" />
          </div>
          {errors.lastName && <p className="text-[#ff1267] text-xs mt-1">{errors.lastName.message as string}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Email</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
            <input disabled={isSubmitting} {...register('email', { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} className={inputStyle(!!errors.email, true)} placeholder="Email" />
          </div>
          {errors.email && <p className="text-[#ff1267] text-xs mt-1">{errors.email.message as string}</p>}
        </div>
        <div>
          <label className={labelStyle}>Phone</label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff1267] text-sm" />
            <input disabled={isSubmitting} {...register('phone', { required: "Phone number is required" })} className={inputStyle(!!errors.phone, true)} placeholder="07941344450" />
          </div>
          {errors.phone && <p className="text-[#ff1267] text-xs mt-1">{errors.phone.message as string}</p>}
        </div>
      </div>

      <CustomSelect 
        label="Service Type" 
        placeholder="Select an option..."
        options={["Birthdays", "Graduation", "Wedding", "Brand Shoot", "Other"]}
        value={selectedService}
        onChange={(val: string) => setValue('serviceType', val, { shouldValidate: true })}
        error={errors.serviceType}
        icon={FaGlobe}
      />
      <input type="hidden" {...register('serviceType', { required: "Please select a service type" })} />

      <div>
        <label className={labelStyle}>Event Details</label>
        <textarea disabled={isSubmitting} {...register('details', { required: "Please provide event details" })} className={`${inputStyle(!!errors.details)} min-h-36`} placeholder="Tell us more about your event..."></textarea>
        {errors.details && <p className="text-[#ff1267] text-xs mt-1">{errors.details.message as string}</p>}
      </div>

      <button 
        disabled={isSubmitting} 
        type="submit" 
        className={`w-full bg-[#ff1267] text-white font-bold uppercase py-4 rounded-lg flex justify-center items-center gap-3 transition-all ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'active:scale-[0.98] hover:bg-[#e00f5c]'}`}
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="animate-spin text-xl" />
            <span>Sending your details...</span>
          </>
        ) : (
          'Submit Enquiry'
        )}
      </button>
    </form>
  );
}