import { TaxiPrices, TaxiCompanies } from '@/data/prices';

export type Fare = {
  company: string;
  fare: number;
};

/**
 * Calculate fare for a given distance and company.
 * Returns price to 5km if km <= 5, otherwise base fare + per‑km rate.
 */
export const calculateFare = (km: number, company: TaxiCompanies): number => {
  const prices = TaxiPrices[company];
  if (!prices) {
    // Missing price configuration for the given company
    // Throwing helps surface configuration errors early
    throw new Error(`Price data for company '${company}' not found`);
  }

  if (km <= 5) {
    return prices.priceTo5Km;
  }

  // For distances beyond 5 km, charge the first 5 km fare plus per‑km rate for the excess distance
  const excessKm = km - 5;
  return prices.priceTo5Km + prices.pricePerKm * excessKm;
};

/** Get sorted list of fares for a specific distance. */
export const getFares = (km: number): Fare[] => {
  return Object.entries(TaxiPrices)
    .map(([key, price]) => ({
      company: price.companyName,
      fare: calculateFare(km, key as TaxiCompanies),
    }))
    .sort((a, b) => a.fare - b.fare);
};

/** Get sorted list of fixed city‑centre fares. */
export const getCityCentreFares = (): Fare[] => {
  return Object.entries(TaxiPrices)
    .map(([, price]) => ({
      company: price.companyName,
      fare: price.priceToCityCentre,
    }))
    .sort((a, b) => a.fare - b.fare);
};

/**
 * Build a shareable text for WhatsApp/Telegram.
 * Handles both city‑centre and distance‑based calculations.
 */
export const formatFaresForShare = (
  toCityCentre: boolean,
  distance: number,
  fares: Fare[],
  cityCentreFares?: Fare[],
): string => {
  if (toCityCentre && cityCentreFares) {
    return (
      'Fixed taxi fares from Helsinki airport to city centre:\n\n' +
      cityCentreFares
        .map((f) => `${f.company}: ${f.fare.toFixed(2)}€`)
        .join('\n') +
      '\n\nCalculated using https://taxi.ynot.fi'
    );
  }

  if (distance > 0 && fares.length > 0) {
    return (
      `Estimated taxi fares from Helsinki airport for ${distance} km:\n\n` +
      fares.map((f) => `${f.company}: ${f.fare.toFixed(2)}€`).join('\n') +
      '\n\nCalculated using https://taxi.ynot.fi'
    );
  }
  return '';
};
