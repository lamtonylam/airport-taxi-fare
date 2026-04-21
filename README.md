# Helsinki Airport Taxi Fare Calculator

Calculate and share taxi fares from Helsinki Airport to any distance or directly to the city centre.

## Features
- Dark‑mode UI with MUI components
- Input distance (km) → live fare estimates for four companies
- Fixed fare list for city‑centre trips
- Share results on WhatsApp / Telegram to your friends and family

## Getting Started

```bash
npm install        # install dependencies
npm run dev        # start dev server (http://localhost:3000)
npm run build      # create production build
npm run start      # serve built app
```

## Adding / Updating Prices

Edit `src/data/prices.ts`:

```ts
export const TaxiPrices = {
  FixuTaxi: {
    companyName: 'Fixu Taxi',
    startingFare: 0,
    pricePerKm: 2.16,
    priceToCityCentre: 37.91,
    priceTo5Km: 20.58,
  },
  // add or modify other companies here
};
```

`TaxiCompanies` type automatically includes any new keys.