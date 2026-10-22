export type Episode = {
  id: number;
  title: string;
  description: string;
  isLocked: boolean;
  price: number;
  src: string;
  poster: string;
};

export type Drama = {
  id: string;
  title: string;
  description: string;
  poster: string;
  totalEpisodes: number;
  tags: string[];
  views: number;
  isNew: boolean;
  featured: boolean;
  status: "Đang cập nhật" | "Trọn bộ";
  episodes: Episode[];
};

export type DramaSummary = Omit<Drama, "episodes">;
