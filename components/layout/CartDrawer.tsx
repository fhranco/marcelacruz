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
            <div className="flex items-center justify-between p-8 border-b border-black/5">
              <div className="flex items-center gap-4">
                <ShoppingBag size={20} strokeWidth={1} />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">TU CARRITO ({cart.length})</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={20} strokeWidth={1} />
              </button>
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 no-scrollbar">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-6 h-full opacity-30">
                  <ShoppingBag size={40} strokeWidth={1} />
                  <p className="text-[10px] uppercase tracking-widest font-bold">Carrito Vacío</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 h-32 bg-[#F2F2F2] flex items-center justify-center p-4">
                      <img src={item.imagen} alt={item.nombre} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex flex-col flex-1 justify-between py-1">
                      <div className="flex flex-col gap-1">
                        <span className="text-[8px] uppercase tracking-widest text-black/40 font-bold">{item.categoria}</span>
                        <h4 className="text-[12px] uppercase tracking-widest font-bold text-black/80">{item.nombre}</h4>
                        {item.talla && <span className="text-[9px] text-black/40 italic">Talla: {item.talla}</span>}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 border border-black/5 px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                            className="p-1 hover:text-black/50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-[11px] font-bold min-w-[20px] text-center">{item.cantidad}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                            className="p-1 hover:text-black/50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-[11px] font-bold">${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-black/20 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={16} strokeWidth={1} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-black/5 bg-[#FAFAFA] flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">Total Estimado</span>
                  <span className="text-xl font-bold text-black">${total.toLocaleString('es-CL')}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-5 text-[10px] uppercase tracking-[0.4em] font-bold transition-all hover:bg-black/90 active:scale-[0.98]"
                >
                  Continuar a WhatsApp
                </button>
                <div className="flex items-center justify-center gap-2 opacity-30 text-[8px] uppercase tracking-widest font-bold">
                  <span>Pago a convenir con el atelier</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
