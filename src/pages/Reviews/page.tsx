import { useState } from 'react';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  product: string;
  date: string;
  comment: string;
  verified: boolean;
}

const initialReviews: Review[] = [
  { id: 1, name: 'Ahmed Khan',     avatar: 'AK', rating: 5, product: 'Royal Oud',    date: 'May 2, 2025',   comment: 'Absolutely stunning fragrance. The longevity is incredible — still going strong after 12 hours. Worth every penny!', verified: true  },
  { id: 2, name: 'Sara Malik',     avatar: 'SM', rating: 5, product: 'Rose Vanilla',  date: 'Apr 28, 2025',  comment: 'Sweet, warm, and feminine. I get compliments every time I wear it. My new signature scent!', verified: true  },
  { id: 3, name: 'Usman Tariq',    avatar: 'UT', rating: 4, product: 'Dauntless',     date: 'Apr 20, 2025',  comment: 'Great spicy scent for evenings. Projection is excellent. Slightly heavy for daytime but perfect for nights out.', verified: true  },
  { id: 4, name: 'Fatima Noor',    avatar: 'FN', rating: 5, product: 'Moonlight',     date: 'Apr 15, 2025',  comment: 'Dreamy and soft. Perfect for everyday wear. The bottle is also gorgeous — makes a great gift.', verified: false },
  { id: 5, name: 'Bilal Hussain',  avatar: 'BH', rating: 4, product: 'Dapper',        date: 'Apr 10, 2025',  comment: 'Clean and professional. Great for office wear. Lasts about 6-7 hours which is decent for the price.', verified: true  },
  { id: 6, name: 'Zara Sheikh',    avatar: 'ZS', rating: 5, product: 'Nashwa',        date: 'Mar 30, 2025',  comment: 'The most elegant oriental blend I have ever tried. Rich, deep, and luxurious. Highly recommend!', verified: true  },
  { id: 7, name: 'Omar Farooq',    avatar: 'OF', rating: 3, product: 'Floral Test',   date: 'Mar 22, 2025',  comment: 'Nice floral notes but the sillage could be better. Good for casual daytime use. Decent value.', verified: false },
  { id: 8, name: 'Hina Baig',      avatar: 'HB', rating: 5, product: 'Belliza',       date: 'Mar 18, 2025',  comment: 'Refreshing and long-lasting. I love how it evolves throughout the day. Starts citrusy and dries down beautifully.', verified: true  },
  { id: 9, name: 'Kamran Ali',     avatar: 'KA', rating: 4, product: 'Prime',         date: 'Mar 10, 2025',  comment: 'Rich amber base with a sweet opening. Very versatile — works for both day and night. Great bottle design too.', verified: true  },
];

const PRODUCTS = ['All', 'Royal Oud', 'Rose Vanilla', 'Dauntless', 'Moonlight', 'Dapper', 'Nashwa', 'Floral Test', 'Belliza', 'Prime'];

function StarRating({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={() => interactive && onRate?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={`text-xl leading-none bg-transparent border-none p-0 ${
            interactive ? 'cursor-pointer' : 'cursor-default'
          } ${star <= (hovered || rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews]     = useState<Review[]>(initialReviews);
  const [filter, setFilter]       = useState('All');
  const [sortBy, setSortBy]       = useState<'newest' | 'highest' | 'lowest'>('newest');
  const [showForm, setShowForm]   = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName]     = useState('');
  const [newProduct, setNewProduct] = useState('Royal Oud');
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  /* Stats */
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.rating === s).length,
    pct: Math.round((reviews.filter((r) => r.rating === s).length / reviews.length) * 100),
  }));

  /* Filter + sort */
  const visible = reviews
    .filter((r) => filter === 'All' || r.product === filter)
    .sort((a, b) =>
      sortBy === 'highest' ? b.rating - a.rating :
      sortBy === 'lowest'  ? a.rating - b.rating :
      b.id - a.id
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;
    const initials = newName.trim().split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
    setReviews((prev) => [
      {
        id: Date.now(),
        name: newName.trim(),
        avatar: initials,
        rating: newRating,
        product: newProduct,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        comment: newComment.trim(),
        verified: false,
      },
      ...prev,
    ]);
    setNewName(''); setNewComment(''); setNewRating(5);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 2000);
  };

  const avatarColors = [
    'bg-blue-500','bg-green-600','bg-purple-600','bg-pink-500',
    'bg-orange-500','bg-teal-600','bg-red-500','bg-indigo-600','bg-yellow-600',
  ];

  return (
    <>
      <h1 className="text-center text-3xl font-semibold my-6 dark:text-white">
        Customer Reviews
      </h1>

      <div className="max-w-[1100px] mx-auto px-6 pb-16">

        {/* ── Rating overview ── */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-8 flex flex-wrap gap-10 items-center">
          {/* Big number */}
          <div className="text-center shrink-0">
            <p className="text-7xl font-bold text-gray-800 dark:text-white leading-none">{avgRating}</p>
            <StarRating rating={Math.round(Number(avgRating))} />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{reviews.length} reviews</p>
          </div>
          {/* Distribution bars */}
          <div className="flex-1 min-w-[200px] flex flex-col gap-2">
            {dist.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-4 text-right text-gray-600 dark:text-gray-400 shrink-0">{star}</span>
                <span className="text-yellow-400 shrink-0">★</span>
                <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-6 text-gray-500 dark:text-gray-400 shrink-0 text-xs">{count}</span>
              </div>
            ))}
          </div>
          {/* Write review button */}
          <div className="shrink-0">
            <button
              onClick={() => setShowForm((v) => !v)}
              className="px-6 py-3 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-xl font-semibold hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors"
            >
              ✍️ Write a Review
            </button>
          </div>
        </div>

        {/* ── Write review form ── */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-7 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
            <h2 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">Share Your Experience</h2>
            {submitted ? (
              <div className="flex items-center gap-3 text-green-600 dark:text-green-400 font-medium py-4">
                <span className="text-2xl">✅</span> Thank you! Your review has been posted.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Your Name</label>
                    <input
                      type="text" placeholder="e.g. Ahmed Khan" value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm outline-none focus:border-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Product</label>
                    <select
                      value={newProduct} onChange={(e) => setNewProduct(e.target.value)}
                      className="px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm outline-none focus:border-yellow-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                      {PRODUCTS.filter((p) => p !== 'All').map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Rating</label>
                  <StarRating rating={newRating} interactive onRate={setNewRating} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Your Review</label>
                  <textarea
                    rows={4} placeholder="Tell us about your experience..."
                    value={newComment} onChange={(e) => setNewComment(e.target.value)}
                    className="px-3 py-2.5 border border-gray-200 dark:border-gray-600 rounded-lg text-sm outline-none focus:border-yellow-400 resize-y bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400"
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="px-6 py-2.5 bg-[#111] dark:bg-yellow-400 text-white dark:text-black rounded-lg font-semibold hover:bg-yellow-400 hover:text-black dark:hover:bg-yellow-500 transition-colors">
                    Post Review
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ── Filters ── */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          {/* Product filter pills */}
          <div className="flex flex-wrap gap-2">
            {PRODUCTS.map((p) => (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  filter === p
                    ? 'bg-[#111] dark:bg-yellow-400 text-white dark:text-black border-[#111] dark:border-yellow-400'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:text-yellow-500'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:border-yellow-400"
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        {/* ── Review cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {visible.map((review, idx) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${avatarColors[idx % avatarColors.length]}`}>
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white text-sm">{review.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{review.date}</p>
                  </div>
                </div>
                {review.verified && (
                  <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full shrink-0">
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <StarRating rating={review.rating} />
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {review.product}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            No reviews found for this product yet.
          </div>
        )}
      </div>
    </>
  );
}
