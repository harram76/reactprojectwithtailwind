export default function About() {
  return (
    <>
      <h1 className="text-center text-3xl font-semibold my-6">About AromaHub</h1>

      <div className="w-full max-w-[1200px] mx-auto px-8 pb-10">
        <h2 className="text-xl font-semibold mt-6 mb-2">Who We Are</h2>
        <p className="text-sm leading-relaxed text-gray-600">
          At AromaHub, we bring you a premium collection of perfumes sourced from the finest fragrance makers.
          Our goal is to provide long-lasting, high-quality perfumes that reflect your personality and style.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Our Mission</h2>
        <p className="text-sm leading-relaxed text-gray-600">
          To deliver premium fragrances at affordable prices while ensuring authenticity, elegance, and long-lasting performance.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Why Choose Us?</h2>
        <ul className="list-none pl-0 flex flex-col gap-1.5">
          {[
            '100% Original Products',
            'Long-lasting Arabic and French perfumes',
            'Smooth customer experience',
            'Fast shipping and supportive service',
          ].map((item) => (
            <li key={item} className="text-sm leading-relaxed text-gray-600">
              ✅ {item}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Our Vision</h2>
        <p className="text-sm leading-relaxed text-gray-600">
          To become the most trusted online perfume destination in the region — where elegance meets affordability.
        </p>
      </div>
    </>
  );
}
