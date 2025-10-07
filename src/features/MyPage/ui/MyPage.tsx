import { useMyPage } from '../hooks/useMyPage';

interface TravelCardData {
  title: string;
  image: string;
  description: string;
  additionalText: string;
}

interface TravelCardProps {
  card: TravelCardData;
}

const TravelCard = ({ card }: TravelCardProps) => {
  return (
    <div className="flex flex-col items-center px-4">
      {/* Image Section with rounded corners and shadow */}
      <div className="relative mb-6">
        <div className="w-72 h-56 rounded-3xl overflow-hidden shadow-xl border-8 border-white bg-white">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Description Button */}
      <div className="mb-6">
        <button className="bg-white border-2 border-gray-400 text-gray-700 px-8 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-md tracking-wide">
          DESCRIPTION
        </button>
      </div>

      {/* Content Section */}
      <div className="text-center max-w-sm px-2">
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          {card.description}
        </p>
        {card.additionalText && (
          <p className="text-sm text-gray-500">
            {card.additionalText}
          </p>
        )}
      </div>
    </div>
  );
};

export const MyPage = () => {
  const { travelCards } = useMyPage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-stone-400 py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-8xl font-light text-white mb-6 tracking-wider">Travel</h1>
          <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 justify-items-center">
            {travelCards.map((card, index) => (
              <TravelCard key={index} card={card} />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-8">
        <div className="max-w-6xl mx-auto flex justify-end">
          <div className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center bg-white shadow-sm">
            <span className="text-gray-500 text-lg font-medium">15</span>
          </div>
        </div>
      </footer>
    </div>
  );
};