import { messages } from '../model/messages';

export function LocationImageActionButton() {
  return (
    <div className="text-center mt-12">
      <button
        className="
          bg-red-600 text-white px-8 py-3 rounded-xl 
          transition-all hover:scale-105 active:scale-95"
      >
        {messages.allLocationView}
      </button>
    </div>
  );
}
