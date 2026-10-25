import { Reveal } from "@/components/reveal";

export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal>
      <div className="mb-10">
        <span className="mono-label text-accent">{label}</span>
        <h2 className="mt-3 text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-secondary">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
