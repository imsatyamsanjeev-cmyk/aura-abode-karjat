export interface PriceBreakdown {
  nights: number;
  baseTotal: number;
  serviceFee: number;
  taxes: number;
  total: number;
  rates: Array<{ date: string; rate: number }>;
}

/**
 * Calculates pricing details for a stay between check-in and check-out dates.
 * Weekdays: ₹3,600/night
 * Weekends (Fri, Sat): ₹4,500/night
 * Service Fee: ₹500 flat
 * Taxes: 5% (GST)
 */
export function calculatePrice(checkInStr: string | Date, checkOutStr: string | Date): PriceBreakdown {
  const start = new Date(checkInStr);
  const end = new Date(checkOutStr);
  
  // Normalize dates to midnight to prevent timezone offsets affecting night counts
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  let nights = 0;
  let baseTotal = 0;
  const rates: Array<{ date: string; rate: number }> = [];
  
  const current = new Date(start);
  while (current < end) {
    const day = current.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday
    const rate = (day === 5 || day === 6) ? 4500 : 3600;
    
    rates.push({
      date: current.toISOString().split('T')[0],
      rate
    });
    
    baseTotal += rate;
    nights++;
    current.setDate(current.getDate() + 1);
  }
  
  const serviceFee = nights > 0 ? 500 : 0;
  const taxes = Math.round(baseTotal * 0.05 * 100) / 100;
  const total = baseTotal + serviceFee + taxes;
  
  return {
    nights,
    baseTotal,
    serviceFee,
    taxes,
    total,
    rates
  };
}
