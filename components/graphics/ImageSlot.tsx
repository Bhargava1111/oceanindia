import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * IMAGE SLOT — drop your own photo here.
 * Pass `src` (e.g. "/projects/studio-1.jpg" after uploading to /public/projects)
 * and the slot renders it with next/image; without `src` it shows a labelled
 * placeholder with abstract ocean gradients so layouts stay intact.
 */
export function ImageSlot({
  src,
  alt,
  label = "Your photo here",
  className,
  aspect = "aspect-[4/3]",
  hue = 200,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  aspect?: string;
  hue?: number;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl", aspect, className)}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center"
          style={{
            background: `radial-gradient(at 20% 20%, hsl(${hue} 90% 55% / 0.45), transparent 55%), radial-gradient(at 80% 80%, hsl(${(hue + 80) % 360} 80% 55% / 0.4), transparent 55%), linear-gradient(160deg, #0A1A3A, #050B1A)`,
          }}
        >
          <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden>
            <path d="M0 200c60-40 120-40 180 0s120 40 180 0 60-20 40 0v100H0z" fill="#22D3EE" opacity="0.4" />
            <path d="M0 230c60-40 120-40 180 0s120 40 180 0 60-20 40 0v70H0z" fill="#8B5CF6" opacity="0.4" />
          </svg>
          <span className="relative glass rounded-full p-3"><ImageIcon className="h-5 w-5 text-aqua" /></span>
          <span className="relative text-xs font-semibold uppercase tracking-widest text-foam/80">{label}</span>
        </div>
      )}
    </div>
  );
}
