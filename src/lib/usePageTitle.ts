import { useEffect } from "react";
import { artist } from "@/data/content";

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${artist.name}` : `${artist.name} — Photographer & Filmmaker`;
  }, [title]);
}
