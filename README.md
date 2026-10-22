# ShortScene · Next.js 14

Trình xem phim ngắn dọc cho Mobile Web, dùng App Router, React 18, TypeScript và Tailwind CSS.

```sh
cd frontend
npm ci
npm run dev
```

Mở http://localhost:3000. Các lệnh npm đều chạy từ `frontend/`. Kiểm tra production bằng `npm run build`, kiểm tra TypeScript bằng `npm run typecheck`.

`npm run dev` dùng Webpack (`next dev`), phù hợp với bản Next.js 14 hiện tại. Không dùng Turbopack beta vì đã gặp lỗi resolver, đọc cấu hình và panic trong bộ xử lý CSS. `npm run dev:webpack` là lệnh tương đương. Lần mở trang đầu tiên vẫn cần biên dịch; xem tiến trình trong terminal.

Dev dùng cache mới `.next-dev-webpack/`, tách biệt với cache Turbopack cũ và production. Không cần xóa cache cũ để chạy. Sau khi thay cấu hình hoặc script, dừng server bằng Ctrl+C rồi chạy lại. Chỉ chạy một dev server trong `frontend/` tại một thời điểm.

Ngoài cách chạy từ `frontend/`, thư mục gốc `Web_Phim/` có `package.json` chỉ chứa lệnh chuyển tiếp:

```sh
npm run setup      # Cài dependency trong frontend theo lockfile (chỉ khi cần)
npm run dev        # Chuyển tiếp vào frontend
```

Các lệnh `build`, `start`, `preview`, `typecheck` cũng dùng được từ thư mục gốc. Dependency và cấu hình ứng dụng vẫn nằm trong `frontend/`; `backend/` chưa có server.

Để xem bản tối ưu và tránh đợi biên dịch dev khi mở trang, dừng dev server (Ctrl+C), rồi chạy trong `frontend/`:

```sh
npm run preview
```

Lệnh này build một lần rồi phục vụ bằng `next start`. Những lần sau, nếu chưa sửa mã, chỉ cần `npm start`. Dev dùng `.next-dev-webpack/`, bản build dùng `.next-production/` để không ghi đè cache của nhau. Bản preview không tự cập nhật khi sửa code; cần build lại.

Nếu `Starting` hoặc `Compiling /` kéo dài nhiều phút, dừng server rồi cài lại dependency đúng lockfile bằng `npm ci` trong `frontend/`, sau đó chạy lại `npm run preview`. Trong lần chẩn đoán này, bộ dependency cũ bị chờ khi đọc file; cài lại đã giúp build và phục vụ trang bình thường. Không cần chạy `npm audit fix --force` để xử lý lỗi tải trang.

Dependency và build cache cũ ở thư mục gốc không được dùng cho ứng dụng frontend. Muốn cài dependency, chạy `npm run setup` ở gốc hoặc `npm ci` trong `frontend/`.

## Component

```text
Web_Phim/
├── frontend/
│   ├── src/
│   │   ├── app/                  # App Router, layout và CSS
│   │   ├── components/
│   │   │   ├── discover/         # Banner, hàng phim, Movie Card
│   │   │   ├── player/           # Trình phát và điều phối state
│   │   │   ├── modals/           # Mở khóa, nạp xu, chọn tập
│   │   │   └── ui/               # Dialog shell và lưới tập dùng chung
│   │   ├── types/drama.ts        # Episode, Drama
│   │   ├── data/mock-data.ts     # Danh mục 10 phim và tập riêng
│   │   ├── mocks/episodes.ts     # Export tương thích cho phim đầu tiên
│   │   └── lib/api-client.ts     # Fetch wrapper cho backend tương lai
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── next.config.mjs
│   ├── next-env.d.ts
│   ├── postcss.config.mjs
│   └── tailwind.config.ts
├── backend/.gitkeep
├── package.json                 # Chỉ chuyển tiếp lệnh vào frontend
├── .gitignore
└── README.md
```

`frontend/src/app/page.tsx` là trang Khám phá. `frontend/src/app/watch/[dramaId]/page.tsx` tìm phim theo URL và truyền prop `drama` vào client component `frontend/src/components/player/short-drama-player.tsx`. Giao diện được định nghĩa trong `frontend/src/app/globals.css`. Alias `@/*` trỏ đến `frontend/src/*`.

`UnlockModal`, `TopupModal` và `EpisodeDrawer` nhận dữ liệu/callback từ player; `ModalShell` giữ một native dialog để quản lý focus và chuyển nội dung. Logic phát video, chuyển tập, trừ/cộng xu ở player; không cần thêm hook chỉ để bọc lại logic hiện có.

- Cuộn dọc native, scroll snap, nút trước/sau và phím ↑/↓; cập nhật vị trí khi xoay màn hình.
- Chiều cao `100dvh`, `overscroll-behavior-y: contain`, `touch-action: pan-y`, safe area iPhone.
- Video đang xem phát inline và được tải trước. Tập miễn phí liền sau chỉ nạp metadata để giảm thời gian chờ khi vuốt; các video còn lại dừng. Tập khóa không được gắn nguồn video. Nếu chờ phát quá 12 giây, player hiện nút thử lại.
- Nút “Chạm để xem” gọi `play()` ngay trong thao tác người dùng. Nếu Safari vẫn chặn phát khi chuyển tập, hiện nút chạm để tiếp tục. Rời tab sẽ dừng video.
- Mỗi phim có 3 tập đầu miễn phí, các tập còn lại khóa giá 30 xu; số dư ban đầu 30 xu. Nạp 100 xu là thao tác mô phỏng, không thanh toán thật.
- Like theo từng tập, drawer hiển thị đúng số tập của phim đang xem, progress có thể tua, tự chuyển tập khi phát hết.
- Dialog native quản lý focus, Escape và ngăn thao tác nền. Tôn trọng reduced motion.

## Cấu hình API tương lai

Nếu cần cấu hình môi trường, sao chép `frontend/.env.example` thành `frontend/.env.local`. Hiện tại `NEXT_PUBLIC_API_URL` để trống và giao diện chỉ dùng mock data. Khi có backend, đặt ví dụ `NEXT_PUBLIC_API_URL=http://localhost:4000/api` rồi khởi động lại Next.js.

`apiClient<T>("/episodes", options)` chỉ gửi request khi được gọi; chưa được nối vào player. Client gửi Accept JSON, giữ nguyên các tùy chọn fetch, ném `ApiError` với HTTP status nếu request thất bại và trả `undefined` với HTTP 204. Khi gửi JSON, truyền `JSON.stringify(...)` cùng header `Content-Type: application/json`. Biến `NEXT_PUBLIC_*` công khai trên trình duyệt, không dùng chứa secret. `backend/` chỉ có `.gitkeep`, chưa có server hoặc database.

## Dữ liệu và tích hợp thật

MP4 mẫu từ W3C và MDN được lưu tại `frontend/public/videos/`, poster Unsplash nằm ở `frontend/public/images/drama-poster.jpg`. Player tải toàn bộ media từ localhost, không gọi máy chủ video hoặc ảnh bên ngoài khi test. Nguồn được ghi trong `frontend/public/videos/README.md`. Đây là video minh họa, không phải nội dung phim kể trong UI; Có thể thay URL bằng MP4 dọc 9:16 do bạn sở hữu. Bản này dùng MP4 để chạy trực tiếp trên Safari/Chrome, không cần HLS.js.

Xu, lượt thích và trạng thái mở khóa chỉ tồn tại trong bộ nhớ của player; tải lại hoặc đổi phim sẽ đặt về mặc định. Player được gắn key theo drama ID để không lẫn trạng thái giữa các phim. Khi tích hợp thật, máy chủ phải kiểm tra số dư/quyền truy cập và xử lý giao dịch nguyên tử, sau đó mới cấp signed URL cho tập trả phí. Khóa ở client chỉ phục vụ demo.

Kiểm thử trên thiết bị Safari iOS thật: chạm phát có âm thanh, vuốt tập 1→2→3→4, đóng/mở paywall, mở khóa tập 4 rồi nạp xu cho tập 5, xoay màn hình và chuyển tab. Chính sách autoplay tùy thiết bị, nên luôn giữ nút phát dự phòng.

## Giới hạn phiên bản

Giữ Next.js 14 theo yêu cầu. `npm audit --omit=dev` phát hiện cảnh báo critical ở Next.js 14.2.35 và high ở PostCSS đi kèm; bản sửa yêu cầu nâng major Next.js. Cần nâng framework lên bản đã vá trước khi triển khai máy chủ production.

## Danh mục nhiều phim

- Nguồn dữ liệu duy nhất: `frontend/src/data/mock-data.ts`, với `MOCK_DRAMAS`, `getDramaById`, `getDramaSummaries` và `DRAMA_CATEGORIES`.
- 10 phim, mỗi phim có ID, mô tả, poster local, thể loại và danh sách 30–60 tập riêng. Ba MP4 demo local được dùng lại, chưa phải video riêng được sản xuất cho từng phim/tập.
- Trang `/`: banner nổi bật vuốt ngang, Top 10, phim mới và bốn hàng Tổng tài / Báo thù / Trọng sinh / Xuyên không. Dùng nút mũi tên hoặc vuốt để cuộn; hỗ trợ bàn phím và reduced motion.
- Trang `/watch/bi-mat-sau-loi-hua` (và ID của các phim khác): giữ toàn bộ player hiện có. Nút Back trên desktop/mobile dẫn về `/`.
- Các trang xem được prerender bằng `generateStaticParams`. ID không có trong danh mục trả 404 với liên kết về Trang chủ. Sau khi thêm phim vào mock data, build lại bản production.
- Client của trang Khám phá chỉ nhận metadata tóm tắt, không nhận toàn bộ danh sách tập. Poster lazy load, banner đầu được ưu tiên; không có request ảnh/video bên ngoài khi sử dụng.
- CSS riêng của danh mục ở `frontend/src/app/discover.css`; CSS player ở `globals.css`.

Sau khi sửa mã, chạy `npm run dev` để xem thay đổi tự động, hoặc dừng bản production rồi chạy `npm run preview` để build và phục vụ bản mới. Không chạy hai server trên cùng cổng.
