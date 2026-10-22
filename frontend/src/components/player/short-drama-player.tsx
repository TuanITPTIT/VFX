"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Coins, Grid2X2, Heart, LockKeyhole, Maximize, Pause, Play, Plus, Sparkles, Volume2, VolumeX } from "lucide-react";

import Link from "next/link";
import type { Drama } from "@/types/drama";
import EpisodeDrawer from "@/components/modals/episode-drawer";
import UnlockModal from "@/components/modals/unlock-modal";
import TopupModal from "@/components/modals/topup-modal";
import EpisodeGrid from "@/components/ui/episode-grid";
import ModalShell from "@/components/ui/modal-shell";

type Modal = "episodes" | "unlock" | "topup" | null;
const timestamp = (value: number) => `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, "0")}`;

export default function ShortDramaPlayer({ drama }: { drama: Drama }) {
  const [episodes, setEpisodes] = useState(drama.episodes);
  const freeEpisodeCount = drama.episodes.filter(episode => !episode.isLocked).length;
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [muted, setMuted] = useState(false);
  const [likes, setLikes] = useState<number[]>([]);
  const [balance, setBalance] = useState(30);
  const [modal, setModal] = useState<Modal>(null);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });
  const [error, setError] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [toast, setToast] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(active);
  activeRef.current = active;
  const scrollTarget = useRef<number | null>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unlockInFlight = useRef(false);
  const episode = episodes[active];
  const liked = likes.includes(episode.id);

  const notify = (message: string) => setToast(message);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= episodes.length) return;
    setModal(null);
    videos.current[active]?.pause();
    scrollTarget.current = index;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => { scrollTarget.current = null; }, 1400);
    if (index === active && episodes[index].isLocked) setModal("unlock");
    scroller.current?.scrollTo({ top: index * scroller.current.clientHeight, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }, [active, episodes]);

  useEffect(() => {
    setProgress({ current: 0, duration: 0 });
    setError(false);
    setBuffering(false);
    setNeedsTap(false);
    unlockInFlight.current = false;
    if (episodes[active].isLocked) setModal("unlock");
    // Open the paywall once when entering an episode, not again after dismissing it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    let cancelled = false;
    videos.current.forEach((video, index) => {
      if (!video) return;
      if (index !== active || episode.isLocked || modal || !started || document.hidden) video.pause();
      else {
        video.muted = muted;
        setBuffering(true);
        void video.play().then(() => { if (!cancelled) { setNeedsTap(false); setBuffering(false); } }).catch((reason: DOMException) => {
          if (!cancelled && reason.name !== "AbortError") { setBuffering(false); setNeedsTap(true); }
        });
      }
    });
    return () => { cancelled = true; };
  }, [active, episode.isLocked, modal, started, muted]);

  useEffect(() => {
    if (!buffering || !started || modal || episode.isLocked) return;
    const timer = setTimeout(() => {
      videos.current[active]?.pause();
      setBuffering(false);
      setError(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, [active, buffering, started, modal, episode.isLocked]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) videos.current.forEach(video => video?.pause());
      else if (started && !episode.isLocked && !modal) setNeedsTap(true);
    };
    const onKey = (event: KeyboardEvent) => {
      if (modal || (event.target instanceof HTMLElement && event.target.closest("button, input, dialog"))) return;
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault(); goTo(active + (event.key === "ArrowDown" ? 1 : -1));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("visibilitychange", onVisibility); window.removeEventListener("keydown", onKey); };
  }, [active, episode.isLocked, goTo, modal, started]);

  useEffect(() => {
    const container = scroller.current;
    if (!container) return;
    let height = container.clientHeight;
    const observer = new ResizeObserver(() => {
      if (height === container.clientHeight) return;
      height = container.clientHeight;
      container.scrollTo({ top: activeRef.current * height, behavior: "instant" });
    });
    observer.observe(container);
    return () => { observer.disconnect(); if (scrollTimer.current) clearTimeout(scrollTimer.current); };
  }, []);

  function playFromGesture() {
    if (episode.isLocked) { setModal("unlock"); return; }
    const video = videos.current[active];
    if (!video) return;
    if (playing && started && !needsTap) { video.pause(); return; }
    // Keep play() directly inside the tap handler for iOS user activation.
    video.muted = muted;
    if (error) { setError(false); video.load(); }
    setBuffering(true);
    void video.play().then(() => { setNeedsTap(false); setBuffering(false); }).catch(() => { setBuffering(false); setNeedsTap(true); });
    setStarted(true);
  }

  function unlock() {
    if (!episode.isLocked || unlockInFlight.current) return;
    if (balance < episode.price) { setModal("topup"); return; }
    unlockInFlight.current = true;
    setBalance(value => value - episode.price);
    setEpisodes(items => items.map(item => item.id === episode.id ? { ...item, isLocked: false } : item));
    setStarted(true);
    setModal(null);
    notify(`Đã mở khóa tập ${episode.id}. Chúc bạn xem phim vui vẻ!`);
  }

  return <main className="app-shell">
    <header className="desktop-header">
      <Link href="/" className="brand" aria-label="ShortScene trang chủ"><span className="brand-mark"><Play size={18} fill="currentColor" /></span>shortscene<span className="brand-dot">.</span></Link>
      <nav aria-label="Điều hướng"><Link href="/" className="watch-back-link"><ChevronLeft size={17} /> Quay lại Trang chủ</Link><span className="nav-divider" /><span>{drama.title}</span></nav>
      <button className="wallet" onClick={() => setModal("topup")}><Coins size={17} className="text-amber-300" /><b>{balance}</b><span>xu</span><span className="wallet-plus"><Plus size={14} /></span></button>
    </header>

    <div className="watch-layout">
      <aside className="story-panel">
        <span className="eyebrow"><span /> SHORTSCENE ORIGINAL</span>
        <div className="story-tags">{drama.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
        <h1>{drama.title}</h1>
        <p className="story-summary">{drama.description}</p>
        <div className="story-stats"><span><Play size={13} fill="currentColor" /> {new Intl.NumberFormat("vi-VN", { notation: "compact", maximumFractionDigits: 1 }).format(drama.views)}</span><span>{drama.totalEpisodes} tập</span><span className="updating">{drama.status}</span></div>
        <div className="story-rule" />
        <div className="watching"><span className="tiny-bars"><i /><i /><i /></span> BẠN ĐANG XEM</div>
        <h2>Tập {String(episode.id).padStart(2, "0")}</h2>
        <p className="episode-name">{episode.title}</p>
        <div className="swipe-tip"><span><ArrowUp size={14} /><ArrowDown size={14} /></span><p>Vuốt để khám phá<br /><b>tập tiếp theo</b></p></div>
        <p className="demo-label">Bản trải nghiệm · Video minh họa</p>
      </aside>

      <section className="player-wrap" aria-label="Trình xem phim dọc">
        <div className="video-feed" ref={scroller} onTouchStart={() => { scrollTarget.current = null; }} onWheel={() => { scrollTarget.current = null; }} onScroll={() => {
          const container = scroller.current;
          if (!container) return;
          if (scrollTarget.current !== null) {
            if (Math.abs(container.scrollTop - scrollTarget.current * container.clientHeight) > 2) return;
            scrollTarget.current = null;
          }
          const index = Math.max(0, Math.min(episodes.length - 1, Math.round(container.scrollTop / container.clientHeight)));
          if (index !== active) { videos.current[active]?.pause(); setPlaying(false); setActive(index); }
        }}>
          {episodes.map((item, index) => <article key={item.id} className="episode-slide" aria-label={`Tập ${item.id}: ${item.title}`} aria-hidden={index !== active}>
            <video ref={element => { videos.current[index] = element; }} src={(index === active || index === active + 1) && !item.isLocked ? item.src : undefined} poster={item.poster} playsInline muted={muted} preload={index === active ? "auto" : index === active + 1 && !item.isLocked ? "metadata" : "none"} disablePictureInPicture
              onTimeUpdate={event => { if (index === active) setProgress({ current: event.currentTarget.currentTime, duration: Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0 }); }}
              onLoadedMetadata={event => { if (index === active) setProgress({ current: 0, duration: event.currentTarget.duration }); }}
              onPlay={() => { if (index === active) { setPlaying(true); } }} onPause={() => { if (index === active) { setPlaying(false); setBuffering(false); } }}
              onWaiting={() => { if (index === active) setBuffering(true); }} onPlaying={() => { if (index === active) setBuffering(false); }}
              onError={() => { if (index === active && !item.isLocked) { setError(true); setBuffering(false); } }}
              onEnded={() => { if (index === active) { if (active < episodes.length - 1) goTo(active + 1); else notify("Bạn đã xem hết các tập hiện có."); } }} />
            <div className="video-shade" />
            {index === active && <>
              <button className="video-tap-target" aria-label={playing ? "Tạm dừng video" : "Phát video"} onClick={playFromGesture} />
              <div className="player-top"><Link href="/" aria-label="Quay lại Trang chủ" className="round-button mobile-back"><ChevronLeft size={23} /></Link><span className="episode-pill">TẬP {String(item.id).padStart(2, "0")} <span>/ {drama.totalEpisodes}</span></span><button className="round-button" aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"} onClick={() => setMuted(value => !value)}>{muted ? <VolumeX size={19} /> : <Volume2 size={19} />}</button></div>
              {item.isLocked ? <div className="center-message"><span className="lock-orb"><LockKeyhole size={28} /></span><h3>Câu chuyện còn tiếp…</h3><button className="start-button" onClick={() => setModal("unlock")}><LockKeyhole size={15} /> Mở khóa tập {item.id}</button></div>
                : (!started || needsTap || error || !playing) && <div className="center-message"><button className="big-play" aria-label={error ? "Thử tải lại video" : "Chạm để xem"} onClick={playFromGesture}><Play size={29} fill="currentColor" /></button><h3>{error ? "Chưa thể tải video" : !started ? "Một câu chuyện đang chờ bạn" : buffering ? "Đang tải video…" : needsTap ? "Chạm để tiếp tục" : "Đang tạm dừng"}</h3><button className="start-button" disabled={buffering && !error} onClick={playFromGesture}>{error ? "Thử lại" : buffering ? "Đang tải…" : !started ? "Chạm để xem" : "Tiếp tục xem"}<ChevronRight size={16} /></button>{!started && <p>Bật âm thanh để cảm nhận trọn vẹn</p>}</div>}
              {buffering && started && !episode.isLocked && !error && <span className="buffer-spinner" role="status" aria-label="Đang tải video" />}
              <div className="player-actions"><button className={liked ? "action-button is-liked" : "action-button"} aria-label={liked ? "Bỏ thích" : "Thả tim"} aria-pressed={liked} onClick={() => setLikes(items => liked ? items.filter(id => id !== item.id) : [...items, item.id])}><span><Heart size={25} fill={liked ? "currentColor" : "none"} /></span><small>{liked ? "12,9K" : "12,8K"}</small></button><button className="action-button" aria-label={`Mở danh sách ${drama.totalEpisodes} tập`} onClick={() => setModal("episodes")}><span><Grid2X2 size={24} /></span><small>Chọn tập</small></button></div>
              <div className="video-caption"><span className="original-label"><Sparkles size={10} /> PHIM NGẮN ĐỘC QUYỀN</span><h2>{drama.title}</h2><h3>Tập {String(item.id).padStart(2, "0")}: {item.title}</h3><p>{item.description}</p></div>
              <div className="player-bottom"><button className="play-small" aria-label={playing ? "Tạm dừng" : "Phát"} onClick={playFromGesture}>{playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}</button><span>{timestamp(progress.current)} <i>/ {timestamp(progress.duration)}</i></span><span className="quality">HD</span><button aria-label="Toàn màn hình" className="expand-button" onClick={() => { if (document.fullscreenElement) void document.exitFullscreen().catch(() => notify("Trình duyệt không hỗ trợ thao tác này.")); else if (scroller.current?.requestFullscreen) void scroller.current.requestFullscreen().catch(() => notify("Hãy xoay hoặc dùng chế độ toàn màn hình của trình duyệt.")); else notify("Trình xem đã tối ưu toàn màn hình trên thiết bị của bạn."); }}><Maximize size={15} /></button></div>
              <input className="video-progress" aria-label="Tua video" type="range" min="0" max="100" step="0.1" value={progress.duration ? progress.current / progress.duration * 100 : 0} disabled={item.isLocked || !progress.duration} style={{ "--progress": `${progress.duration ? progress.current / progress.duration * 100 : 0}%` } as React.CSSProperties} onChange={event => { const video = videos.current[active]; if (video && progress.duration) { video.currentTime = Number(event.target.value) / 100 * progress.duration; setProgress(value => ({ ...value, current: video.currentTime })); } }} />
            </>}
          </article>)}
        </div>
        <div className="outside-navigation"><button aria-label="Tập trước" disabled={active === 0} onClick={() => goTo(active - 1)}><ChevronUp size={22} /></button><span>{String(active + 1).padStart(2, "0")}<i>/ {String(episodes.length).padStart(2, "0")}</i></span><button aria-label="Tập tiếp theo" disabled={active === episodes.length - 1} onClick={() => goTo(active + 1)}><ChevronDown size={22} /></button></div>
        <div className="mobile-navigation"><button disabled={active === 0} aria-label="Tập trước" onClick={() => goTo(active - 1)}><ChevronUp size={20} /></button><button disabled={active === episodes.length - 1} aria-label="Tập tiếp theo" onClick={() => goTo(active + 1)}><ChevronDown size={20} /></button></div>
      </section>

      <aside className="episodes-panel"><div className="panel-title"><h2>Danh sách tập</h2><span>{drama.totalEpisodes} tập</span></div><p className="panel-subtitle">Một tập nữa, một bí mật được hé lộ.</p><div className="episode-tabs"><span>Tập 01 – {String(drama.totalEpisodes).padStart(2, "0")}</span><span className="free-label">{freeEpisodeCount} tập miễn phí</span></div><EpisodeGrid episodes={episodes} activeIndex={active} totalEpisodes={drama.totalEpisodes} onSelect={goTo} compact /><div className="episode-legend"><span><i className="legend-current" /> Đang xem</span><span><LockKeyhole size={10} /> Cần mở khóa</span></div><div className="coin-card"><div><span className="coin-symbol"><Coins size={20} /></span><h3>Đừng để câu chuyện dở dang</h3></div><p>Mở khóa tập mới chỉ với 30 xu.<br />Cảm xúc tiếp nối, không chờ đợi.</p><button onClick={() => setModal("topup")}>Nạp xu ngay <ChevronRight size={15} /></button></div><div className="safe-caption"><LockKeyhole size={11} /> Mở khóa một lần, xem lại bất cứ lúc nào.</div></aside>
    </div>
    <footer className="desktop-footer"><span>© 2026 ShortScene</span><span>Những câu chuyện nhỏ. Những cảm xúc lớn.</span><span>Được thiết kế để đắm chìm <span className="text-coral">✦</span></span></footer>

    <ModalShell open={modal !== null} drawer={modal === "episodes"} onClose={() => setModal(null)}>
      {modal === "episodes" && (
        <EpisodeDrawer freeEpisodeCount={freeEpisodeCount} dramaTitle={drama.title} episodes={episodes} activeIndex={active} totalEpisodes={drama.totalEpisodes} onSelect={goTo} />
      )}
      {modal === "unlock" && (
        <UnlockModal episode={episode} balance={balance} onUnlock={unlock} onTopup={() => setModal("topup")} />
      )}
      {modal === "topup" && (
        <TopupModal balance={balance} canGoBack={episode.isLocked} onBack={() => setModal("unlock")} onTopup={() => {
          setBalance(value => value + 100);
          setModal(episode.isLocked ? "unlock" : null);
          notify("Đã thêm 100 xu trải nghiệm vào tài khoản.");
        }} />
      )}
    </ModalShell>
    {toast && <div className="toast" role="status"><Check size={17} />{toast}</div>}
  </main>;
}
