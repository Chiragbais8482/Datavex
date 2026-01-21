import MagicBentoWrapper from "./MagicBentoWrapper";
import BlurText from "./BlurText";

interface Item {
  id: string;
  title: string;
  description: string;
  height: number;
}

export default function MasonryBoxes({ items }: { items: Item[] }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto">
      {items.map(item => (
        <div key={item.id} className="mb-6 break-inside-avoid">
          <MagicBentoWrapper>
            <div
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2"
              style={{ minHeight: item.height }}
            >
              <BlurText
                text={item.title}
                className="text-xl font-semibold mb-1"
              />

              <BlurText
                text={item.description}
                className="text-gray-400 text-sm leading-relaxed"
              />
            </div>
          </MagicBentoWrapper>
        </div>
      ))}
    </div>
  );
}
