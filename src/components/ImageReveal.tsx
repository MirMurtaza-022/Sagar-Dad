import { useRef } from "react";
import { cn } from "@/utils/cn";
import { photoSrcSet, photoUrl, type Photo } from "@/lib/images";
import { gsap, useGSAP, EASE, prefersReducedMotion } from "@/lib/motion";

type ImageRevealProps = {
  image: Photo;
  /** The `sizes` attribute — describe how wide the image renders. */
  sizes: string;
  /**
   * CSS aspect-ratio (e.g. "3/2"). Defaults to the photo's intrinsic ratio.
   * Pass `null` to control the ratio with responsive classes instead.
   */
  ratio?: string | null;
  className?: string;
  imgClassName?: string;
  /** Above-the-fold image: eager + high fetch priority. */
  priority?: boolean;
  /** Enable the subtle scale on parent `.group` hover. */
  hover?: boolean;
  delay?: number;
  dark?: boolean;
};

/**
 * An image that reveals through a masked container while its scale settles
 * from 1.12 → 1. The container reserves the aspect ratio so nothing shifts
 * while the asset loads. Falls back to a static image for reduced motion.
 */
export function ImageReveal({
  image,
  sizes,
  ratio,
  className,
  imgClassName,
  priority = false,
  hover = false,
  delay = 0,
  dark = false,
}: ImageRevealProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const w = wrap.current;
      const i = inner.current;
      if (!w || !i || prefersReducedMotion()) return;

      gsap.set(w, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(i, { scale: 1.12, transformOrigin: "50% 50%" });

      gsap
        .timeline({ delay, scrollTrigger: { trigger: w, start: "top 92%", once: true } })
        .to(w, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: EASE.inOut }, 0)
        .to(i, { scale: 1, duration: 1.6, ease: EASE.out }, 0);
    },
    { scope: wrap },
  );

  return (
    <div
      ref={wrap}
      className={cn("relative overflow-hidden", dark ? "bg-plate-dark" : "bg-plate", className)}
      style={ratio === null ? undefined : { aspectRatio: ratio ?? `${image.width} / ${image.height}` }}
    >
      <div ref={inner} className="absolute inset-0 will-change-transform">
        <img
          src={photoUrl(image, 1280)}
          srcSet={photoSrcSet(image)}
          sizes={sizes}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          style={image.focus ? { objectPosition: image.focus } : undefined}
          className={cn(
            "h-full w-full object-cover",
            hover && "transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.035]",
            imgClassName,
          )}
        />
      </div>
    </div>
  );
}
