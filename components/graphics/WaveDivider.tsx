import { cn } from "@/lib/utils";

/** Decorative wave separator. `flip` to use at the top of a section. */
export function WaveDivider({ className, flip = false, tone = "bg-2" }: { className?: string; flip?: boolean; tone?: "bg" | "bg-2" }) {
  return (
    <div aria-hidden className={cn("relative h-16 md:h-24 w-full overflow-hidden leading-[0]", flip && "rotate-180", className)}>
      <svg className="absolute bottom-0 h-full w-[200%] animate-[marquee_30s_linear_infinite] motion-reduce:animate-none" viewBox="0 0 2880 120" preserveAspectRatio="none" fill="none">
        <path d="M0 60c120-40 240-40 360 0s240 40 360 0 240-40 360 0 240 40 360 0 240-40 360 0 240 40 360 0 240-40 360 0 240 40 360 0v60H0z" className={tone === "bg" ? "fill-bg" : "fill-bg-2"} />
        <path d="M0 80c120-40 240-40 360 0s240 40 360 0 240-40 360 0 240 40 360 0 240-40 360 0 240 40 360 0 240-40 360 0 240 40 360 0" stroke="url(#wave-stroke)" strokeWidth="2" opacity="0.5" />
        <defs>
          <linearGradient id="wave-stroke" x1="0" x2="2880" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" />
            <stop offset="0.5" stopColor="#2DD4BF" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
