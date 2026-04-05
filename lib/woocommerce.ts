// 🛍️ Marcelacruz Boutique - WooCommerce Sync
// 🇨🇱 Patagoniacoach Agency Headless Architecture

/**
 * WooCommerce Credentials Helper
 * This reads from environment variables for security.
 */
export const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || "https://tienda.agenciapatagoniacoach.click/wp-json/wc/v3";
const CK = process.env.WOOCOMMERCE_CK || "";
const CS = process.env.WOOCOMMERCE_CS || "";

/**
 * Fetches products from the WooCommerce Store
 * Maps data to our local Boutique design system
 */
export async function fetchWooCommerceProducts() {
  if (!CK || !CS) {
    console.warn("⚠️ Advertencia: No se detectaron credenciales de WooCommerce. Usando datos locales de prueba.");
    return null;
  }

  try {
    const authUrl = `${WOOCOMMERCE_URL}/products?consumer_key=${CK}&consumer_secret=${CS}&per_page=50`;
    
    const response = await fetch(authUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Error en API de WooCommerce: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return null;
  }
}

/**
 * Maps WooCommerce data structure to our Product interface
 */
export function mapWooCommerceToProduct(wcProduct: any) {
  return {
    id: wcProduct.id.toString(),
    slug: wcProduct.slug,
    nombre: wcProduct.name,
    categoria: wcProduct.categories?.[0]?.name || 'Uncategorized',
    precio: parseFloat(wcProduct.price) || 0,
    descripcion: wcProduct.short_description || wcProduct.description,
    imagen: wcProduct.images?.[0]?.src || '/images/jewelry.png',
    nuevo: wcProduct.date_created && (new Date().getTime() - new Date(wcProduct.date_created).getTime()) < 1000 * 60 * 60 * 24 * 30, // Last 30 days
    exclusivo: wcProduct.featured || false,
    colores: wcProduct.attributes?.find((a: any) => a.name === 'Color')?.options || [],
    tallas: wcProduct.attributes?.find((a: any) => a.name === 'Talla')?.options || [],
  };
}
