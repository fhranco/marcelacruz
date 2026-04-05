'use client';
import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCart } from '@/lib/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      categoria: product.categoria,
      cantidad: 1
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative flex flex-col gap-8 w-full"
    >
      <Link href={`/productos/${product.slug}`} className="flex flex-col gap-8 w-full group">
        
        {/* IMAGE CONTAINER */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F5F5] flex items-center justify-center p-12 md:p-14 transition-all duration-700 ease-in-out group-hover:bg-[#EBEBEB]">
          <img 
            src={product.imagen} 
            alt={product.nombre}
            className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-all duration-1000 ease-in-out"
          />

          {/* BADGES */}
          {product.nuevo && (
            <div className="absolute top-8 left-8 px-5 py-3 bg-black text-white text-[11px] uppercase tracking-[0.5em] font-bold shadow-2xl">
              NUEVO
            </div>
          )}

          {/* MOBILE QUICK ADD (ALWAYS VISIBLE OR OVERLAY) */}
          <div className="absolute bottom-8 right-8 z-20">
             <button 
              onClick={handleAdd}
              className="w-14 h-14 bg-black text-white flex items-center justify-center hover:bg-black/80 transition-all rounded-full shadow-2xl active:scale-[0.85]"
             >
               <Plus size={24} strokeWidth={1.5} />
             </button>
          </div>
        </div>

        {/* PRODUCT INFO - HIGHER IMPACT */}
        <div className="flex flex-col gap-6 text-center items-center px-6">
          <span className="text-[12px] uppercase tracking-[0.6em] text-black/30 font-bold mb-2">{product.categoria}</span>
          <h3 className="text-[22px] font-bold uppercase tracking-tight text-black group-hover:italic transition-all duration-700 leading-tight">
            {product.nombre}
          </h3>
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="h-[1px] w-16 bg-black/10" />
            <span className="text-[18px] font-bold text-black tracking-[0.3em]">
              ${product.precio.toLocaleString('es-CL')}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
