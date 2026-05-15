import { Link } from 'react-router-dom';

const team = [
  {
    name: 'Zaid Mirza',
    role: 'Founder & CEO',
    avatar: 'ZM',
    bio: 'Passionate about luxury fragrances with 10+ years in the perfume industry.',
    color: 'bg-blue-500',
  },
  {
    name: 'Ayesha Raza',
    role: 'Head of Fragrance',
    avatar: 'AR',
    bio: 'Master perfumer trained in Grasse, France. Curates every scent in our collection.',
    color: 'bg-pink-500',
  },
  {
    name: 'Hassan Qureshi',
    role: 'Operations Manager',
    avatar: 'HQ',
    bio: 'Ensures every order reaches you on time and in perfect condition.',
    color: 'bg-green-600',
  },
  {
    name: 'Nadia Farhan',
    role: 'Customer Experience',
    avatar: 'NF',
    bio: 'Dedicated to making every AromaHub interaction delightful and memorable.',
    color: 'bg-purple-600',
  },
  {
    name: 'Tariq Siddiqui',
    role: 'Marketing Lead',
    avatar: 'TS',
    bio: 'Brings the world of AromaHub to life through storytelling and digital campaigns.',
    color: 'bg-orange-500',
  },
  {
    name: 'Sana Iqbal',
    role: 'Quality Assurance',
    avatar: 'SI',
    bio: 'Guarantees every bottle meets our strict authenticity and quality standards.',
    color: 'bg-teal-600',
  },
];

const milestones = [
  { year: '2019', event: 'AromaHub founded in Lahore with 12 fragrances.' },
  { year: '2020', event: 'Expanded to 50+ products and launched online store.' },
  { year: '2022', event: 'Reached 10,000 happy customers across Pakistan.' },
  { year: '2023', event: 'Introduced exclusive Arabic oud collection.' },
  { year: '2025', event: 'Now serving 50,000+ customers with 100+ fragrances.' },
];

export default function About() {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold my-6 dark:text-white">About AromaHub</h1>

      <div className="max-w-[1100px] mx-auto px-6 pb-16">

        {/* ── Hero banner ── */}
        <div className="relative rounded-2xl overflow-hidden mb-12 bg-gradient-to-r from-[#111] to-gray-700 dark:from-gray-900 dark:to-gray-800 p-10 text-white text-center">
          <div className="absolute inset-0 opacity-10 bg-[url('/images/Royal%20Oud.jpg')] bg-cover bg-center" />
          <div className="relative">
            <p className="text-yellow-400 font-semibold tracking-widest uppercase text-sm mb-3">Est. 2019</p>
            <h2 className="text-4xl font-bold mb-4">Where Elegance Meets Affordability</h2>
            <p className="text-gray-300 max-w-xl mx-auto text-sm leading-relaxed">
              We source the finest Arabic, French, and Western fragrances to bring you an unmatched olfactory experience — without the luxury price tag.
            </p>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-12">
          {[
            { num: '100+',   label: 'Fragrances'    },
            { num: '50K+',   label: 'Happy Customers'},
            { num: '6',      label: 'Years of Trust' },
            { num: '100%',   label: 'Authentic'      },
          ].map(({ num, label }) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-5 text-center shadow-sm border border-gray-100 dark:border-gray-700">
              <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">{num}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Who We Are / Mission ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Who We Are</h2>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              At AromaHub, we bring you a premium collection of perfumes sourced from the finest fragrance makers worldwide. Our goal is to provide long-lasting, high-quality perfumes that reflect your personality and style — at prices that make sense.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Our Mission</h2>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              To deliver premium fragrances at affordable prices while ensuring authenticity, elegance, and long-lasting performance. We believe everyone deserves to smell extraordinary.
            </p>
          </div>
        </div>

        {/* ── Why Choose Us ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-12">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: '✅', title: '100% Original Products',          desc: 'Every fragrance is sourced directly from verified manufacturers.' },
              { icon: '⏳', title: 'Long-lasting Performance',        desc: 'Arabic and French perfumes crafted for all-day wear.' },
              { icon: '🚀', title: 'Fast & Reliable Shipping',        desc: 'Orders dispatched within 24 hours across Pakistan.' },
              { icon: '💬', title: 'Dedicated Customer Support',      desc: 'Our team is available 7 days a week to assist you.' },
              { icon: '💎', title: 'Premium Packaging',               desc: 'Every order arrives beautifully packaged, gift-ready.' },
              { icon: '🔄', title: 'Easy Returns',                    desc: 'Hassle-free 7-day return policy on all products.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3 items-start">
                <span className="text-2xl shrink-0 mt-0.5">{icon}</span>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white text-sm">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800 dark:text-white">Our Journey</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
            <div className="flex flex-col gap-6">
              {milestones.map(({ year, event }, i) => (
                <div key={year} className={`flex items-center gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className={`flex-1 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{event}</p>
                  </div>
                  <div className="shrink-0 w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-sm text-black z-10 shadow-md">
                    {year}
                  </div>
                  <div className="flex-1 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Team section ── */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800 dark:text-white">Meet the Team</h2>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            The passionate people behind AromaHub
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map(({ name, role, avatar, bio, color }) => (
              <div
                key={name}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4`}>
                  {avatar}
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{name}</h3>
                <p className="text-xs text-yellow-500 dark:text-yellow-400 font-medium mt-0.5 mb-3">{role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Vision + CTA ── */}
        <div className="bg-gradient-to-r from-[#111] to-gray-800 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
          <p className="text-gray-300 max-w-lg mx-auto text-sm leading-relaxed mb-6">
            To become the most trusted online perfume destination in the region — where elegance meets affordability and every customer feels special.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/products" className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold no-underline hover:bg-yellow-500 transition-colors">
              Shop Now
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-white/30 text-white rounded-xl font-semibold no-underline hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
