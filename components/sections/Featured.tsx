'use client';
import ProductCard from '../ui/ProductCard';
import { products } from '@/lib/products';
import { motion } from 'framer-motion';

export default function Featured() {
  const featuredItems = products.slice(0, 3);

  return (
    <div className="max-w-[1400px] w-full mx-auto md:px-12 bg-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
        <div className="flex flex-col gap-8">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold"
          >
            Selección Editorial
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-black uppercase tracking-tighter"
          >
            Objetos Esenciales
          </motion.h2>
        </div>
        
        <motion.a 
          href="/productos"
          whileHover={{ x: 5 }}
          className="text-[10px] uppercase tracking-widest text-black/60 hover:text-black transition-colors pb-2 border-b border-black/10 font-bold mb-2"
        >
          Ver toda la colección —&gt;
        </motion.a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
