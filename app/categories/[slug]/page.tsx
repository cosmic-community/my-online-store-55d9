// app/categories/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);
  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const description = getMetafieldValue(category.metadata?.description);
  const image = category.metadata?.category_image;

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-gray-900">
        {image && (
          <img
            src={`${image.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <nav className="text-sm text-gray-200 mb-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/categories" className="hover:text-white">Categories</Link>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{name}</h1>
            {description && <p className="text-lg text-gray-200 max-w-2xl">{description}</p>}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 mb-8">
          {products.length} product{products.length !== 1 ? 's' : ''} in this category
        </p>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}