import React from 'react';
import '../styles/popup.css';

export default function LogoutConfirm({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-message">คุณต้องการออกจากระบบใช่หรือไม่?</div>
        <div className="popup-btns">
          <button className="popup-btn confirm" onClick={onConfirm}>ยืนยัน</button>
          <button className="popup-btn cancel" onClick={onCancel}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
}