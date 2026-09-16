/**
 * Image helpers.
 *
 * Photography is served from a CDN that accepts a `w` parameter, which lets us
 * build a responsive `srcset` without shipping multiple files. Every `Photo`
 * carries its intrinsic dimensions so containers can reserve space and avoid
 * layout shift before the image arrives.
 */
export type Photo = {
  id: number;
  width: number;
  height: number;
  alt: string;
  /** Optional focal point for object-position, e.g. "50% 20%" */
  focus?: string;
};

export const IMAGE_WIDTHS = [640, 960, 1280, 1600, 1920, 2400] as const;

const CDN = "https://images.pexels.com/photos";

export function photoUrl(photo: Photo, width: number): string {
  return `${CDN}/${photo.id}/pexels-photo-${photo.id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export function photoSrcSet(photo: Photo, widths: readonly number[] = IMAGE_WIDTHS): string {
  return widths.map((w) => `${photoUrl(photo, w)} ${w}w`).join(", ");
}

export function isPortrait(photo: Photo): boolean {
  return photo.height > photo.width;
}

/** Convenience factory used by the content file. */
export const photo = (id: number, width: number, height: number, alt: string, focus?: string): Photo => ({
  id,
  width,
  height,
  alt,
  focus,
});
