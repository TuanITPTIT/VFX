"use client";

import { LockKeyhole } from "lucide-react";
import EpisodeGrid, { type EpisodeGridProps } from "@/components/ui/episode-grid";

type EpisodeDrawerProps = Omit<EpisodeGridProps, "compact"> & { dramaTitle: string; freeEpisodeCount: number };

export default function EpisodeDrawer({ dramaTitle, freeEpisodeCount, ...gridProps }: EpisodeDrawerProps) {
  return (
    <>
      <span className="dialog-eyebrow">{dramaTitle.toLocaleUpperCase("vi-VN")}</span>
      <h2 id="dialog-title">Chọn tập của bạn</h2>
      <p className="dialog-description">{gridProps.totalEpisodes} tập · {freeEpisodeCount} tập đầu miễn phí</p>
      <EpisodeGrid {...gridProps} />
      <div className="episode-legend">
        <span><i className="legend-current" /> Đang xem</span>
        <span><LockKeyhole size={10} /> 30 xu / tập</span>
      </div>
    </>
  );
}
