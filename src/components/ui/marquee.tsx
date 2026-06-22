import { cn } from "@/lib/utils";

/**
 * Lightweight CSS marquee (cult-ui/magicui style). Duplicates children so the
 * scroll loops seamlessly. Driven by the `--animate-marquee` keyframes in
 * globals.css. Pauses on hover by default.
 */
export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover = true,
  repeat = 4,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
}) {
  return (
    <div
      className={cn("group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)]", className)}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around [gap:var(--gap)] animate-[marquee_var(--duration,32s)_linear_infinite]",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
