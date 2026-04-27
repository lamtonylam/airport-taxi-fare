import { Fare, formatFaresForShare } from '@/lib/fare';

interface ShareButtonsProps {
  toCityCentre: boolean;
  distance: number;
  fares: Fare[];
  cityCentreFares?: Fare[];
}

export const ShareButtons = ({
  toCityCentre,
  distance,
  fares,
  cityCentreFares,
}: ShareButtonsProps) => {
  const text = formatFaresForShare(
    toCityCentre,
    distance,
    fares,
    cityCentreFares,
  );

  if (!text) return null;

  const encoded = encodeURIComponent(text);
  return (
    <div className="flex gap-3 justify-center mb-2 pt-[30px] px-8">
      <a
        href={`https://wa.me/?text=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
      >
        <span>Share fares on WhatsApp</span>
      </a>
      <a
        href={`https://t.me/share/url?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
      >
        <span>Share fares on Telegram</span>
      </a>
    </div>
  );
};
