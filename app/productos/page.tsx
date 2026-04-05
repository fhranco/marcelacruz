'use client';
import { useState } from 'react';
import useSWR from 'swr';
import ProductCard from '@/components/ui/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const CATEGORIAS = ['Todos', 'Joyas', 'Aromas', 'Ropa', 'Accesorios'];
const MAX_ITEMS = 200;

export default function ProductosPage() {
  const [page, setPage] = useState(1);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  const { data, error, isValidating } = useSWR(
    `/api/products?page=${page}&limit=12`,
    fetcher,
    { dedupingInterval: 60000 }
  );

  if (error) return <p className="p-8 text-red-600">⚠️ Error al cargar productos.</p>;
  if (!data) return <p className="p-8 font-serif uppercase tracking-widest text-[10px] text-center py-40">Buscando objetos esenciales...</p>;

  const { data: productos, total } = data;

  const filtered = productos.filter((p: any) =>
    categoriaActiva === 'Todos' ? true : p.categoria === categoriaActiva
  );

  const hasMore = page * 12 < Math.min(total, MAX_ITEMS);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER SECCIÓN (CON MÁS AIRE PARA EVITAR SOLAPAMIENTO) */}
      <section className="w-full flex justify-center pt-80 md:pt-72 pb-24 px-12">
        <div className="max-w-[1100px] w-full flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold mb-10"
          >
            Curated Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-8xl font-serif text-black uppercase tracking-tighter leading-[0.9]"
          >
            Essential Objects
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: 'circOut' }}
            className="h-[1px] w-32 bg-black/10 mt-12 md:mt-16"
          />
        </div>
      </section>

      {/* FILTER BAR (PERSISTENTE) */}
      <section className="sticky top-[70px] md:top-[90px] z-[950] w-full border-y border-black/5 bg-white/95 backdrop-blur-md">
        <div className="max-w-[1100px] w-full mx-auto px-12 md:px-0">
          <div className="flex flex-nowrap items-center justify-start md:justify-center gap-12 md:gap-24 py-10 overflow-x-auto no-scrollbar scroll-smooth">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`text-[12px] uppercase tracking-[0.4em] font-bold transition-all relative py-2 whitespace-nowrap shrink-0 ${
                  categoriaActiva === cat ? 'text-black' : 'text-black/30 hover:text-black/60'
                }`}
              >
                {cat}
                {categoriaActiva === cat && (
                  <motion.div layoutId="activeCat" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="w-full flex justify-center pb-48 pt-32 px-12">
        <div className="max-w-[1100px] w-full">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-16">
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((product: any) => (
                <div key={product.id} className="w-full">
                   <ProductCard product={product} />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LOAD MORE */}
      {hasMore && (
        <div className="pb-40 px-12 w-full flex justify-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="w-full max-w-sm px-16 py-8 bg-black text-white text-[12px] uppercase tracking-[0.5em] font-bold shadow-2xl hover:bg-black/90 transition-all active:scale-[0.98] flex items-center justify-center gap-4"
          >
            {isValidating ? 'Preparando más objetos...' : 'Explorar más de la colección'}
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="py-64 text-center px-12">
          <p className="text-[14px] uppercase font-bold tracking-[0.4em] text-black/20 italic">
            Estamos curando nuevas piezas para esta selección…
          </p>
        </div>
      )}
    </div>
  );
}
