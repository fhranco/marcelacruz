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
    <div className="min-h-screen bg-white pt-32 md:pt-48 pb-64">
      <div className="max-w-[1400px] mx-auto px-12 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-24 md:gap-32 lg:gap-40">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="w-full lg:w-3/5 flex flex-col gap-12 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative aspect-[4/5] bg-[#F5F5F5] flex items-center justify-center p-16 md:p-32 overflow-hidden"
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
              <div className="absolute top-10 left-10 px-8 py-4 bg-black text-white text-[11px] uppercase tracking-[0.5em] font-bold shadow-2xl">
                ESTRENO
              </div>
            )}
            {!product.enStock && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                <span className="text-[12px] uppercase tracking-[0.6em] font-bold border-b border-black pb-3 text-black">AGOTADO</span>
              </div>
            )}
          </motion.div>

          {/* GALLERY STACK */}
          {(product.galeria && product.galeria.length > 0) && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
              {[product.imagen, ...product.galeria].map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`aspect-square bg-[#F9F9F9] flex items-center justify-center p-8 transition-all cursor-pointer border border-transparent ${mainImage === img ? 'opacity-100 border-black/10 shadow-lg' : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0'}`}
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
            className="flex flex-col gap-16 lg:gap-32"
          >
            {/* BREADCRUMBS & TITLE */}
            <div className="flex flex-col gap-10 md:gap-14">
              <div className="flex items-center gap-6 md:gap-10 text-[12px] uppercase tracking-[0.4em] text-black/40 font-bold mb-6">
                <span className="hover:text-black transition-colors cursor-pointer" onClick={() => router.push('/')}>Inicio</span>
                <span>•</span>
                <span className="hover:text-black transition-colors cursor-pointer" onClick={() => router.push('/productos')}>Catálogo</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[110px] font-serif text-black uppercase tracking-tighter leading-[0.82] mb-10">
                {product.nombre}
              </h1>
              <div className="flex items-center gap-12 border-t-2 border-black/5 pt-16 md:pt-20">
                <span className="text-5xl font-bold text-black tracking-tight">${product.precio.toLocaleString('es-CL')}</span>
                <div className="h-[1px] w-16 bg-black/10" />
                <span className="text-[11px] uppercase tracking-[0.4em] text-black/20 font-bold">IVA Incluido</span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col gap-12">
              <p className="text-black/60 leading-relaxed text-xl md:text-3xl font-light max-w-xl mb-12">
                {product.descripcion}
              </p>
              <div className="flex flex-col gap-12 py-16 md:py-24 border-y border-black/5">
                <div className="flex items-center gap-10 text-[11px] uppercase tracking-[0.5em] font-bold">
                  <Star size={18} strokeWidth={1} className="text-black" />
                  <span>Maestría en Atelier</span>
                </div>
                <p className="text-[16px] text-black/40 italic font-light leading-relaxed max-w-md">
                  "Cada pieza es un diálogo entre el metal y el deseo, diseñada para permanecer más allá del tiempo."
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-20 md:gap-24">
              <div className="flex flex-col sm:flex-row items-center gap-10">
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start border-2 border-black/5 p-8 gap-16 bg-white">
                  <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="text-black hover:opacity-30 transition-opacity active:scale-[0.8]"><ChevronLeft size={28} strokeWidth={1} /></button>
                  <span className="text-xl font-bold min-w-[50px] text-center">{cantidad}</span>
                  <button onClick={() => setCantidad(cantidad + 1)} className="text-black hover:opacity-30 transition-opacity active:scale-[0.8]"><ChevronRight size={28} strokeWidth={1} /></button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.enStock}
                  className="w-full sm:flex-1 bg-black text-white py-10 px-20 text-[12px] uppercase tracking-[0.6em] font-bold hover:bg-black/90 transition-all active:scale-[0.98] flex items-center justify-center gap-10 disabled:opacity-20 shadow-3xl shadow-black/20"
                >
                  <ShoppingBag size={20} />
                  {product.enStock ? 'Reservar Objeto' : 'Agotado'}
                </button>
              </div>

              {/* BENEFITS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-[10px] uppercase tracking-[0.5em] font-bold text-black/20">
                <div className="flex items-center gap-10">
                  <Truck size={24} strokeWidth={0.3} />
                  <span>Logística de Prestigio</span>
                </div>
                <div className="flex items-center gap-10">
                  <ShieldCheck size={24} strokeWidth={0.3} />
                  <span>Certificado de Origen</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* RECOMENDADOS */}
      <section className="mt-60 md:mt-96 pt-48 md:pt-64 border-t-2 border-black/5 w-full flex flex-col items-center">
         <span className="text-[12px] uppercase tracking-[0.7em] text-black/20 font-bold mb-24 px-12 text-center">Inspiraciones Complementarias</span>
         <div className="max-w-[1400px] w-full px-12 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24 md:gap-40 lg:gap-48">
            {(product.id ? products.filter(p => p.id !== product.id).slice(0, 4) : []).map(p => (
              <div key={p.id} className="flex flex-col gap-12 text-center items-center cursor-pointer group" onClick={() => router.push(`/productos/${p.slug}`)}>
                <div className="aspect-[3/4] bg-[#F5F5F5] w-full flex items-center justify-center p-16 overflow-hidden relative">
                  <img src={p.imagen} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-[1.08] transition-transform duration-[4s] ease-out" />
                </div>
                <div className="flex flex-col gap-8">
                  <span className="text-[14px] uppercase tracking-[0.5em] font-bold opacity-90 group-hover:text-black transition-colors">{p.nombre}</span>
                  <span className="text-[14px] text-black font-bold tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">${p.precio.toLocaleString('es-CL')}</span>
                </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}
