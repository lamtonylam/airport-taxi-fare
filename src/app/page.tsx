'use client';
import { useState } from 'react';

import { TaxiPrices } from '@/data/prices';
import { TaxiCompanies } from '@/data/prices';

export default function Home() {
  const [distance, setDistance] = useState(0);
  const [toCityCentre, setToCityCentre] = useState(false);
  const [fares, setFares] = useState<{ company: string; fare: number }[]>([]);

  const calculateFare = (km: number, company: TaxiCompanies) => {
    const prices = TaxiPrices[company];
    if (!prices) return 0;

    if (km <= 5) {
      return prices.priceTo5Km;
    }

    return prices.startingFare + prices.pricePerKm * km;
  };

  const getFares = (km: number) => {
    return Object.keys(TaxiPrices)
      .map((company) => ({
        company: TaxiPrices[company].companyName,
        companyName: company,
        fare: calculateFare(km, company as TaxiCompanies),
      }))
      .sort((a, b) => a.fare - b.fare);
  };

  const getCityCentreFares = () => {
    return Object.keys(TaxiPrices)
      .map((company) => ({
        company: TaxiPrices[company].companyName,
        fare: TaxiPrices[company].priceToCityCentre,
      }))
      .sort((a, b) => a.fare - b.fare);
  };

  return (
    <div
      className="font-sans grid items-center justify-items-center gap-17 mx-auto"
      style={{ maxWidth: 500 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6 pt-5">
        Helsinki airport
        <br />
        taxi fare calculator
      </h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="toCityCentre" className="flex items-center gap-2 mb-2">
          <span>Are you travelling to the Helsinki city centre? :</span>
          <input
            type="checkbox"
            id="toCityCentre"
            name="toCityCentre"
            checked={toCityCentre}
            onChange={(e) => setToCityCentre(e.target.checked)}
            className="mr-2"
          />
        </label>
        <p style={{ maxWidth: '400px' }}>
          Postal codes: 00100-00180, 00220. Additionally, hotels: Scandic Park,
          Crowne Plaza Helsinki Hesperia, Hilton Helsinki Strand, Scandic Paasi,
          Scandic Hakaniemi
        </p>
      </div>

      {!toCityCentre && (
        <div className="flex flex-col gap-2">
          <label htmlFor="distance">Distance (km):</label>

          <input
            id="distance"
            type="number"
            value={distance === 0 ? '' : distance}
            onChange={(e) => {
              const km = Number(e.target.value) || 0;
              setDistance(km);
              setFares(getFares(km));
            }}
            className="border border-gray-300 rounded px-2 py-1"
            min={0}
          />
        </div>
      )}

      {!toCityCentre && distance > 0 && (
        <div className="flex flex-col">
          <h2>Estimated Fares:</h2>
          <ul>
            {fares.map((fare, idx) => (
              <li key={fare.company}>
                {idx === 0 ? (
                  <b>
                    {fare.company}: {fare.fare.toFixed(2)}€
                  </b>
                ) : (
                  <>
                    {fare.company}: {fare.fare.toFixed(2)}€
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {toCityCentre && (
        <div className="flex flex-col gap-2">
          <h2>Estimated Fares to City Centre:</h2>
          <ul>
            {getCityCentreFares().map((fare, idx) => (
              <li key={fare.company}>
                {idx === 0 ? (
                  <b>
                    {fare.company}: {fare.fare.toFixed(2)}€
                  </b>
                ) : (
                  <>
                    {fare.company}: {fare.fare.toFixed(2)}€
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <hr />
        <p>Prices last updated 29.08.2025</p>
        <p>
          Only for informational purposes. <br /> Not affiliated with Finavia or
          taxi companies
        </p>
        <p>Feedback:</p>
        <a
          href="mailto:helsinki-taxifare@ynot.fi"
          className="text-blue-600 underline hover:text-blue-800"
        >
          helsinki-taxifare@ynot.fi
        </a>
      </div>
    </div>
  );
}
