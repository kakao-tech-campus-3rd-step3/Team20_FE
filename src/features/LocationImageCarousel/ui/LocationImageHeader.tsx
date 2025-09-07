import { messages } from '../model/messages';

export function LocationImageHeader() {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{messages.title}</h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">{messages.description}</p>
    </div>
  );
}
