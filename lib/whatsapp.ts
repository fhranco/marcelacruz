export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  talla?: string;
  color?: string;
  cantidad: number;
}

export function generarMensajeWhatsApp(carrito: CartItem[], total: number): string {
  const numero = "56930313443"; // Official WhatsApp Marcelacruz
  
  if (carrito.length === 0) return "#";

  const items = carrito.map(item =>
    `📦 *${item.nombre}*\n- Cantidad: ${item.cantidad}\n- Precio: $${(item.precio * item.cantidad).toLocaleString("es-CL")}`
  ).join("\n\n");
  
  const mensaje = encodeURIComponent(
    `✨ *NUEVO PEDIDO - MARCELACRUZ BOUTIQUE*\n\nHola! Me gustaría encargar los siguientes objetos esenciales:\n\n${items}\n\n━━━━━━━━━━━━━━\n💰 *TOTAL ESTIMADO:* $${total.toLocaleString("es-CL")}\n━━━━━━━━━━━━━━\n\nPor favor, confírmenme disponibilidad y los pasos para el pago. ¡Muchas gracias!`
  );
  
  return `https://wa.me/${numero}?text=${mensaje}`;
}
