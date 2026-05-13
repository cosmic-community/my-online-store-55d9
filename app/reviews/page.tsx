import { getAllReviews, getMetafieldValue } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';
import StarRating from '@/components/StarRating';

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => {
          const rv = r.metadata?.rating;
          const num = typeof rv === 'number' ? rv : parseInt(getMetafieldValue(rv)) || 0;
          return acc + num;
        }, 0) / reviews.length
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Reviews</h1>
        <p className="text-gray-600 mb-4">See what our customers are saying</p>
        {reviews.length > 0 && (
          <div className="inline-flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100">
            <StarRating rating={Math.round(avgRating)} size="lg" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</div>
              <div className="text-xs text-gray-500">{reviews.length} reviews</div>
            </div>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No reviews yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct />
          ))}
        </div>
      )}
    </div>
  );
}