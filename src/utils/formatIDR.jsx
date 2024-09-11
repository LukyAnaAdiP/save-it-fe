export function formatIDR(amount) {
  const formattedAmount = amount.toFixed(2);

  return `Rp ${formattedAmount
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }`;
}