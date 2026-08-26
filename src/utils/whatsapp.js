export const WHATSAPP_PHONE = '919544236858';
export const WHATSAPP_PHONE_DISPLAY = '+91 95442 36858';

/**
 * Generate a luxury-formatted WhatsApp prefilled message for cart items
 */
export function formatCartWhatsAppMessage({
  cart,
  rawCartSubtotal,
  cartSubtotal,
  freeShippingThreshold = 150,
  formatPrice,
  userLocation = null
}) {
  const isFreeShipping = rawCartSubtotal >= freeShippingThreshold;
  const shippingCostText = isFreeShipping ? 'Complimentary (Free Worldwide Express)' : formatPrice(15);
  const totalPayable = formatPrice(cartSubtotal + (isFreeShipping ? 0 : 15));
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const lines = [
    '✨ *NOOR AL DHUHA ATELIER — BESPOKE ABAYA ORDER* ✨\n',
    `Salam / Hello! I would like to place an order for the following ${totalItemCount} item${totalItemCount > 1 ? 's' : ''}:\n`,
    '━━━━━━━━━━━━━━━━━━━━',
    '🛍️ *ORDERED ITEMS & SPECIFICATIONS:*',
    '━━━━━━━━━━━━━━━━━━━━'
  ];

  cart.forEach((item, index) => {
    const itemTotal = formatPrice(item.price * item.quantity);
    let itemSpecLines = [
      `\n*${index + 1}. ${item.name}*`,
      `   • Style / Cut: ${item.style || 'Open abaya'}`,
      `   • Work / Craft: ${item.work || 'plain'}`,
      `   • Color: ${item.color}`,
      `   • Abaya Size: ${item.size}`
    ];
    if (item.customMeasurements) {
      if (item.customMeasurements.height) itemSpecLines.push(`     - Height: ${item.customMeasurements.height}`);
      if (item.customMeasurements.bust) itemSpecLines.push(`     - Bust: ${item.customMeasurements.bust}`);
      if (item.customMeasurements.length) itemSpecLines.push(`     - Custom Length: ${item.customMeasurements.length}`);
    }
    itemSpecLines.push(
      `   • Quantity: ${item.quantity}`,
      `   • Price: ${itemTotal} (${formatPrice(item.price)} each)`
    );
    lines.push(...itemSpecLines);
  });

  lines.push(
    '\n━━━━━━━━━━━━━━━━━━━━',
    '💰 *PAYMENT & ORDER SUMMARY:*',
    '━━━━━━━━━━━━━━━━━━━━',
    `• Subtotal: ${formatPrice(rawCartSubtotal)}`
  );

  lines.push(`• Shipping: ${shippingCostText}`);
  if (userLocation?.country) {
    const locText = [userLocation.city, userLocation.country].filter(Boolean).join(', ');
    lines.push(`• Destination Country: ${userLocation.flag || '📍'} ${locText}`);
  }
  lines.push(
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
  customMeasurements = null,
  formatPrice
}) {
  const totalPrice = formatPrice(product.price * quantity);
  const selectedStyle = style || product.defaultStyle || (product.styles && product.styles[0]) || 'Open abaya';
  const selectedWork = work || product.defaultWork || (product.works && product.works[0]) || 'plain';

  const lines = [
    '✨ *NOOR AL DHUHA ATELIER — BESPOKE ABAYA ORDER* ✨\n',
    'Salam / Hello! I would like to order this custom piece from NOOR AL DHUHA Atelier:\n',
    '━━━━━━━━━━━━━━━━━━━━',
    `*Piece:* ${product.name}`,
    `*Style / Silhouette:* ${selectedStyle}`,
    `*Work / Craftsmanship:* ${selectedWork}`,
    `*Color:* ${colorName || (product.colors && product.colors[0]?.name)}`,
    `*Abaya Length / Size:* ${size || (product.sizes && product.sizes[0])}`
  ];

  if (customMeasurements) {
    if (customMeasurements.height) lines.push(`*Height / Stature:* ${customMeasurements.height}`);
    if (customMeasurements.bust) lines.push(`*Bust Measurement:* ${customMeasurements.bust}`);
    if (customMeasurements.length) lines.push(`*Desired Garment Length:* ${customMeasurements.length}`);
  }

  lines.push(
    `*Quantity:* ${quantity}`,
    `*Total:* ${totalPrice} (${formatPrice(product.price)} each)`,
    '━━━━━━━━━━━━━━━━━━━━',
    '\nPlease confirm piece availability, dispatch timeline, and share payment details. Thank you! 🌿'
  );

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
