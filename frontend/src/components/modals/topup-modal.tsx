"use client";

import { ArrowLeft, Coins, Plus } from "lucide-react";

type TopupModalProps = {
  balance: number;
  canGoBack: boolean;
  onBack: () => void;
  onTopup: () => void;
};

export default function TopupModal({ balance, canGoBack, onBack, onTopup }: TopupModalProps) {
  return (
    <>
      <span className="modal-icon gold"><Coins size={31} /></span>
      <span className="dialog-eyebrow">THÊM XU, THÊM CẢM XÚC</span>
      <h2 id="dialog-title">Nạp xu vào tài khoản</h2>
      <p className="dialog-description">Số dư hiện tại: <strong>{balance} xu</strong></p>
      <div className="topup-package">
        <span><Coins size={24} /><b>100 xu</b></span>
        <span className="demo-badge">GÓI TRẢI NGHIỆM</span>
      </div>
      <p className="topup-note">Nạp xu mô phỏng để trải nghiệm mở khóa tập phim. Không phát sinh thanh toán.</p>
      <button className="primary-button" onClick={onTopup}><Plus size={17} /> Nhận 100 xu miễn phí</button>
      {canGoBack && <button className="secondary-button" onClick={onBack}><ArrowLeft size={15} /> Quay lại mở khóa</button>}
    </>
  );
}
