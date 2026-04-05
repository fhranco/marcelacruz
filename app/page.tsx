'use client';
import Hero from '@/components/sections/Hero';
import Featured from '@/components/sections/Featured';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center overflow-x-hidden">
      <div className="w-full">
        <Hero />
      </div>
      
      {/* SECCIÓN FILOSOFÍA (Minimalista) */}
      <section id="nosotros" className="w-full flex justify-center py-40 md:py-72">
        <div className="max-w-[1200px] w-full px-10 md:px-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="text-4xl md:text-8xl font-serif text-black mb-12 italic leading-[1.1] uppercase tracking-tighter"
          >
            "La belleza de <br className="hidden md:block" /> lo esencial"
          </motion.h2>
          <div className="flex flex-col items-center gap-6">
            <div className="h-[0.5px] w-12 bg-black/40" />
            <p className="text-black/40 text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-bold">Nuestra Filosofía</p>
          </div>
        </div>
      </section>

      <section id="featured" className="bg-white w-full flex justify-center py-32 md:py-64">
        <Featured />
      </section>

      {/* SECCIÓN SOBRE MARCELA (FOUNDER) */}
      <section id="marcela" className="bg-[#F8F8F8] w-full flex justify-center py-32 md:py-64">
        <div className="max-w-[1400px] w-full mx-auto px-10 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-40 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative group aspect-[4/5] overflow-hidden"
          >
            <img 
              src="/images/hero.png" 
              alt="Marcela Cruz - Fundadora" 
              className="w-full h-full object-cover grayscale brightness-110 hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
            />
            <div className="absolute inset-0 border border-black/5 m-4 pointer-events-none" />
          </motion.div>
          
          <div className="flex flex-col gap-10 md:gap-14">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-black/30 font-bold">La Visionaria</span>
            <div className="flex flex-col gap-4">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-black leading-tight uppercase tracking-tighter">
                Marcela <br/> Cruz
              </h2>
              <span className="italic text-black/40 lowercase text-2xl md:text-3xl font-serif">alma creativa</span>
            </div>
            <p className="text-black/60 leading-relaxed font-light text-lg md:text-xl max-w-lg">
              Con una visión que trasciende lo convencional, Marcela ha dedicado su carrera a redefinir el lujo desde la sencillez. Cada pieza es un fragmento de su historia, un tributo a la elegancia que no necesita gritar para ser notada.
            </p>
            <div className="flex items-center gap-6 mt-4">
              <div className="h-[0.5px] w-12 bg-black/30" />
              <span className="text-[10px] uppercase tracking-widest text-black/50 font-bold">Fundadora & Directora Creativa</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN EXPERIENCIA (Call to action) */}
      <section className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden bg-white py-40 md:py-80">
        <div className="max-w-[1200px] w-full px-10 md:px-12 flex flex-col items-center">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] text-black/30 mb-8 md:mb-12 font-bold">Experiencia Exclusiva</span>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif text-black mb-16 md:mb-24 uppercase tracking-tighter leading-[0.9]">Visita nuestro <br className="md:hidden" /> atelier digital</h2>
          <motion.a 
            href="/productos"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-16 md:px-24 py-7 md:py-8 bg-black text-white text-[12px] md:text-[13px] uppercase tracking-[0.5em] font-bold shadow-2xl shadow-black/10 transition-all hover:bg-black/90"
          >
            Explorar Colección
          </motion.a>
        </div>
      </section>
    </div>
  );
}
