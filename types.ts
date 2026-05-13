export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export type InventoryStatus = 'In Stock' | 'Out of Stock' | 'Low Stock' | 'Pre-Order';

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    category_image?: CosmicImage;
  };
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name?: string;
    description?: string;
    price?: number;
    sale_price?: number;
    sku?: string;
    inventory_status?: InventoryStatus | { key: string; value: string };
    stock_quantity?: number;
    main_image?: CosmicImage;
    gallery?: CosmicImage[];
    category?: Category;
    featured?: boolean;
  };
}

export interface Variant extends CosmicObject {
  type: 'variants';
  metadata: {
    variant_name?: string;
    product?: Product;
    sku?: string;
    size?: string;
    color?: string;
    price_adjustment?: number;
    stock_quantity?: number;
    variant_image?: CosmicImage;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    reviewer_email?: string;
    rating?: number | { key: string; value: string };
    review_title?: string;
    review_text?: string;
    product?: Product;
    verified_purchase?: boolean;
    review_date?: string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}