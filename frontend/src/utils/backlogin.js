import { useEffect, useRef } from 'react';

// custom hook สำหรับ auto logout
export default function useInactivityLogout(isLoggedIn, onLogout, timeout = 86400000) {
  const timerRef = useRef();

  useEffect(() => {
    if (!isLoggedIn) return;

    function resetTimer() {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onLogout();
      }, timeout);
    }

    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];
    events.forEach(ev => window.addEventListener(ev, resetTimer));
    resetTimer();

    return () => {
      clearTimeout(timerRef.current);
      events.forEach(ev => window.removeEventListener(ev, resetTimer));
    };
  }, [isLoggedIn, onLogout, timeout]);
}

// ฟังก์ชันช่วยอ่านค่า sessionStorage สำหรับ login
export function getSessionLogin() {
  return {
    isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
    user: sessionStorage.getItem('user') || ''
  };
}