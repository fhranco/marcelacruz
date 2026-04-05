import productsData from '../data/products.json';

export interface Product {
    id: string;
    slug: string;
    nombre: string;
    categoria: 'Joyas' | 'Aromas' | 'Ropa' | 'Accesorios' | string;
    precio: number;
    descripcion: string;
    imagen: string;
    galeria?: string[];
    enStock?: boolean;
    nuevo?: boolean;
    exclusivo?: boolean;
    colores?: string[];
    tallas?: string[];
}

export const products = productsData as Product[];
