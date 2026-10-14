import { Mic, Waves, Speaker, SlidersHorizontal, Headphones, Disc3, Guitar, Cable, Cpu, Layers, Gift, Tag, Recycle, Zap } from "lucide-react";
import type { Category } from "@/data/categories";

const map = { mic: Mic, waves: Waves, speaker: Speaker, sliders: SlidersHorizontal, headphones: Headphones, disc: Disc3, guitar: Guitar, cable: Cable, cpu: Cpu, layers: Layers, gift: Gift, tag: Tag, recycle: Recycle, zap: Zap };

export function CategoryIcon({ name, className }: { name: Category["icon"]; className?: string }) {
  const Icon = map[name] ?? Waves;
  return <Icon className={className} aria-hidden />;
}
