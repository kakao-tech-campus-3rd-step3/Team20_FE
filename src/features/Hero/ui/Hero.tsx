import { Button } from '@/features/Hero/ui/Button';
import { text } from '@/features/Hero/model/text';
import { PATHS } from '@/features/Hero/model/path';
export function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-8 py-12">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">{text.heroTitle}</h1>
        <p className="text-gray-600">{text.heroSub}</p>
        <div className="flex gap-3">
          <Button href={PATHS.MAP} variant="primary">
            {text.Browse}
          </Button>
          <Button href={PATHS.MAP} variant="secondary">
            {text.Map}
          </Button>
        </div>
      </div>
      <div className="rounded-2xl border aspect-video bg-gray-50 grid place-items-center relative overflow-hidden"></div>
    </section>
  );
}
