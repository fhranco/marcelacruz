'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/CartContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any) {
  return twMerge(clsx(inputs));
}

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setIsOpen } = useCart();

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full h-[70px] md:h-[90px] z-[1000] transition-all duration-700 flex justify-center",
      isScrolled ? "bg-white/95 backdrop-blur-md border-b border-black/5" : "bg-transparent"
    )}>
      <div className="max-w-[1400px] w-full h-full px-12 md:px-12 flex items-center justify-between relative">
        {/* LEFT: LINKS (Desktop) */}
        <div className={cn(
          "hidden lg:flex items-center gap-10 text-[9px] uppercase tracking-[0.3em] font-bold transition-colors duration-500",
          isScrolled ? "text-black" : "text-black"
        )}>
          <Link href="/productos" className="hover:opacity-40 transition-opacity">Joyas</Link>
          <Link href="/productos" className="hover:opacity-40 transition-opacity">Aromas</Link>
          <Link href="/productos" className="hover:opacity-40 transition-opacity">Colección</Link>
        </div>

        {/* CENTER: LOGO */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-base md:text-xl font-serif tracking-[0.7em] uppercase text-black font-bold text-center whitespace-nowrap">
          Marcelacruz
        </Link>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-10 md:gap-14 text-black">
          <button className="hidden sm:block hover:opacity-40 transition-opacity cursor-pointer text-[10px] uppercase tracking-[0.4em] font-bold">Cuenta</button>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="relative hover:opacity-40 transition-opacity cursor-pointer flex items-center gap-4"
          >
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.4em] font-bold">Carrito</span>
            <div className="relative">
              <ShoppingBag size={22} strokeWidth={1} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[8px] flex items-center justify-center rounded-full font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </div>
          </button>

          <button 
            className="hover:opacity-40 transition-opacity cursor-pointer ml-4 p-2 bg-black/5 rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU (Luxury Curtain) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[3000] flex flex-col p-16 md:p-24 pt-32 md:pt-40 overflow-hidden"
          >
            <div className="flex justify-between items-start mb-24">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] uppercase tracking-[0.6em] font-bold text-black border-b border-black/10 pb-2">Atelier</span>
                <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-black/30">Marcelacruz</span>
              </div>
              <button 
                className="text-black p-5 bg-black/5 rounded-full hover:rotate-90 transition-transform duration-500 shadow-sm"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar Menú"
              >
                <X size={36} strokeWidth={0.8} />
              </button>
            </div>

            <nav className="flex flex-col gap-12 md:gap-16 mt-20">
              <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <Link href="/productos" className="text-6xl md:text-8xl font-serif uppercase tracking-tighter hover:italic transition-all inline-block" onClick={() => setIsMobileMenuOpen(false)}>Joyas</Link>
              </motion.div>
              <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link href="/productos" className="text-6xl md:text-8xl font-serif uppercase tracking-tighter hover:italic transition-all inline-block" onClick={() => setIsMobileMenuOpen(false)}>Aromas</Link>
              </motion.div>
              <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link href="/productos" className="text-6xl md:text-8xl font-serif uppercase tracking-tighter hover:italic transition-all inline-block" onClick={() => setIsMobileMenuOpen(false)}>Colección</Link>
              </motion.div>
              <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-24 border-t border-black/5 pt-16">
                <Link href="/#nosotros" className="text-base uppercase tracking-[0.5em] font-bold text-black/40 hover:text-black transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Sobre el Atelier</Link>
              </motion.div>
            </nav>

            <div className="mt-auto flex flex-col gap-8 text-[11px] uppercase tracking-[0.4em] font-bold text-black/30 pb-16">
               <div className="flex flex-wrap gap-12 border-b border-black/5 pb-8">
                  <a href="https://instagram.com" target="_blank" className="hover:text-black transition-colors">Instagram</a>
                  <a href="https://wa.me/56930313443" target="_blank" className="hover:text-black transition-colors">WhatsApp</a>
                  <a href="/admin/login" className="hover:text-black transition-colors">Acceso</a>
               </div>
               <span className="text-[10px] leading-relaxed">© 2026 Marcelacruz Atelier — Boutique Digital de Lujo. <br/> Todos los derechos reservados.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
