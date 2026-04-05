'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';

import ImageUpload from '@/components/ui/ImageUpload';

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    slug: '',
    precio: '',
    imagen: '',
    galeria: ['', '', '', ''],
    categoria: 'Joyas',
    descripcion: '',
    nuevo: true,
    enStock: true
  });

  const handleGalleryChange = (index: number, url: string) => {
    const newGaleria = [...formData.galeria];
    newGaleria[index] = url;
    setFormData({ ...formData, galeria: newGaleria });
  };

  const generateSlug = () => {
    const slug = formData.nombre.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    setFormData({ ...formData, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.slug || !formData.precio || !formData.imagen) {
       alert("Por favor completa todos los campos esenciales.");
       return;
    }
    setLoading(true);
    // Filtrar galeria de strings vacíos
    const finalData = { 
      ...formData, 
      precio: parseInt(formData.precio as string),
      galeria: formData.galeria.filter(img => img.trim() !== '')
    };

    const auth = localStorage.getItem('ma_admin_auth');
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth}`
      },
      body: JSON.stringify(finalData),
    });
    if (res.ok) router.push('/admin');
    else alert("Hubo un error al guardar el producto.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col p-8 md:p-16">
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between mb-16 px-4">
        <Link href="/admin" className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-black/40 hover:text-black transition-colors">
          <ArrowLeft size={16} /> Volver al Inventario
        </Link>
        <h1 className="text-3xl md:text-4xl font-serif uppercase tracking-tighter">Nuevo Objeto Esencial</h1>
      </header>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-4 gap-10 px-4 pb-32">
        
        {/* COL 1 & 2: GENERAL INFO & DESCRIPTION */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          <div className="bg-white border border-black/5 p-10 flex flex-col gap-10 shadow-sm">
            <div className="flex flex-col gap-2">
               <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Nombre del Producto</label>
               <input 
                required 
                type="text" 
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                onBlur={generateSlug}
                placeholder="Ej: Anillo Aura Plata 925"
                className="w-full border-b border-black/10 py-3 text-sm font-bold focus:border-black outline-none transition-colors"
               />
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Slug (URL)</label>
               <div className="flex items-center gap-2">
                 <input 
                  required 
                  type="text" 
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="anillo-aura-plata-925"
                  className="flex-1 border-b border-black/10 py-3 text-xs font-mono text-black/60 focus:border-black outline-none"
                 />
                 <button type="button" onClick={generateSlug} className="p-2 hover:bg-black/5 rounded-full"><Sparkles size={14} /></button>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                 <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Precio (CLP)</label>
                 <input 
                  required 
                  type="number" 
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  className="w-full border-b border-black/10 py-3 text-sm font-bold focus:border-black outline-none"
                 />
              </div>
              <div className="flex flex-col gap-2">
                 <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Categoría</label>
                 <select 
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full border-b border-black/10 py-3 text-sm font-bold bg-transparent outline-none"
                 >
                   <option>Joyas</option>
                   <option>Aromas</option>
                   <option>Accesorios</option>
                   <option>Ropa</option>
                 </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
               <label className="text-[9px] uppercase tracking-widest font-bold text-black/40">Descripción Editorial</label>
               <textarea 
                rows={4}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                placeholder="Cuenta la historia de este objeto..."
                className="w-full border-b border-black/10 py-3 text-sm font-medium focus:border-black outline-none resize-none no-scrollbar"
               />
            </div>
          </div>

          {/* STOCK STATUS BOX */}
          <div className="bg-white border border-black/5 p-10 flex items-center justify-between shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest font-bold">Estado del Objeto</span>
              <span className="text-[9px] text-black/30 font-bold uppercase">{formData.enStock ? 'Disponible inmediatamente' : 'Agotado / Bajo Pedido'}</span>
            </div>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, enStock: !formData.enStock})}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.enStock ? 'bg-black' : 'bg-gray-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${formData.enStock ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* COL 3 & 4: IMAGES */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          <div className="bg-white border border-black/5 p-10 flex flex-col gap-10 shadow-sm">
            <ImageUpload 
              label="Imagen Principal (Cover)"
              value={formData.imagen}
              onChange={(url) => setFormData({ ...formData, imagen: url })}
            />

            <div className="pt-10 border-t border-black/5">
              <h3 className="text-[9px] uppercase tracking-widest font-bold text-black/40 mb-8">Galería de Detalles (Máx 4)</h3>
              <div className="grid grid-cols-2 gap-8">
                 {formData.galeria.map((img, i) => (
                   <ImageUpload 
                    key={i}
                    label={`Detalle ${i + 1}`}
                    value={img}
                    onChange={(url) => handleGalleryChange(i, url)}
                    aspect="square"
                   />
                 ))}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-6 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center justify-center gap-6 hover:bg-black/90 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            Publicar Objeto
          </button>
        </div>
      </form>
    </div>
  );
}
