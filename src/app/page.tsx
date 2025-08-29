'use client';
import { useState } from 'react';

import { TaxiPrices } from '@/data/prices';
import { TaxiCompanies } from '@/data/prices';

export default function Home() {
  const [distance, setDistance] = useState(0);
  const [toCityCentre, setToCityCentre] = useState(false);
  const [fares, setFares] = useState<{ company: string; fare: number }[]>([]);

  const formatFaresForShare = () => {
    if (toCityCentre) {
      const fares = getCityCentreFares();
      return (
        'Estimated taxi fares from Helsinki airport to city centre:' +
        '\n\n' +
        fares
          .map((fare) => `${fare.company}: ${fare.fare.toFixed(2)}€`)
          .join('\n') +
        '\n\nCalculated using https://taxi.ynot.fi'
      );
    } else if (distance > 0 && fares.length > 0) {
      return (
        `Estimated taxi fares from Helsinki airport for ${distance} km:` +
        '\n\n' +
        fares
          .map((fare) => `${fare.company}: ${fare.fare.toFixed(2)}€`)
          .join('\n') +
        '\n\nCalculated using https://taxi.ynot.fi'
      );
    }
    return '';
  };

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
      className="font-sans grid items-center justify-items-center gap-17 mx-auto" >
      <h1 className="text-3xl font-bold text-center mb-6 pt-5">
        Helsinki airport
        <br />
        taxi fare calculator
      </h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="toCityCentre" className="flex items-center gap-2 mb-2 px-4">
          <span>Are you travelling to the Helsinki city centre?</span>
          <input
            type="checkbox"
            id="toCityCentre"
            name="toCityCentre"
            checked={toCityCentre}
            onChange={(e) => setToCityCentre(e.target.checked)}
            className="mr-2"
          />
        </label>
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

      <div className="flex flex-col justify-center items-center">
        {!toCityCentre && distance > 0 && (
          <>
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
          </>
        )}

        {toCityCentre && (
          <>
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
          </>
        )}

        {(toCityCentre || (distance > 0 && fares.length > 0)) && (
          <div className="flex gap-3 justify-center mb-2 pt-[30px] px-8">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                formatFaresForShare(),
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
            >
              <span>Share fares on WhatsApp</span>
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                formatFaresForShare(),
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <span>Share fares on Telegram</span>
            </a>
          </div>
        )}
      </div>

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
