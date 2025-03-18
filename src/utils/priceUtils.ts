
/**
 * Safely parses a price value which could be either a string or number
 * Handles string prices in formats like "2,490 ฿" or "฿2,490.00"
 * 
 * @param price - The price value as either string or number
 * @returns The parsed numeric price value
 */
export const parsePrice = (price: string | number): number => {
  if (typeof price === 'number') return price;
  
  // Handle string price formats by removing currency symbols and commas
  return parseFloat(price.replace(/[^\d.]/g, '')) || 0;
};

/**
 * Formats a numeric price value as a string with currency symbol
 * 
 * @param price - The numeric price value
 * @param currency - The currency symbol to use (default: ฿)
 * @returns Formatted price string
 */
export const formatPrice = (price: number | string, currency: string = '฿'): string => {
  // Ensure we're working with a number
  const numericPrice = typeof price === 'string' ? parsePrice(price) : price;
  return `${numericPrice.toFixed(2)} ${currency}`;
};
