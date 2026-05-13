import { Review } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import StarRating from './StarRating';

export default function ReviewCard({ review, showProduct = false }: { review: Review; showProduct?: boolean }) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Anonymous';
  const reviewTitle = getMetafieldValue(review.metadata?.review_title);
  const reviewText = getMetafieldValue(review.metadata?.review_text);
  const ratingValue = review.metadata?.rating;
  const rating = typeof ratingValue === 'number' ? ratingValue : parseInt(getMetafieldValue(ratingValue)) || 0;
  const verified = review.metadata?.verified_purchase;
  const reviewDate = getMetafieldValue(review.metadata?.review_date);
  const product = review.metadata?.product;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{reviewerName}</h4>
            {verified && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                ✓ Verified
              </span>
            )}
          </div>
          <StarRating rating={rating} size="sm" />
        </div>
        {reviewDate && (
          <span className="text-xs text-gray-500">{new Date(reviewDate).toLocaleDateString()}</span>
        )}
      </div>
      {reviewTitle && <h5 className="font-semibold text-gray-900 mb-2">{reviewTitle}</h5>}
      {reviewText && <p className="text-gray-700 text-sm leading-relaxed">{reviewText}</p>}
      {showProduct && product && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Product: <span className="font-medium text-brand-600">{product.title}</span>
          </p>
        </div>
      )}
    </div>
  );
}