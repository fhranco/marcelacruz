'use client';
import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
  aspect?: '4/5' | 'square';
}

export default function ImageUpload({ label, value, onChange, className = '', aspect = '4/5' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setSuccess(false);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const auth = localStorage.getItem('ma_admin_auth');
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth}`
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onChange(data.url);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        alert(data.error || 'Error al subir la imagen');
      }
    } catch (err) {
      alert('Ocurrió un error en la conexión.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <label className="text-[9px] uppercase tracking-widest font-bold text-black/40 flex items-center justify-between">
        <span className="flex items-center gap-2">
          {uploading ? <Loader2 className="animate-spin" size={12} /> : <ImageIcon size={12} />}
          {label}
        </span>
        {success && <CheckCircle className="text-green-500" size={12} />}
      </label>

      <div 
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed transition-all overflow-hidden flex items-center justify-center p-4 bg-[#F2F2F2] hover:bg-black/[0.03] ${value ? 'border-transparent' : 'border-black/5 hover:border-black/10'} ${aspect === 'square' ? 'aspect-square' : 'aspect-[4/5]'}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleUpload}
        />

        {value ? (
          <>
            <img src={value} alt="Preview" className="max-w-full max-h-full object-contain mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
               <span className="text-white text-[9px] uppercase tracking-widest font-bold border border-white/20 px-4 py-2 bg-black/20 backdrop-blur-sm">Cambiar Imagen</span>
            </div>
            <button 
              type="button" 
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
              className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full transition-colors text-black/40 hover:text-red-500 shadow-sm"
            >
              <X size={12} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-10 opacity-30 hover:opacity-100 transition-opacity">
             <Upload size={24} strokeWidth={1} />
             <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Cargar Archivo</span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
            <Loader2 className="animate-spin text-black mb-4" size={24} strokeWidth={1} />
            <span className="text-[10px] uppercase tracking-widest font-bold">Preparando Objeto...</span>
          </div>
        )}
      </div>
      
      {/* URL MANUAL FALLBACK */}
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="O inserta una URL..."
        className="w-full border-b border-black/5 py-2 text-[8px] font-mono text-black/30 bg-transparent outline-none focus:border-black/20 focus:text-black/60 transition-all text-center placeholder:text-transparent hover:placeholder:text-black/20"
      />
    </div>
  );
}
