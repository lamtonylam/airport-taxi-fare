type Price = {
  companyName: string;
  startingFare: number;
  pricePerKm: number;
  priceToCityCentre: number;
  priceTo5Km: number;
};

export type TaxiCompanies = 'FixuTaxi' | 'TaxiHelsinki' | 'Menevä' | 'Lähitaksi';

export const TaxiPrices: { [key: string]: Price } = {
  FixuTaxi: {
    companyName: 'Fixu Taxi',
    startingFare: 0,
    pricePerKm: 2.16,
    priceToCityCentre: 37.91,
    priceTo5Km: 20.58,
  },
  TaxiHelsinki: {
    companyName: 'Taksi Helsinki',
    startingFare: 0,
    pricePerKm: 2.17,
    priceToCityCentre: 37.9,
    priceTo5Km: 13.0,
  },
  Menevä: {
    companyName: 'Menevä',
    startingFare: 10.83,
    pricePerKm: 1.62,
    priceToCityCentre: 42.0,
    priceTo5Km: 18.5,
  },
  Lähitaksi: {
    companyName: 'Lähitaksi',
    startingFare: 0,
    pricePerKm: 2.14,
    priceToCityCentre: 40.9,
    priceTo5Km: 17.8,
  },
};
