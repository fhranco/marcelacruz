'use client';
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="w-full pt-24 md:pt-48 overflow-hidden bg-white mt-24 md:mt-48 flex justify-center border-t border-black/5 pb-24 md:pb-48">
      <div className="max-w-[1400px] w-full mx-auto px-8 md:px-12 relative overflow-hidden">
        
        {/* LOGO SECTION */}
        <div className="flex flex-col items-center text-center mb-32 md:mb-48">
          <motion.h2 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 2 }}
            className="text-6xl md:text-[12vw] font-serif uppercase text-black/5 pointer-events-none font-bold"
          >
            Marcelacruz
          </motion.h2>
          <div className="flex flex-col gap-6 -mt-8 md:-mt-16">
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-black font-bold">nuestra tienda de objetos esenciales</span>
            <div className="h-[0.5px] w-12 bg-black/20 mx-auto" />
          </div>
        </div>

        {/* SIMPLIFIED LINKS */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-32 mb-24 md:mb-48">
          <div className="flex flex-col gap-8 max-w-sm">
            <span className="text-black text-[10px] uppercase tracking-[0.4em] font-bold">Encuentra lo que quieras</span>
            <p className="text-[14px] text-black/50 leading-relaxed font-light">
              Nuestra boutique digital está diseñada para ofrecerte una experiencia de lujo personalizada. Si necesitas asistencia, nuestro equipo está a un clic de distancia.
            </p>
            <button 
              onClick={() => window.open('https://wa.me/56930313443', '_blank')}
              className="w-fit text-black border-b border-black/20 pb-2 hover:border-black transition-all text-[11px] uppercase tracking-[0.2em] font-bold mt-4"
            >
              Asesoría Personalizada WhatsApp
            </button>
          </div>

          <div className="flex flex-col gap-12">
             <div className="flex flex-col gap-6">
                <span className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold">Catálogo</span>
                <Link href="/productos" className="text-[11px] uppercase tracking-[0.2em] font-bold hover:text-black/50 transition-colors">Ver Colección Completa</Link>
             </div>
             <div className="flex gap-12 text-black opacity-40 hover:opacity-100 transition-opacity">
               <Instagram className="cursor-pointer" size={18} strokeWidth={1} />
               <Mail className="cursor-pointer" size={18} strokeWidth={1} />
             </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-16 border-t border-black/10 text-[9px] uppercase tracking-[0.4em] text-black/30 font-bold">
          <span>© 2026 Marcelacruz Boutique. Todos los derechos reservados.</span>
          <div className="flex gap-12 mt-12 md:mt-0">
            <Link href="#" className="hover:text-black transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-black transition-colors">Términos</Link>
            <span className="hidden lg:inline italic opacity-40">Hecho con deseo en la Patagonia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
