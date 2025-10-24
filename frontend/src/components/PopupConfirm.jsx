import React from 'react';
import '../styles/popup.css';

/**
 * Popup แจ้งเตือน (Modal)
 * type: 'complete' หรือ 'postpone'
 */
export default function PopupConfirm({ open, type, planid, onComplete, onPostpone, onCancel }) {
  if (!open) return null;

  // เลือกข้อความและ callback ตาม type
  const message =
    type === 'complete'
      ? 'ต้องการยืนยัน Complete รายการนี้?'
      : type === 'postpone'
        ? 'ต้องการยืนยัน Postpone รายการนี้?'
        : '';

  function handleConfirm() {
    if (type === 'complete' && onComplete) {
      onComplete(planid);
    } else if (type === 'postpone' && onPostpone) {
      onPostpone(planid);
    }
  }

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-message">{message}</div>
        <div className="popup-btns">
          <button className="popup-btn confirm" onClick={handleConfirm}>
            ยืนยัน
          </button>
          <button className="popup-btn cancel" onClick={onCancel}>
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}
