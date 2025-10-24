import React, { useState } from 'react';
import './styles/login.css';

export default function Login({ onLogin }) {
  // สร้าง state สำหรับเก็บค่าชื่อผู้ใช้, รหัสผ่าน, error, และ loading
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
// ฟังก์ชัน handleSubmit จะถูกเรียกเมื่อ submit 
// ตรวจสอบ username/password ถ้าถูกจะเรียก Login
  function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    setTimeout(() => {
      if (user === 'admin' && pass === '1234') {
        setLoading(false);
        onLogin(user);
      } else {
        setErr('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        setLoading(false);
      }
    }, 800);
  }

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-header">
          <div className="login-avatar">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 16-4 16 0" />
            </svg>
          </div>
          <h2 className="login-title">เข้าสู่ระบบ</h2>
          <div className="login-divider"></div>
        </div>
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={user}
          onChange={e => setUser(e.target.value)}
          autoFocus
          disabled={loading}
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={pass}
          onChange={e => setPass(e.target.value)}
          disabled={loading}
        />
        {err && <div className="login-error">{err}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>
    </div>
  );
}