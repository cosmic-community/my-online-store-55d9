import { Variant } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function VariantList({ variants, basePrice }: { variants: Variant[]; basePrice?: number }) {
  if (!variants || variants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Available Variants</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {variants.map((variant) => {
          const variantName = getMetafieldValue(variant.metadata?.variant_name) || variant.title;
          const size = getMetafieldValue(variant.metadata?.size);
          const color = getMetafieldValue(variant.metadata?.color);
          const adjustment = variant.metadata?.price_adjustment || 0;
          const finalPrice = basePrice ? basePrice + adjustment : null;
          const stock = variant.metadata?.stock_quantity;
          const image = variant.metadata?.variant_image;

          return (
            <div key={variant.id} className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:border-brand-500 transition-colors">
              {image && (
                <img
                  src={`${image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={variantName}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{variantName}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {size && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      Size: {size}
                    </span>
                  )}
                  {color && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {color}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  {finalPrice !== null && (
                    <span className="font-bold text-brand-600">${finalPrice.toFixed(2)}</span>
                  )}
                  {typeof stock === 'number' && (
                    <span className={`text-xs ${stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}