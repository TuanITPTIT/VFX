import Link from "next/link";
import { Play } from "lucide-react";
import type { DramaSummary } from "@/types/drama";

export default function MovieCard({ drama, rank }: { drama: DramaSummary; rank?: number }) {
  return (
    <Link href={`/watch/${drama.id}`} prefetch={false} className="movie-card" aria-label={`Xem ${drama.title}, ${drama.totalEpisodes} tập`}>
      <div className="movie-artwork">
        <img src={drama.poster} alt="" loading="lazy" decoding="async" width={360} height={640} />
        <div className="movie-artwork-shade" />
        <span className={`movie-badge ${drama.isNew ? "new" : ""}`}>{drama.isNew ? "MỚI" : drama.status === "Trọn bộ" ? "TRỌN BỘ" : "ĐANG HOT"}</span>
        <span className="movie-poster-title">{drama.title}</span>
        <span className="movie-episode-count">{drama.totalEpisodes} tập</span>
        <span className="movie-play"><Play size={23} fill="currentColor" /></span>
        {rank && <span className="movie-rank" aria-hidden="true">{String(rank).padStart(2, "0")}</span>}
      </div>
      <h3>{drama.title}</h3>
      <p>{drama.tags.slice(0, 2).join(" · ")}</p>
    </Link>
  );
}
