// app/products/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getVariantsByProduct, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic';
import VariantList from '@/components/VariantList';
import ReviewCard from '@/components/ReviewCard';
import StarRating from '@/components/StarRating';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [variants, reviews] = await Promise.all([
    getVariantsByProduct(product.id),
    getReviewsByProduct(product.id),
  ]);

  const name = getMetafieldValue(product.metadata?.product_name) || product.title;
  const description = getMetafieldValue(product.metadata?.description);
  const price = product.metadata?.price;
  const salePrice = product.metadata?.sale_price;
  const sku = getMetafieldValue(product.metadata?.sku);
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const stockQty = product.metadata?.stock_quantity;
  const mainImage = product.metadata?.main_image;
  const gallery = product.metadata?.gallery;
  const category = product.metadata?.category;

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => {
          const rv = r.metadata?.rating;
          const num = typeof rv === 'number' ? rv : parseInt(getMetafieldValue(rv)) || 0;
          return acc + num;
        }, 0) / reviews.length
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-brand-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div>
          {mainImage && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-md aspect-square mb-4">
              <img
                src={`${mainImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {gallery && gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((img, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm aspect-square">
                  <img
                    src={`${img.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={`${name} ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-sm font-semibold text-brand-600 hover:text-brand-700 uppercase tracking-wider"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">{name}</h1>

          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm text-gray-600">
                {avgRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            {salePrice && price && salePrice < price ? (
              <>
                <span className="text-3xl font-bold text-red-600">${salePrice.toFixed(2)}</span>
                <span className="text-xl text-gray-500 line-through">${price.toFixed(2)}</span>
                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">
                  Save ${(price - salePrice).toFixed(2)}
                </span>
              </>
            ) : price ? (
              <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {inventoryStatus && (
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  inventoryStatus === 'In Stock'
                    ? 'bg-green-100 text-green-800'
                    : inventoryStatus === 'Low Stock'
                    ? 'bg-yellow-100 text-yellow-800'
                    : inventoryStatus === 'Out of Stock'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {inventoryStatus}
              </span>
            )}
            {typeof stockQty === 'number' && stockQty > 0 && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {stockQty} available
              </span>
            )}
          </div>

          {description && (
            <div className="prose prose-gray mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
            </div>
          )}

          {sku && (
            <p className="text-sm text-gray-500 mb-6">
              SKU: <span className="font-mono">{sku}</span>
            </p>
          )}

          <button
            disabled={inventoryStatus === 'Out of Stock'}
            className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors"
          >
            {inventoryStatus === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Variants */}
      {variants.length > 0 && (
        <section className="mb-12 bg-white rounded-2xl p-6 shadow-sm">
          <VariantList variants={variants} basePrice={price} />
        </section>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews ({reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}