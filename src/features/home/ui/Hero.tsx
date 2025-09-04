import { text } from '@/features/home/model/text';

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-8 py-12">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{text.heroTitle}</h1>
        <p className="text-gray-600">{text.heroSub}</p>
        <div className="flex gap-3">
          <a
            href="/browse"
            className="px-5 py-3 rounded-xl bg-gray-900 text-white hover:opacity-90"
          >
            {text.Browse}
          </a>
          <a href="/map" className="px-5 py-3 rounded-xl border hover:bg-gray-50">
            {text.Map}
          </a>
        </div>
      </div>
      <div className="rounded-2xl border aspect-video bg-gray-50 grid place-items-center relative overflow-hidden"></div>
    </section>
  );
}
