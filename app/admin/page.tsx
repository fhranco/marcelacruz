'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Home, Package, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Product } from '@/lib/products';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    const res = await fetch('/api/admin/products', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem('ma_admin_auth');
    window.location.href = '/admin/login';
  };

  if (loading) return <div className="p-20 text-center font-bold text-[10px] uppercase tracking-[0.5em]">Cargando Panel...</div>;

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white h-screen sticky top-0 flex flex-col p-8 gap-10">
        <div className="text-[12px] uppercase tracking-[0.4em] font-bold border-b border-white/10 pb-6">Marcelacruz Admin</div>
        <nav className="flex flex-col gap-6 text-[10px] uppercase tracking-widest font-bold">
          <Link href="/admin" className="flex items-center gap-4 text-white"><Package size={14} /> Inventario</Link>
          <Link href="/admin/nuevo" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors border-l border-white/5 pl-4 ml-2"><Plus size={14} /> Nuevo Objeto</Link>
          <Link href="/" className="flex items-center gap-4 text-white/40 hover:text-white transition-colors"><Home size={14} /> Ver Tienda</Link>
          <div className="flex items-center gap-4 text-white/40"><Settings size={14} /> Configuración</div>
          <button onClick={handleLogout} className="mt-auto flex items-center gap-4 text-red-500/60 hover:text-red-500 transition-colors"><LogOut size={14} /> Salir</button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-16">
        <header className="flex justify-between items-center mb-16">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-serif uppercase tracking-tighter">Gestión de Inventario</h1>
            <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-bold">Total: {products.length} Objetos Esenciales</p>
          </div>
          <Link href="/admin/nuevo" className="bg-black text-white px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10">
            <Plus size={16} /> Nuevo Objeto Esencial
          </Link>
        </header>

        {/* PRODUCT LIST */}
        <div className="bg-white border border-black/5 rounded-sm p-10 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/5 text-[9px] uppercase tracking-widest font-bold text-black/40">
                <th className="pb-6 w-20">Preview</th>
                <th className="pb-6">Nombre y Categoría</th>
                <th className="pb-6">Slug</th>
                <th className="pb-6">Precio</th>
                <th className="pb-6">Estado</th>
                <th className="pb-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-bold tracking-tight">
              {products.map((p) => (
                <tr key={p.id} className="border-b border-black/5 hover:bg-black/[0.02] transition-colors group">
                  <td className="py-6">
                    <div className="w-12 h-16 bg-[#F2F2F2] flex items-center justify-center p-2">
                      <img src={p.imagen} alt={p.nombre} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                    </div>
                  </td>
                  <td className="py-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-black/80">{p.nombre}</span>
                      <span className="text-[8px] text-black/30 uppercase tracking-widest">{p.categoria}</span>
                    </div>
                  </td>
                  <td className="py-6 font-mono text-[9px] text-black/40">{p.slug}</td>
                  <td className="py-6">${p.precio?.toLocaleString('es-CL') ?? '0'}</td>
                  <td className="py-6">
                    <span className={`text-[8px] px-2 py-1 uppercase tracking-widest font-bold ${p.enStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {p.enStock ? 'En Stock' : 'Agotado'}
                    </span>
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex items-center justify-end gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/editar/${p.id}`} className="text-black/40 hover:text-black transition-colors"><Edit size={16} strokeWidth={1.5} /></Link>
                      <button onClick={() => handleDelete(p.id)} className="text-black/20 hover:text-red-500 transition-colors"><Trash2 size={16} strokeWidth={1.5} /></button>
                      <Link href={`/productos/${p.slug}`} target="_blank" className="text-black/20 hover:text-black transition-colors"><ChevronRight size={16} /></Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
