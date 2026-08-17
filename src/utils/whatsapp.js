export const WHATSAPP_PHONE = '919544236858';
export const WHATSAPP_PHONE_DISPLAY = '+91 95442 36858';

/**
 * Generate a luxury-formatted WhatsApp prefilled message for cart items
 */
export function formatCartWhatsAppMessage({
  cart,
  rawCartSubtotal,
  appliedDiscount = 0,
  discountCodeName = '',
  cartSubtotal,
  freeShippingThreshold = 150,
  formatPrice
}) {
  const isFreeShipping = rawCartSubtotal >= freeShippingThreshold;
  const shippingCostText = isFreeShipping ? 'Complimentary (Free Worldwide Express)' : formatPrice(15);
  const totalPayable = formatPrice(cartSubtotal + (isFreeShipping ? 0 : 15));
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const lines = [
    '✨ *HAYAT ATELIER — BESPOKE ABAYA ORDER* ✨\n',
    `Salam / Hello! I would like to place an order for the following ${totalItemCount} item${totalItemCount > 1 ? 's' : ''}:\n`,
    '━━━━━━━━━━━━━━━━━━━━',
    '🛍️ *ORDERED ITEMS & SPECIFICATIONS:*',
    '━━━━━━━━━━━━━━━━━━━━'
  ];

  cart.forEach((item, index) => {
    const itemTotal = formatPrice(item.price * item.quantity);
    lines.push(
      `\n*${index + 1}. ${item.name}*`,
      `   • Style / Cut: ${item.style || 'Open abaya'}`,
      `   • Work / Craft: ${item.work || 'plain'}`,
      `   • Color: ${item.color}`,
      `   • Abaya Size: ${item.size}`,
      `   • Quantity: ${item.quantity}`,
      `   • Price: ${itemTotal} (${formatPrice(item.price)} each)`
    );
  });

  lines.push(
    '\n━━━━━━━━━━━━━━━━━━━━',
    '💰 *PAYMENT & ORDER SUMMARY:*',
    '━━━━━━━━━━━━━━━━━━━━',
    `• Subtotal: ${formatPrice(rawCartSubtotal)}`
  );

  if (appliedDiscount > 0) {
    const discountVal = formatPrice(rawCartSubtotal * appliedDiscount);
    lines.push(`• Privilege Code (${discountCodeName}): -${discountVal}`);
  }

  lines.push(
    `• Shipping: ${shippingCostText}`,
    `• *Estimated Total: ${totalPayable}*`,
    '\n━━━━━━━━━━━━━━━━━━━━',
    '📦 *NEXT STEPS:*',
    'Please confirm piece availability, dispatch timeframe, and share payment details.',
    '\nThank you! 🌿'
  );

  return lines.join('\n');
}

/**
 * Generate a luxury-formatted WhatsApp prefilled message for a single product
 */
export function formatSingleProductWhatsAppMessage({
  product,
  colorName,
  size,
  style,
  work,
  quantity = 1,
  formatPrice
}) {
  const totalPrice = formatPrice(product.price * quantity);
  const selectedStyle = style || product.defaultStyle || (product.styles && product.styles[0]) || 'Open abaya';
  const selectedWork = work || product.defaultWork || (product.works && product.works[0]) || 'plain';

  const lines = [
    '✨ *HAYAT ATELIER — BESPOKE ABAYA ORDER* ✨\n',
    'Salam / Hello! I would like to order this custom piece from HAYAT Atelier:\n',
    '━━━━━━━━━━━━━━━━━━━━',
    `*Piece:* ${product.name}`,
    `*Style / Silhouette:* ${selectedStyle}`,
    `*Work / Craftsmanship:* ${selectedWork}`,
    `*Color:* ${colorName || (product.colors && product.colors[0]?.name)}`,
    `*Abaya Length / Size:* ${size || (product.sizes && product.sizes[0])}`,
    `*Quantity:* ${quantity}`,
    `*Total:* ${totalPrice} (${formatPrice(product.price)} each)`,
    '━━━━━━━━━━━━━━━━━━━━',
    '\nPlease confirm piece availability, dispatch timeline, and share payment details. Thank you! 🌿'
  ];

  return lines.join('\n');
}

/**
 * Open WhatsApp with prefilled message
 */
export function openWhatsApp(message, phoneNumber = WHATSAPP_PHONE) {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
