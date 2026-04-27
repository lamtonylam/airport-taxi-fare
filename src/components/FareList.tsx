import { Fare } from '@/lib/fare';

interface FareListProps {
  title: string;
  fares: Fare[];
}

export const FareList = ({ title, fares }: FareListProps) => {
  if (!fares || fares.length === 0) return null;
  return (
    <>
      <h2>{title}</h2>
      <ul>
        {fares.map((fare, index) => (
          <li key={fare.company}>
            {index === 0 ? (
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
  );
};
