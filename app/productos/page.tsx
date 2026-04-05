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
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* HEADER SECCIÓN */}
      <section className="w-full flex justify-center py-40 md:py-60 px-12">
        <div className="max-w-[1100px] w-full flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.4em] text-black/40 font-bold mb-6"
          >
            Curated Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-8xl font-serif text-black uppercase tracking-tighter"
          >
            Essential Objects
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: 'circOut' }}
            className="h-[1px] w-32 bg-black/10 mt-8"
          />
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="border-y border-black/5 bg-white/95 backdrop-blur-md sticky top-[80px] z-[900] w-full flex justify-center px-12">
        <div className="max-w-[1100px] w-full mx-auto flex flex-wrap items-center justify-center gap-10 md:gap-20 py-8 overflow-x-auto no-scrollbar">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative py-2 ${
                categoriaActiva === cat ? 'text-black' : 'text-black/30 hover:text-black/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="w-full flex justify-center pb-48 pt-32 px-12">
        <div className="max-w-[1100px] w-full mx-auto">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-16">
            <AnimatePresence mode="popLayout">
              {filtered.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LOAD MORE */}
      {hasMore && (
        <div className="pb-32">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-16 py-6 bg-black text-white text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl hover:bg-black/90 transition-all active:scale-95"
          >
            {isValidating ? 'Cargando…' : 'Ver más objetos'}
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="py-40 text-center">
          <p className="text-[12px] uppercase font-bold tracking-widest text-black/20">
            Próximamente nuevos productos…
          </p>
        </div>
      )}
    </div>
  );
}
