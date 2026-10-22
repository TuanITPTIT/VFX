"use client";

import { LockKeyhole } from "lucide-react";
import type { Episode } from "@/types/drama";

export type EpisodeGridProps = {
  episodes: Episode[];
  activeIndex: number;
  totalEpisodes: number;
  onSelect: (index: number) => void;
  compact?: boolean;
};

export default function EpisodeGrid({ episodes, activeIndex, totalEpisodes, onSelect, compact = false }: EpisodeGridProps) {
  return (
    <div className={`episode-grid ${compact ? "compact" : ""}`}>
      {Array.from({ length: totalEpisodes }, (_, index) => {
        const episode = episodes[index];
        return (
          <button
            key={index}
            disabled={!episode}
            aria-label={`Tập ${index + 1}${!episode ? ": Sắp ra mắt" : episode.isLocked ? `: Khóa, ${episode.price} xu` : ""}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => onSelect(index)}
            className={`episode-cell ${index === activeIndex ? "selected" : ""}`}
          >
            {String(index + 1).padStart(2, "0")}
            {episode?.isLocked && <LockKeyhole size={9} className="cell-lock" />}
          </button>
        );
      })}
    </div>
  );
}
