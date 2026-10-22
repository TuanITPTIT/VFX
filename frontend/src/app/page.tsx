import Link from "next/link";
import { ArrowUpRight, Clapperboard, Flame, Play, Sparkles } from "lucide-react";
import FeaturedCarousel from "@/components/discover/featured-carousel";
import MovieRow from "@/components/discover/movie-row";
import { DRAMA_CATEGORIES, getDramaSummaries } from "@/data/mock-data";

const categoryIds = ["tong-tai", "bao-thu", "trong-sinh", "xuyen-khong"];
const categoryDescriptions = [
  "Những cuộc gặp gỡ làm trái tim lỡ nhịp.",
  "Khi người viết lại kết cục chính là bạn.",
  "Một cơ hội nữa để sống cuộc đời mình muốn.",
  "Bước qua thời gian, chạm vào một duyên phận khác.",
];

export default function Home() {
  const dramas = getDramaSummaries();
  return (
    <main className="discovery-page" id="top">
      <header className="catalog-header">
        <Link href="/" className="brand" aria-label="ShortScene trang chủ"><span className="brand-mark"><Play size={18} fill="currentColor" /></span>shortscene<span className="brand-dot">.</span></Link>
        <nav aria-label="Điều hướng khám phá"><a href="#top" aria-current="page">Khám phá</a><a href="#trending">Thịnh hành</a><a href="#new-releases">Phim mới</a></nav>
        <span className="catalog-header-note"><span /> Một phút đắm chìm.</span>
      </header>

      <div className="catalog-content">
        <div className="discovery-intro"><span><Clapperboard size={14} /> THẾ GIỚI PHIM NGẮN CỦA BẠN</span><p>Câu chuyện nhỏ. Cảm xúc lớn.</p></div>
        <FeaturedCarousel dramas={dramas.filter(drama => drama.featured)} />
        <nav className="category-bar" aria-label="Chủ đề phim">
          <a href="#trending" className="category-all"><Sparkles size={14} /> Dành cho bạn</a>
          {DRAMA_CATEGORIES.map((category, index) => <a key={category} href={`#${categoryIds[index]}`}>{category}<ArrowUpRight size={12} /></a>)}
          <span className="category-hint"><Flame size={13} /> Chuyện hay không chờ đợi</span>
        </nav>

        <MovieRow id="trending" title="Top 10 thịnh hành" subtitle="Những câu chuyện đang khiến mọi người không thể rời mắt." dramas={[...dramas].sort((a, b) => b.views - a.views).slice(0, 10)} ranked />
        <MovieRow id="new-releases" title="Phim mới lên sóng" subtitle="Vừa cập bến. Sẵn sàng cho một cuộc gặp mới?" dramas={dramas.filter(drama => drama.isNew)} />
        {DRAMA_CATEGORIES.map((category, index) => <MovieRow key={category} id={categoryIds[index]} title={`Phim ${category.toLocaleLowerCase("vi-VN")}`} subtitle={categoryDescriptions[index]} dramas={dramas.filter(drama => drama.tags.includes(category))} />)}

        <div className="catalog-endnote"><span className="brand-mark"><Play size={15} fill="currentColor" /></span><p>Một tập nữa thôi?<br /><span>Câu chuyện tiếp theo đang chờ bạn.</span></p><a href="#top">Về đầu trang ↑</a></div>
      </div>
      <footer className="catalog-footer"><span>© 2026 ShortScene</span><span>Những câu chuyện nhỏ. Những cảm xúc lớn.</span><span>Made for your next moment <span className="text-coral">✦</span></span></footer>
    </main>
  );
}
