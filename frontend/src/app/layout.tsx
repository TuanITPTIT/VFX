import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./discover.css";

export const metadata: Metadata = {
  title: "ShortScene — Khám phá phim ngắn",
  description: "Một phút đắm chìm. Ngàn cảm xúc. Khám phá câu chuyện tiếp theo cùng ShortScene.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0c0c0f" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
