import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/CartContext";
import CartDrawer from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  title: "Marcelacruz — Minimalist Luxury Boutique",
  description: "E-commerce de lujo: joyas, accesorios, aromas y ropa. Una experiencia de compra intemporal y exclusiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-inter">
        <CartProvider>
          <div className="custom-cursor hidden md:block" id="cursor" style={{ background: '#000' }} />
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <script dangerouslySetInnerHTML={{ __html: `
          const cursor = document.getElementById('cursor');
          document.addEventListener('mousemove', (e) => {
            if (cursor) {
              cursor.style.left = e.clientX + 'px';
              cursor.style.top = e.clientY + 'px';
            }
          });
          document.addEventListener('mousedown', () => cursor.style.transform = 'scale(0.8)');
          document.addEventListener('mouseup', () => cursor.style.transform = 'scale(1)');
        `}} />
      </body>
    </html>
  );
}
