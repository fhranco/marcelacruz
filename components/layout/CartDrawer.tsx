'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { generarMensajeWhatsApp } from '@/lib/whatsapp';

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeFromCart, total, clearCart } = useCart();

  const handleCheckout = () => {
    const whatsappUrl = generarMensajeWhatsApp(cart, total);
    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* OVERLAY */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[2000]"
          />
          
          {/* DRAWER */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[2001] shadow-2xl flex flex-col"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-10 border-b border-black/10">
              <div className="flex items-center gap-6">
                <ShoppingBag size={24} strokeWidth={1} />
                <span className="text-[12px] uppercase tracking-[0.4em] font-bold">TU CARRITO ({cart.length})</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 hover:bg-black/5 rounded-full transition-colors"
                aria-label="Cerrar Carrito"
              >
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-10 no-scrollbar">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-8 h-full opacity-30">
                  <ShoppingBag size={60} strokeWidth={0.5} />
                  <p className="text-[12px] uppercase tracking-[0.5em] font-bold">Carrito Vacío</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-8 group relative pb-10 border-b border-black/5 last:border-0 last:pb-0">
                    <div className="w-28 h-36 bg-[#F5F5F5] flex items-center justify-center p-6 shrink-0">
                      <img src={item.imagen} alt={item.nombre} className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col flex-1 justify-between py-2">
                      <div className="flex flex-col gap-2">
                        <span className="text-[9px] uppercase tracking-[0.4em] text-black/30 font-bold">{item.categoria}</span>
                        <h4 className="text-[14px] uppercase tracking-[0.2em] font-bold text-black leading-tight">{item.nombre}</h4>
                        {item.talla && <span className="text-[10px] text-black/50 italic">Talla: {item.talla}</span>}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-6 border border-black/10 px-4 py-2 bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                            className="p-1 hover:text-black/50 transition-opacity active:opacity-30"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-[14px] font-bold min-w-[30px] text-center">{item.cantidad}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            className="p-1 hover:text-black/50 transition-opacity active:opacity-30"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="text-[15px] font-bold text-black tracking-widest">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute -top-2 -right-2 p-2 bg-white border border-black/5 rounded-full shadow-lg text-black/30 hover:text-red-500 transition-all opacity-100"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {cart.length > 0 && (
              <div className="p-10 border-t-2 border-black/5 bg-white flex flex-col gap-8 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] uppercase tracking-[0.4em] font-bold text-black/40">Total Boutique</span>
                  <span className="text-3xl font-bold text-black tracking-tighter">${total.toLocaleString('es-CL')}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-8 text-[12px] uppercase tracking-[0.5em] font-bold transition-all hover:bg-black/90 active:scale-[0.98] shadow-2xl shadow-black/10 flex items-center justify-center gap-6"
                >
                  <ShoppingBag size={18} />
                  Continuar a Atelier
                </button>
                <div className="flex items-center justify-center gap-2 opacity-30 text-[9px] uppercase tracking-[0.3em] font-bold text-center">
                  <span>Pago a convenir vía WhatsApp</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
