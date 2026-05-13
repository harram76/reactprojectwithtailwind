import { useState } from 'react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm]           = useState<FormState>(EMPTY);
  const [errors, setErrors]       = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = 'Name is required.';
    if (!form.email.trim())   e.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'Enter a valid email address.';
    if (!form.message.trim()) e.message = 'Message cannot be empty.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm(EMPTY);
    setErrors({});
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <>
      <h1 className="text-center text-3xl font-semibold my-6">Contact Us</h1>

      <div className="w-full max-w-[1200px] mx-auto px-8 pb-10">
        {/* Form card */}
        <div className="bg-white p-6 rounded-lg shadow-[0_3px_7px_rgba(0,0,0,0.1)]">

          {/* Success banner */}
          {submitted && (
            <div className="flex items-center justify-between bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-md text-sm font-medium mb-4">
              <span>✅ Your message has been sent! We'll get back to you soon.</span>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-transparent border-none text-green-700 cursor-pointer text-base leading-none px-1 hover:text-green-900"
              >
                ✕
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block font-medium mb-1 text-sm">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-3 py-2.5 rounded-md border text-sm outline-none transition-colors ${
                  errors.name ? 'border-red-500' : 'border-gray-300 focus:border-gray-800'
                }`}
              />
              {errors.name && <span className="block text-red-500 text-xs mt-1">{errors.name}</span>}
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1 text-sm">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-3 py-2.5 rounded-md border text-sm outline-none transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300 focus:border-gray-800'
                }`}
              />
              {errors.email && <span className="block text-red-500 text-xs mt-1">{errors.email}</span>}
            </div>

            {/* Message */}
            <div>
              <label className="block font-medium mb-1 text-sm">Message</label>
              <textarea
                placeholder="Write your message..."
                rows={5}
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className={`w-full px-3 py-2.5 rounded-md border text-sm outline-none transition-colors resize-y ${
                  errors.message ? 'border-red-500' : 'border-gray-300 focus:border-gray-800'
                }`}
              />
              {errors.message && <span className="block text-red-500 text-xs mt-1">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 border-none text-base font-medium bg-[#111] text-white rounded-md cursor-pointer hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Office details */}
        <div className="mt-8 p-5 bg-white rounded-lg shadow-[0_3px_7px_rgba(0,0,0,0.1)]">
          <h2 className="text-xl font-semibold mb-3">Our Office</h2>
          <p className="mb-2 text-sm text-gray-600">📍 AromaHub, Lahore, Pakistan</p>
          <p className="mb-2 text-sm text-gray-600">📞 +92 300 1234567</p>
          <p className="mb-2 text-sm text-gray-600">📧 support@aromahub.com</p>
        </div>
      </div>
    </>
  );
}
