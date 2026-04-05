'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronLeft, ChevronRight, Star, Truck, ShieldCheck, Heart } from 'lucide-react';
import { products, Product } from '@/lib/products';
import { useCart } from '@/lib/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProduct = async () => {
      try {
        const res = await fetch('/api/admin/products');
        const allProducts: Product[] = await res.json();
        const p = allProducts.find((item) => item.slug === slug);
        if (p) {
          setProduct(p);
          setMainImage(p.imagen);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchLatestProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase tracking-[0.5em] font-bold"
        >
          Marcelacruz
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-20 text-center">
        <h2 className="text-4xl font-serif mb-8 uppercase tracking-tighter">Objeto no encontrado</h2>
        <button onClick={() => router.push('/productos')} className="text-[10px] uppercase tracking-widest border-b border-black pb-2">
          Volver a la colección
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      categoria: product.categoria,
      cantidad: cantidad
    });
  };

  return (
    <div className="min-h-screen bg-white pt-32 md:pt-48 pb-48 lg:pb-64">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-24 lg:gap-40">
        
        {/* LEFT: IMAGE GALLERY (Mobile First Stacked) */}
        <div className="w-full lg:w-3/5 flex flex-col gap-12 md:gap-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[4/5] bg-[#F2F2F2] flex items-center justify-center p-12 md:p-24 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img 
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={mainImage} 
                alt={product.nombre} 
                className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-[2s] ease-out hover:scale-105" 
              />
            </AnimatePresence>
            {product.nuevo && (
              <div className="absolute top-10 left-10 px-6 py-3 bg-black text-white text-[9px] uppercase tracking-[0.4em] font-bold">
                ESTRENO
              </div>
            )}
            {!product.enStock && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10">
                <span className="text-[10px] uppercase tracking-[0.6em] font-bold border-b border-black pb-2">AGOTADO</span>
              </div>
            )}
          </motion.div>

          {/* GALLERY STACK (Better breathing on mobile) */}
          {(product.galeria && product.galeria.length > 0) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[product.imagen, ...product.galeria].map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`aspect-square bg-[#F9F9F9] flex items-center justify-center p-6 transition-all cursor-pointer ${mainImage === img ? 'opacity-100 ring-1 ring-black/10' : 'opacity-40 hover:opacity-100 grayscale'}`}
                >
                   <img src={img} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="w-full lg:w-2/5 flex flex-col lg:sticky lg:top-40 lg:h-fit">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-16 lg:gap-24"
          >
            {/* BREADCRUMBS & CATEGORY */}
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] text-black/20 font-bold">
                <span className="hover:text-black transition-colors cursor-pointer" onClick={() => router.push('/')}>Inicio</span>
                <span>•</span>
                <span className="hover:text-black transition-colors cursor-pointer" onClick={() => router.push('/productos')}>Colección</span>
                <span>•</span>
                <span className="text-black/60">{product.categoria}</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-[100px] font-serif text-black uppercase tracking-tighter leading-[0.8] mb-8">
                {product.nombre}
              </h1>
              <div className="flex items-center gap-10">
                <span className="text-3xl font-bold text-black/90">${product.precio.toLocaleString('es-CL')}</span>
                <div className="h-[0.5px] w-16 bg-black/20" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-bold">IVA Incluido</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-12">
              <p className="text-black/60 leading-relaxed text-xl md:text-2xl font-light max-w-lg">
                {product.descripcion}
              </p>
              <div className="flex flex-col gap-10 py-16 border-y border-black/5">
                <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.4em] font-bold">
                  <Star size={14} className="text-black" />
                  <span>Calidad Artística</span>
                </div>
                <p className="text-[14px] text-black/40 italic font-light leading-relaxed">
                  "Buscamos la pureza en cada trazo, creando piezas que trascienden las tendencias del momento."
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-20">
              <div className="flex flex-col sm:flex-row items-center gap-10">
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start border border-black/10 p-7 gap-16">
                  <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="text-black hover:opacity-30 transition-opacity"><ChevronLeft size={22} strokeWidth={1} /></button>
                  <span className="text-base font-bold min-w-[40px] text-center">{cantidad}</span>
                  <button onClick={() => setCantidad(cantidad + 1)} className="text-black hover:opacity-30 transition-opacity"><ChevronRight size={22} strokeWidth={1} /></button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.enStock}
                  className="w-full sm:flex-1 bg-black text-white py-8 px-16 text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-black/90 transition-all active:scale-[0.98] flex items-center justify-center gap-8 disabled:opacity-30 shadow-2xl shadow-black/10"
                >
                  <ShoppingBag size={16} />
                  {product.enStock ? 'Añadir al Carrito' : 'Agotado'}
                </button>
              </div>

              {/* BENEFITS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-[9px] uppercase tracking-[0.4em] font-bold text-black/30">
                <div className="flex items-center gap-8">
                  <Truck size={20} strokeWidth={0.5} />
                  <span>Envío Prioritario</span>
                </div>
                <div className="flex items-center gap-8">
                  <ShieldCheck size={20} strokeWidth={0.5} />
                  <span>Seguridad Total</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RECOMENDADOS */}
      <section className="mt-80 pt-64 border-t border-black/5 w-full flex flex-col items-center">
         <span className="text-[11px] uppercase tracking-[0.6em] text-black/10 font-bold mb-32 px-8 text-center ml-2">Inspiraciones Complementarias</span>
         <div className="max-w-[1400px] w-full px-8 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 md:gap-32">
            {(product.id ? products.filter(p => p.id !== product.id).slice(0, 4) : []).map(p => (
              <div key={p.id} className="flex flex-col gap-10 text-center items-center cursor-pointer group" onClick={() => router.push(`/productos/${p.slug}`)}>
                <div className="aspect-[3/4] bg-[#F2F2F2] w-full flex items-center justify-center p-16 overflow-hidden relative">
                  <img src={p.imagen} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-[3s] ease-out" />
                </div>
                <div className="flex flex-col gap-6">
                  <span className="text-[12px] uppercase tracking-[0.4em] font-bold opacity-80">{p.nombre}</span>
                  <span className="text-[10px] text-black/20 font-bold tracking-[0.3em]">${p.precio.toLocaleString('es-CL')}</span>
                </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
