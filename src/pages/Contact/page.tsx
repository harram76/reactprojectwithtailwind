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

  const inputCls = (hasError: boolean) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 ${
      hasError
        ? 'border-red-500'
        : 'border-gray-200 dark:border-gray-600 focus:border-yellow-400'
    }`;

  return (
    <>
      <h1 className="text-center text-3xl font-semibold my-6 dark:text-white">Contact Us</h1>

      <div className="max-w-[1100px] mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* ── Form card ── */}
          <div className="bg-white dark:bg-gray-800 p-7 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">Send Us a Message</h2>

            {submitted && (
              <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl text-sm font-medium mb-5">
                <span>✅ Your message has been sent! We'll get back to you soon.</span>
                <button onClick={() => setSubmitted(false)} className="bg-transparent border-none text-green-700 dark:text-green-400 cursor-pointer text-base leading-none px-1 hover:text-green-900 dark:hover:text-green-300">✕</button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5">Your Name</label>
                <input type="text" placeholder="Enter your name" value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={inputCls(!!errors.name)} />
                {errors.name && <span className="block text-red-500 text-xs mt-1">{errors.name}</span>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5">Email Address</label>
                <input type="email" placeholder="Enter your email" value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputCls(!!errors.email)} />
                {errors.email && <span className="block text-red-500 text-xs mt-1">{errors.email}</span>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1.5">Message</label>
                <textarea placeholder="Write your message..." rows={5} value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  className={`${inputCls(!!errors.message)} resize-y`} />
                {errors.message && <span className="block text-red-500 text-xs mt-1">{errors.message}</span>}
              </div>
              <button type="submit" className="px-6 py-3 border-none text-sm font-semibold bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-xl cursor-pointer hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors">
                Send Message →
              </button>
            </form>
          </div>

          {/* ── Info sidebar ── */}
          <div className="flex flex-col gap-5">
            {/* Office card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Our Office</h2>
              <div className="flex flex-col gap-3">
                {[
                  { icon: '📍', label: 'Address',  text: 'AromaHub, Lahore, Pakistan' },
                  { icon: '📞', label: 'Phone',    text: '+92 300 1234567'            },
                  { icon: '📧', label: 'Email',    text: 'support@aromahub.com'       },
                  { icon: '🕐', label: 'Hours',    text: 'Mon–Sat, 9am – 7pm'        },
                ].map(({ icon, label, text }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
                      <p className="text-sm text-gray-700 dark:text-gray-200 mt-0.5">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Answers</h2>
              <div className="flex flex-col gap-3">
                {[
                  { q: 'How long does shipping take?', a: '1–3 business days across Pakistan.' },
                  { q: 'Are products 100% original?',  a: 'Yes, all products are verified authentic.' },
                  { q: 'Can I return a product?',      a: '7-day hassle-free return policy.' },
                ].map(({ q, a }) => (
                  <div key={q} className="border-b border-gray-100 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{q}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
