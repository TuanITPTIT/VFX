import Link from "next/link";
import { ArrowLeft, Film } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <Film size={40} className="text-coral" />
      <p className="dialog-eyebrow">CÂU CHUYỆN NÀY CHƯA CÓ Ở ĐÂY</p>
      <h1>Không tìm thấy phim</h1>
      <p>Bộ phim hoặc trang bạn tìm hiện không có trong danh mục.</p>
      <Link href="/" className="catalog-cta"><ArrowLeft size={17} /> Quay lại Trang chủ</Link>
    </main>
  );
}
