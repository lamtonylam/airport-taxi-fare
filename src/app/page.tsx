'use client';

import { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme';

import { CityCentreToggle } from '@/components/CityCentreToggle';
import { DistanceInput } from '@/components/DistanceInput';
import { FareList } from '@/components/FareList';
import { ShareButtons } from '@/components/ShareButtons';
import { InfoFooter } from '@/components/InfoFooter';

import { getFares, getCityCentreFares, Fare } from '@/lib/fare';

export default function Home() {
  const [distance, setDistance] = useState(0);
  const [toCityCentre, setToCityCentre] = useState(false);
  const [fares, setFares] = useState<Fare[]>([]);

  const cityCentreFares = useMemo(() => getCityCentreFares(), []);

  const handleDistanceChange = (km: number) => {
    setDistance(km);
    setFares(getFares(km));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="font-sans grid items-center justify-items-center gap-17 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 pt-5">
          Helsinki airport
          <br />
          taxi fare calculator
        </h1>

        <CityCentreToggle checked={toCityCentre} onChange={setToCityCentre} />

        {!toCityCentre && (
          <DistanceInput value={distance} onChange={handleDistanceChange} />
        )}

        <div className="flex flex-col justify-center items-center">
          {!toCityCentre && distance > 0 && fares.length > 0 && (
            <FareList title="Estimated Fares:" fares={fares} />
          )}

          {toCityCentre && (
            <FareList
              title="Fixed Fares to City Centre:"
              fares={cityCentreFares}
            />
          )}

          {(toCityCentre || (distance > 0 && fares.length > 0)) && (
            <ShareButtons
              toCityCentre={toCityCentre}
              distance={distance}
              fares={fares}
              cityCentreFares={cityCentreFares}
            />
          )}
        </div>

        <InfoFooter />
      </div>
    </ThemeProvider>
  );
}
