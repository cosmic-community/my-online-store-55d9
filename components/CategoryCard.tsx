import Link from 'next/link';
import { Category } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function CategoryCard({ category }: { category: Category }) {
  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const description = getMetafieldValue(category.metadata?.description);
  const image = category.metadata?.category_image;

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
        {image && (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h3 className="text-2xl font-bold mb-1">{name}</h3>
          {description && <p className="text-sm text-gray-200 line-clamp-2">{description}</p>}
        </div>
      </div>
    </Link>
  );
}