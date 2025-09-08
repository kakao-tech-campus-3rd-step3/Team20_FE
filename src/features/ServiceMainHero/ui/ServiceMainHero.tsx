import { Button } from './Button';
import { messages } from '../model/messages';
import { PATHS } from '../model/path';
export function ServiceMainHero() {
  return (
    <section className="grid md:grid-cols-2 gap-8 py-12">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{messages.heroTitle}</h1>
        <p className="text-gray-600">{messages.heroSub}</p>
        <div className="flex gap-3">
          <Button href={PATHS.MAP} variant="primary">
            {messages.Browse}
          </Button>
          <Button href={PATHS.MAP} variant="secondary">
            {messages.Map}
          </Button>
        </div>
      </div>
      <div className="rounded-2xl border aspect-video bg-gray-50 grid place-items-center relative overflow-hidden"></div>
    </section>
  );
}
