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
      <div className="max-w-[1400px] w-full h-full px-10 md:px-12 flex items-center justify-between relative">
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
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-serif tracking-[0.5em] uppercase text-black font-bold">
          Marcelacruz
        </Link>

        {/* RIGHT: ACTIONS */}
        <div className="flex items-center gap-6 md:gap-10 text-black">
          <button className="hidden sm:block hover:opacity-40 transition-opacity cursor-pointer text-[9px] uppercase tracking-[0.3em] font-bold">Cuenta</button>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="relative hover:opacity-40 transition-opacity cursor-pointer flex items-center gap-3"
          >
            <span className="hidden sm:inline text-[9px] uppercase tracking-[0.3em] font-bold">Carrito</span>
            <div className="relative">
              <ShoppingBag size={18} strokeWidth={1.2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-black text-white text-[7px] flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </button>

          <button 
            className="hover:opacity-40 transition-opacity cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={22} strokeWidth={1} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU (Luxury Curtain) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[2000] flex flex-col p-10 md:p-24"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Menú</span>
              <button 
                className="text-black hover:rotate-90 transition-transform duration-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={28} strokeWidth={1} />
              </button>
            </div>

            <nav className="flex flex-col gap-8 md:gap-12">
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <Link href="/productos" className="text-5xl md:text-7xl font-serif uppercase tracking-tighter hover:italic transition-all" onClick={() => setIsMobileMenuOpen(false)}>Joyas</Link>
              </motion.div>
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link href="/productos" className="text-5xl md:text-7xl font-serif uppercase tracking-tighter hover:italic transition-all" onClick={() => setIsMobileMenuOpen(false)}>Aromas</Link>
              </motion.div>
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link href="/productos" className="text-5xl md:text-7xl font-serif uppercase tracking-tighter hover:italic transition-all" onClick={() => setIsMobileMenuOpen(false)}>Colección</Link>
              </motion.div>
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="mt-10 border-t border-black/5 pt-10">
                <Link href="/#contacto" className="text-xs uppercase tracking-[0.4em] font-bold text-black/40 hover:text-black transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contacto</Link>
              </motion.div>
            </nav>

            <div className="mt-auto flex flex-col gap-4 text-[9px] uppercase tracking-[0.3em] font-bold text-black/30">
               <span>© 2026 Marcelacruz Atelier</span>
               <div className="flex gap-6">
                  <a href="https://wa.me/56930313443" target="_blank" className="hover:text-black cursor-pointer">Instagram</a>
                  <a href="https://wa.me/56930313443" target="_blank" className="hover:text-black cursor-pointer">WhatsApp</a>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
