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
      className="group relative flex flex-col gap-6 cursor-pointer"
    >
      <Link href={`/productos/${product.slug}`} className="absolute inset-0 z-10" />
      
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F2F2F2] flex items-center justify-center p-14 transition-all duration-700 ease-in-out group-hover:bg-[#EBEBEB]">
        <img 
          src={product.imagen} 
          alt={product.nombre}
          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-all duration-1000 ease-in-out"
        />

        {/* BADGES */}
        {product.nuevo && (
          <div className="absolute top-6 left-6 px-3 py-1.5 bg-black text-white text-[9px] uppercase tracking-[0.3em] font-bold">
            NEW
          </div>
        )}

        {/* ACTIONS (Hover Only on Desktop, maybe keep for accessibility) */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden z-20">
          <button className="w-10 h-10 bg-white border border-black/5 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all transform hover:scale-110">
            <Heart size={16} strokeWidth={1} />
          </button>
          <button 
            onClick={handleAdd}
            className="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-black/80 transition-all transform hover:scale-110"
          >
            <Plus size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* PRODUCT INFO */}
      <div className="flex flex-col gap-4 text-center items-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-black/40 font-bold">{product.categoria}</span>
        <h3 className="text-[18px] font-bold uppercase tracking-widest text-black/80 group-hover:text-black transition-colors duration-300">
          {product.nombre}
        </h3>
        <span className="text-[15px] font-bold text-black border-t border-black/5 pt-4 w-fit px-8">
          ${product.precio.toLocaleString('es-CL')}
        </span>
      </div>
    </motion.div>
  );
}
