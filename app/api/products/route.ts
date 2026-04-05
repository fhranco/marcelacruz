import { NextResponse } from 'next/server';
import { fetchWooCommerceProducts, mapWooCommerceToProduct } from '@/lib/woocommerce';
import localProducts from '@/data/products.json';

// Máximo número de productos que la API devolverá en total (fallback)
const MAX_ITEMS = 200;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page') ?? '1');
  const limit = Math.min(Number(searchParams.get('limit') ?? '12'), MAX_ITEMS);

  try {
    const wcProductsData = await fetchWooCommerceProducts();
    
    if (wcProductsData && wcProductsData.length > 0) {
      // Map WooCommerce data to our standard structure
      const allMapped = wcProductsData.map(mapWooCommerceToProduct);
      const total = allMapped.length;
      const start = (page - 1) * limit;
      const end = Math.min(start + limit, total);
      const paged = allMapped.slice(start, end);

      const headers = new Headers();
      headers.set('Cache-Control', 's-maxage=600, stale-while-revalidate=120'); // Cache 10 min

      return NextResponse.json({ data: paged, total, source: 'woocommerce' }, { headers });
    }
  } catch (error) {
    console.error("⚠️ WooCommerce Fetch Failed, falling back to local data:", error);
  }

  // Fallback to local products.json if WooCommerce fails or has no credentials
  const allLocal = localProducts;
  const total = Math.min(allLocal.length, MAX_ITEMS);
  const start = (page - 1) * limit;
  const end = Math.min(start + limit, total);
  const paged = allLocal.slice(start, end);

  const headers = new Headers();
  headers.set('Cache-Control', 's-maxage=300, stale-while-revalidate=60'); // Cache 5 min
  
  return NextResponse.json({ data: paged, total, source: 'local' }, { headers });
}
