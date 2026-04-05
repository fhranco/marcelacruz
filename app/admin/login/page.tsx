'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Hardcoded for Marcelacruz Atelier
    if (user === 'admin' && pass === 'MaC@2026') {
      setTimeout(() => {
        localStorage.setItem('ma_admin_auth', 'true');
        router.push('/admin');
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Credenciales de acceso incorrectas.');
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-10 overflow-hidden">
      
      {/* DECORATIVE ELEMENTS */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[60%] bg-[#F2F2F2] rounded-full blur-[100px] opacity-30" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[30%] h-[50%] bg-[#F9F9F9] rounded-full blur-[80px] opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-16">
          <h1 className="text-2xl font-serif uppercase tracking-[0.4em] mb-4">Marcelacruz</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold">Atelier Digital Administration</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-8 bg-white border border-black/5 p-12 shadow-2xl">
          <div className="flex flex-col gap-6">
            <div className="relative group">
              <User size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />
              <input 
                required
                type="text" 
                placeholder="Usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full border-b border-black/10 py-5 pl-8 text-xs font-bold focus:border-black outline-none bg-transparent transition-all"
              />
            </div>

            <div className="relative group">
              <Lock size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors" />
              <input 
                required
                type="password" 
                placeholder="Contraseña"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full border-b border-black/10 py-5 pl-8 text-xs font-bold focus:border-black outline-none bg-transparent transition-all"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[10px] text-red-500 font-bold uppercase tracking-widest text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-6 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center justify-center gap-6 hover:bg-black/90 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : (
              <>
                Entrar al Atelier
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <p className="mt-12 text-center text-[8px] uppercase tracking-widest text-black/20 font-bold">
          © {new Date().getFullYear()} Marcelacruz. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}

