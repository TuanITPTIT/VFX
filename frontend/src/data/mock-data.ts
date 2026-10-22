import type { Drama, DramaSummary, Episode } from "@/types/drama";

type DramaSeed = Omit<Drama, "episodes"> & { chapters: string[] };

const seeds: DramaSeed[] = [
  {
    "id": "bi-mat-sau-loi-hua",
    "title": "Bí mật sau lời hứa",
    "description": "Một lời hứa năm xưa. Hai số phận gặp lại. Và những bí mật chưa từng ngủ yên phía sau một gia tộc quyền lực.",
    "poster": "/images/drama-poster.jpg",
    "totalEpisodes": 50,
    "tags": [
      "Tổng tài",
      "Tình cảm",
      "Bí ẩn"
    ],
    "views": 2860000,
    "isNew": false,
    "featured": true,
    "status": "Đang cập nhật",
    "chapters": [
      "Cuộc gặp định mệnh",
      "Lời hứa năm ấy",
      "Bí mật gia tộc",
      "Sự thật sau lời nói dối",
      "Lựa chọn của trái tim",
      "Người đứng sau bức thư"
    ]
  },
  {
    "id": "tro-lai-de-bao-thu",
    "title": "Trở lại để báo thù",
    "description": "Sống lại vào đúng ngày bị phản bội, An Nhiên quyết định viết lại kết cục. Lần này, người đặt ra luật chơi là cô.",
    "poster": "/images/posters/revenge.jpg",
    "totalEpisodes": 48,
    "tags": [
      "Báo thù",
      "Trọng sinh"
    ],
    "views": 2410000,
    "isNew": true,
    "featured": true,
    "status": "Trọn bộ",
    "chapters": [
      "Ngày trở về",
      "Đám cưới bị hủy",
      "Bằng chứng đầu tiên",
      "Đổi vai",
      "Cái giá của sự phản bội",
      "Nước cờ cuối"
    ]
  },
  {
    "id": "xuyen-khong-gap-chan-ai",
    "title": "Xuyên không gặp chân ái",
    "description": "Một cô gái hiện đại tỉnh dậy giữa hoàng cung xa lạ. Muốn tìm đường về nhà, cô phải bắt tay với vị vương gia lạnh lùng nhất kinh thành.",
    "poster": "/images/posters/palace.jpg",
    "totalEpisodes": 36,
    "tags": [
      "Xuyên không",
      "Cổ trang",
      "Tình cảm"
    ],
    "views": 2130000,
    "isNew": true,
    "featured": true,
    "status": "Đang cập nhật",
    "chapters": [
      "Tỉnh giấc ở hoàng cung",
      "Giao kèo với vương gia",
      "Dạ tiệc định mệnh",
      "Mật thư trong tay áo",
      "Đêm trăng hẹn ước",
      "Cánh cửa thời gian"
    ]
  },
  {
    "id": "hon-nhan-hop-dong",
    "title": "Hôn nhân hợp đồng",
    "description": "Một bản hợp đồng hôn nhân có thời hạn sáu tháng. Điều khoản duy nhất cả hai không lường trước: không được yêu đối phương.",
    "poster": "/images/posters/contract.jpg",
    "totalEpisodes": 42,
    "tags": [
      "Tổng tài",
      "Tình cảm"
    ],
    "views": 1980000,
    "isNew": false,
    "featured": false,
    "status": "Trọn bộ",
    "chapters": [
      "Chữ ký bất ngờ",
      "Về chung một nhà",
      "Bữa tối đầu tiên",
      "Người cũ trở lại",
      "Điều khoản bị phá vỡ",
      "Sau sáu tháng"
    ]
  },
  {
    "id": "thien-kim-tro-lai",
    "title": "Thiên kim trở lại",
    "description": "Bị đánh cắp thân phận từ nhỏ, cô trở về giữa cuộc tranh giành thừa kế. Một cuộc đời mới bắt đầu từ quyết định không cúi đầu.",
    "poster": "/images/posters/heiress.jpg",
    "totalEpisodes": 60,
    "tags": [
      "Trọng sinh",
      "Tổng tài",
      "Báo thù"
    ],
    "views": 1760000,
    "isNew": true,
    "featured": false,
    "status": "Đang cập nhật",
    "chapters": [
      "Trở về biệt thự",
      "Hai người thừa kế",
      "Chiếc vòng năm xưa",
      "Bữa tiệc giông bão",
      "Lật ngược thế cờ",
      "Tên thật của tôi"
    ]
  },
  {
    "id": "nang-den-tu-tuong-lai",
    "title": "Nàng đến từ tương lai",
    "description": "Lạc về quá khứ với một chiếc điện thoại sắp hết pin, Linh dùng kiến thức tương lai để mở quán nhỏ và vô tình thay đổi vận mệnh cả kinh thành.",
    "poster": "/images/posters/future.jpg",
    "totalEpisodes": 40,
    "tags": [
      "Xuyên không",
      "Hài hước",
      "Tình cảm"
    ],
    "views": 1540000,
    "isNew": true,
    "featured": false,
    "status": "Đang cập nhật",
    "chapters": [
      "Một phần trăm pin",
      "Quán nhỏ đầu ngõ",
      "Vị khách khó tính",
      "Món ăn từ tương lai",
      "Lời đồn trong thành",
      "Tín hiệu trở về"
    ]
  },
  {
    "id": "hen-em-mua-ha-cu",
    "title": "Hẹn em mùa hạ cũ",
    "description": "Bảy năm sau mùa hè cuối cấp, hai người gặp lại trong một chuyến tàu muộn. Lá thư chưa gửi liệu có còn một người chờ đọc?",
    "poster": "/images/posters/summer.jpg",
    "totalEpisodes": 30,
    "tags": [
      "Tình cảm",
      "Thanh xuân"
    ],
    "views": 1390000,
    "isNew": true,
    "featured": false,
    "status": "Trọn bộ",
    "chapters": [
      "Chuyến tàu muộn",
      "Ghế trống bên cửa sổ",
      "Lá thư trong ngăn bàn",
      "Lời hẹn bỏ quên",
      "Cơn mưa cuối hạ",
      "Chúng ta của hôm nay"
    ]
  },
  {
    "id": "mat-na-trong-dem",
    "title": "Mặt nạ trong đêm",
    "description": "Một vụ mất tích, một nhân chứng im lặng và những bức ảnh không nên tồn tại. Nữ phóng viên lần theo sự thật đang bị cả thành phố che giấu.",
    "poster": "/images/posters/midnight.jpg",
    "totalEpisodes": 45,
    "tags": [
      "Báo thù",
      "Bí ẩn"
    ],
    "views": 1210000,
    "isNew": false,
    "featured": false,
    "status": "Trọn bộ",
    "chapters": [
      "Cuộc gọi lúc nửa đêm",
      "Bức ảnh thứ mười ba",
      "Nhân chứng im lặng",
      "Theo dấu người lạ",
      "Thành phố không ngủ",
      "Sau lớp mặt nạ"
    ]
  },
  {
    "id": "yeu-nham-sep-lanh-lung",
    "title": "Yêu nhầm sếp lạnh lùng",
    "description": "Một tin nhắn gửi nhầm đưa cô thực tập sinh vào tầm ngắm của vị sếp khó tính. Những ngày tăng ca bỗng trở nên khó đoán hơn bao giờ hết.",
    "poster": "/images/posters/boss.jpg",
    "totalEpisodes": 32,
    "tags": [
      "Tổng tài",
      "Hài hước",
      "Tình cảm"
    ],
    "views": 1060000,
    "isNew": true,
    "featured": false,
    "status": "Đang cập nhật",
    "chapters": [
      "Tin nhắn gửi nhầm",
      "Ngày đầu đi làm",
      "Cuộc họp bất ngờ",
      "Tăng ca cùng sếp",
      "Một lời quan tâm",
      "Không chỉ là đồng nghiệp"
    ]
  },
  {
    "id": "phuong-hoang-tai-sinh",
    "title": "Phượng hoàng tái sinh",
    "description": "Từ người bị lưu đày thành nữ chủ nhân của kinh thành, nàng trở lại để đòi công bằng cho gia tộc và tìm lời giải cho ký ức kiếp trước.",
    "poster": "/images/posters/phoenix.jpg",
    "totalEpisodes": 38,
    "tags": [
      "Trọng sinh",
      "Cổ trang",
      "Báo thù"
    ],
    "views": 980000,
    "isNew": false,
    "featured": false,
    "status": "Trọn bộ",
    "chapters": [
      "Tro tàn ký ức",
      "Ngày rời lãnh cung",
      "Chiếc trâm phượng",
      "Đồng minh trong bóng tối",
      "Đối mặt quân vương",
      "Bình minh mới"
    ]
  }
];

// Each drama owns its episode objects. The three MP4s are shared local demo clips.
function createEpisodes(seed: DramaSeed, dramaIndex: number): Episode[] {
  const videos = ["/videos/sintel.mp4", "/videos/bunny.mp4", "/videos/flower.mp4"];
  return Array.from({ length: seed.totalEpisodes }, (_, index) => {
    const chapter = seed.chapters[index % seed.chapters.length];
    const part = Math.floor(index / seed.chapters.length) + 1;
    const title = part === 1 ? chapter : `${chapter} · Phần ${part}`;
    return {
      id: index + 1, title,
      description: `${title}. Một bước ngoặt mới trong câu chuyện ${seed.title.toLocaleLowerCase("vi-VN")}.`,
      isLocked: index >= 3, price: index >= 3 ? 30 : 0,
      src: videos[(dramaIndex + index) % videos.length], poster: seed.poster,
    };
  });
}

export const MOCK_DRAMAS: Drama[] = seeds.map((seed, index) => {
  const { chapters: _chapters, ...drama } = seed;
  return { ...drama, episodes: createEpisodes(seed, index) };
});

export const DRAMA_CATEGORIES = ["Tổng tài", "Báo thù", "Trọng sinh", "Xuyên không"] as const;

export function getDramaById(id: string): Drama | undefined {
  return MOCK_DRAMAS.find(drama => drama.id === id);
}

// Avoid shipping hundreds of episode objects to discovery components.
export function getDramaSummaries(): DramaSummary[] {
  return MOCK_DRAMAS.map(({ episodes: _episodes, ...summary }) => summary);
}
