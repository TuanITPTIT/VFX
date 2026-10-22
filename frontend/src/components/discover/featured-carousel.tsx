"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react";
import type { DramaSummary } from "@/types/drama";

export default function FeaturedCarousel({ dramas }: { dramas: DramaSummary[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    const element = track.current;
    if (!element) return;
    const next = (index + dramas.length) % dramas.length;
    element.scrollTo({ left: next * element.clientWidth, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section className="featured-carousel" aria-label="Phim nổi bật" aria-roledescription="carousel">
      <div className="featured-track" ref={track} onScroll={event => {
        const element = event.currentTarget;
        setActive(Math.max(0, Math.min(dramas.length - 1, Math.round(element.scrollLeft / element.clientWidth))));
      }}>
        {dramas.map((drama, index) => (
          <article className={`featured-slide featured-slide-${index}`} key={drama.id} aria-label={`${index + 1} / ${dramas.length}: ${drama.title}`} aria-hidden={index !== active}>
            <img className="featured-photo" src={drama.poster} alt="" loading={index === 0 ? "eager" : "lazy"} width={900} height={1600} />
            <div className="featured-shade" />
            <div className="featured-copy">
              <span className="featured-eyebrow"><Sparkles size={13} /> SHORTSCENE ORIGINAL</span>
              <div className="featured-meta"><span className="featured-exclusive">ĐỘC QUYỀN</span><span>{drama.tags.slice(0, 2).join(" · ")}</span><span>{drama.totalEpisodes} tập</span></div>
              <h1>{drama.title}</h1>
              <p>{drama.description}</p>
              <Link className="catalog-cta" href={`/watch/${drama.id}`} prefetch={false} tabIndex={index === active ? 0 : -1}><Play size={17} fill="currentColor" /> Xem ngay <ArrowUpRight size={17} /></Link>
              <span className="featured-free">3 tập đầu miễn phí · Mỗi tập, một cảm xúc</span>
            </div>
            <span className="featured-watermark" aria-hidden="true">shortscene.</span>
          </article>
        ))}
      </div>
      <div className="featured-controls">
        <div className="featured-dots" aria-label="Chọn banner">
          {dramas.map((drama, index) => <button key={drama.id} aria-label={`Banner ${index + 1}: ${drama.title}`} aria-pressed={active === index} onClick={() => goTo(index)} className={active === index ? "active" : ""} />)}
        </div>
        <div className="featured-counter"><span>{String(active + 1).padStart(2, "0")}</span> / {String(dramas.length).padStart(2, "0")}</div>
        <button aria-label="Banner trước" onClick={() => goTo(active - 1)}><ChevronLeft size={19} /></button>
        <button aria-label="Banner tiếp theo" onClick={() => goTo(active + 1)}><ChevronRight size={19} /></button>
      </div>
    </section>
  );
}
