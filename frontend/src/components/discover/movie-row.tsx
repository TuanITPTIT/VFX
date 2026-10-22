"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./movie-card";
import type { DramaSummary } from "@/types/drama";

type MovieRowProps = {
  id: string;
  title: string;
  subtitle: string;
  dramas: DramaSummary[];
  ranked?: boolean;
};

export default function MovieRow({ id, title, subtitle, dramas, ranked = false }: MovieRowProps) {
  const track = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    track.current?.scrollBy({
      left: direction * track.current.clientWidth * 0.85,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section className="movie-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="movie-section-heading">
        <div><h2 id={`${id}-title`}>{title}{ranked && <span className="section-hot-dot" />}</h2><p>{subtitle}</p></div>
        <div className="row-arrows">
          <button onClick={() => scroll(-1)} aria-label={`Cuộn ${title} sang trái`}><ChevronLeft size={18} /></button>
          <button onClick={() => scroll(1)} aria-label={`Cuộn ${title} sang phải`}><ChevronRight size={18} /></button>
        </div>
      </div>
      <div className="movie-track" ref={track} tabIndex={0} aria-label={title}>
        {dramas.map((drama, index) => <MovieCard key={drama.id} drama={drama} rank={ranked ? index + 1 : undefined} />)}
      </div>
    </section>
  );
}
