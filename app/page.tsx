import Link from 'next/link';
import { getFeaturedProducts, getAllCategories, getAllProducts } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';

export default async function HomePage() {
  const [featuredProducts, categories, allProducts] = await Promise.all([
    getFeaturedProducts(),
    getAllCategories(),
    getAllProducts(),
  ]);

  const productsToShow = featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl md:text-2xl text-brand-100 mb-8">
              Quality products at unbeatable prices. Shop our curated collection today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-white text-brand-700 hover:bg-brand-50 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/categories"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-700 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shop by Category</h2>
              <p className="text-gray-600">Explore our diverse range of categories</p>
            </div>
            <Link href="/categories" className="text-brand-600 hover:text-brand-700 font-semibold hidden md:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {productsToShow.length > 0 && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {featuredProducts.length > 0 ? 'Featured Products' : 'Latest Products'}
                </h2>
                <p className="text-gray-600">Hand-picked favorites just for you</p>
              </div>
              <Link href="/products" className="text-brand-600 hover:text-brand-700 font-semibold hidden md:block">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsToShow.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}