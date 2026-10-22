"use client";

import { Coins, LockKeyhole, Plus } from "lucide-react";
import type { Episode } from "@/types/drama";

type UnlockModalProps = {
  episode: Episode;
  balance: number;
  onUnlock: () => void;
  onTopup: () => void;
};

export default function UnlockModal({ episode, balance, onUnlock, onTopup }: UnlockModalProps) {
  return (
    <>
      <span className="modal-icon"><LockKeyhole size={29} /></span>
      <span className="dialog-eyebrow">CÂU CHUYỆN CÒN TIẾP</span>
      <h2 id="dialog-title">Mở khóa tập tiếp theo</h2>
      <p className="dialog-description">Tập {String(episode.id).padStart(2, "0")}: {episode.title}</p>
      <div className="price-line"><span>Giá mở khóa</span><b><Coins size={17} /> {episode.price} xu</b></div>
      <div className="price-line balance-line"><span>Số dư của bạn</span><b>{balance} xu</b></div>
      {balance < episode.price && <p className="insufficient">Bạn cần thêm {episode.price - balance} xu để mở khóa tập này.</p>}
      <button className="primary-button" onClick={onUnlock}><LockKeyhole size={16} /> Mở khóa · {episode.price} xu</button>
      <button className="secondary-button" onClick={onTopup}><Plus size={16} /> Nạp xu</button>
      <p className="modal-note">Mở khóa một lần, xem lại không giới hạn.</p>
    </>
  );
}
