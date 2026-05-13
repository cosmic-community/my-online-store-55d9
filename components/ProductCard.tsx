import Link from 'next/link';
import { Product } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function ProductCard({ product }: { product: Product }) {
  const name = getMetafieldValue(product.metadata?.product_name) || product.title;
  const price = product.metadata?.price;
  const salePrice = product.metadata?.sale_price;
  const image = product.metadata?.main_image;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const category = product.metadata?.category;
  const featured = product.metadata?.featured;

  const statusColor =
    inventoryStatus === 'In Stock'
      ? 'bg-green-100 text-green-800'
      : inventoryStatus === 'Low Stock'
      ? 'bg-yellow-100 text-yellow-800'
      : inventoryStatus === 'Out of Stock'
      ? 'bg-red-100 text-red-800'
      : 'bg-blue-100 text-blue-800';

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {image && (
            <img
              src={`${image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {featured && (
            <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              ⭐ Featured
            </span>
          )}
          {salePrice && price && salePrice < price && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              SALE
            </span>
          )}
        </div>
        <div className="p-4">
          {category && (
            <p className="text-xs text-brand-600 font-semibold uppercase tracking-wider mb-1">
              {getMetafieldValue(category.metadata?.name) || category.title}
            </p>
          )}
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {salePrice && price && salePrice < price ? (
                <>
                  <span className="text-lg font-bold text-red-600">${salePrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
                </>
              ) : price ? (
                <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
              ) : null}
            </div>
            {inventoryStatus && (
              <span className={`text-xs font-medium px-2 py-1 rounded ${statusColor}`}>
                {inventoryStatus}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}