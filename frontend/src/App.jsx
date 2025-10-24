import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Icon } from './components/Icon.jsx';
import { RowItem } from './components/RowItem.jsx';
import PopupConfirm from './components/PopupConfirm.jsx';
import LogoutConfirm from './components/LogoutConfirm.jsx';
import { mockData } from './data/mockData.js';
import Login from './login.jsx';
import backlogin, { getSessionLogin } from './utils/backlogin';

// กำหนดชื่อแท็บ
const TAB_TITLES = {
  upcoming: 'Upcoming Projects',
  pending: 'Pending Projects',
  complete: 'Completed Projects',
};
// ฟังก์ชันอยู่ในรูปแบบวัน-เดือน-ปี
function todayISO() {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
//ฟังก์ชั่นดึงข้อมูลจำลองทุกครั้งที่reset
function cloneMock() {
  return JSON.parse(JSON.stringify(mockData));
}
//ฟังก์ชันนี้ใช้แปลงวันที่ที่เป็นข้อความ d/m/y ให้กลายเป็น Date object
function sortDMY(str) {
  if (!str) return new Date(0);
  const [d, m, y] = str.split('-');
  return new Date(Number(y), Number(m) - 1, Number(d));
}

// --- Main App Component ---
export default function App() {
  // State
  const [lists, setLists] = useState(() => cloneMock());
  const [activeTab, setActiveTab] = useState('upcoming');
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState('');

  // PopupConfirm state
  const [popup, setPopup] = useState({ open: false, type: '', planid: null });
  const [logoutPopup, setLogoutPopup] = useState(false);

  // อ่านค่าเริ่มต้นจาก sessionStorage ด้วย getSessionLogin
  const session = getSessionLogin();
  const [isLoggedIn, setIsLoggedIn] = useState(session.isLoggedIn);
  const [user, setUser] = useState(session.user);

  const [showMenu, setShowMenu] = useState(false);
  const userBoxRef = useRef(null);
  const menuRef = useRef(null);

  // --- Effects ---

  // Sync login state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
    sessionStorage.setItem('user', user || '');
  }, [isLoggedIn, user]);

  backlogin(isLoggedIn, () => {
    setIsLoggedIn(false);
    setUser('');
    setShowMenu(false);
    setLists(cloneMock());
  }, 300000); // 5 นาที 

  // จัดตำแหน่งเมนู logout ให้ลอยใต้ user box เสมอ
  useEffect(() => {
    if (showMenu && userBoxRef.current && menuRef.current) {
      const rect = userBoxRef.current.getBoundingClientRect();
      menuRef.current.style.position = 'fixed';
      menuRef.current.style.top = `${rect.bottom + 4}px`;
      menuRef.current.style.left = `${rect.right - menuRef.current.offsetWidth}px`;
      menuRef.current.style.zIndex = 2000;
    }
  }, [showMenu]);

  // จัดเรียงข้อมูลก่อน filter
  const data = useMemo(() => {
    let arr = [...(lists[activeTab] || [])];
    if (activeTab === 'complete') {
      arr.sort((a, b) => sortDMY(b.dateSuccess) - sortDMY(a.dateSuccess));
    } else {
      arr.sort((a, b) => sortDMY(a.dateStart) - sortDMY(b.dateStart));
    }
    return arr;
  }, [lists, activeTab]);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const k = search.toLowerCase();
    return data.filter(d =>
      (d.projectname || '').toLowerCase().includes(k) ||
      (d.accountname || '').toLowerCase().includes(k) ||
      (d.engineers || '').toLowerCase().includes(k)
    );
  }, [search, data]);

  // --- Handlers ---

  function handleComplete(id) {
    setPopup({ open: true, type: 'complete', planid: id });
  }

  function handlePostpone(id) {
    setPopup({ open: true, type: 'postpone', planid: id });
  }

  // ฟังก์ชันสำหรับ PopupConfirm
  function handlePopupComplete(id) {
    setLists(prev => {
      const pending = [...prev.pending];
      const idx = pending.findIndex(i => i.planid === id);
      if (idx === -1) return prev;
      const moved = {
        ...pending[idx],
        Status: 'complete',
        dateSuccess: todayISO(),
        completedBy: user,
      };
      pending.splice(idx, 1);
      return {
        ...prev,
        pending,
        complete: [...prev.complete, moved],
      };
    });
    setOpenId(null);
    setActiveTab('complete');
    setPopup({ open: false, type: '', planid: null });
  }

  function handlePopupPostpone(id) {
    setLists(prev => ({
      ...prev,
      pending: prev.pending.filter(i => i.planid !== id),
    }));
    setOpenId(null);
    setPopup({ open: false, type: '', planid: null });
  }

  function handleCancelPopup() {
    setPopup({ open: false, type: '', planid: null });
  }

  function closeDetail() {
  setOpenId(null);
}

function switchTab(tab) {
  setActiveTab(tab);
  closeDetail();
}

  // ฟังก์ชัน logout สำหรับ LogoutConfirm
  function handleLogoutConfirm() {
    setIsLoggedIn(false);
    setUser('');
    setLists(cloneMock());
    setShowMenu(false);
    setLogoutPopup(false);
  }
  function handleCancelLogout() {
    setLogoutPopup(false);
  }

  // --- Render ---
  if (!isLoggedIn) {
    return (
      <Login onLogin={u => {
        setUser(u);
        setIsLoggedIn(true);
        setActiveTab('upcoming'); 
      }} />
    );
  }

  return (
    <div className="page responsive-page">
      <header className="header flex justify-between items-end">
        <div className="header-left flex flex-col gap-2">
          <h1 className="title">{TAB_TITLES[activeTab]}</h1>
          <p className="subtitle">วันนี้ {todayISO()}</p>
        </div>
        <div className="relative">
          <button
            className="user-box"
            ref={userBoxRef}
            onClick={() => setShowMenu(v => !v)}
            tabIndex={0}
          >
            <span style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
              <Icon.User />
            </span>
            {user}
            <span className={`user-menu-arrow${showMenu ? ' open' : ''}`}>
              <Icon.ArrowDown />
            </span>
          </button>
          {showMenu && (
            <div
              className={`user-menu-dropdown${showMenu ? ' open' : ''}`}
              ref={menuRef}
              style={{ minWidth: 140 }}
            >
              <button className="user-menu-logout flex items-center gap-2" onClick={() => setLogoutPopup(true)}>
                <Icon.Logout width={18} height={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="card">
        <div className="search-wrap">
          <span className="search-icon">
            <Icon.Search />
          </span>
          <input
            className="search-input"
            placeholder="ค้นหา project / account / engineer"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="table">
          <div className="thead">
            <div>Project Name</div>
            <div>Account Name</div>
            <div>{activeTab === 'complete' ? 'Status' : 'Start Date'}</div>
          </div>

          {filtered.length === 0 && <div className="state">ไม่พบข้อมูล</div>}

          {filtered.map(item => (
            <RowItem
              key={item.planid}
              item={item}
              open={openId === item.planid}
              activeTab={activeTab}
              onToggle={() => setOpenId(o => (o === item.planid ? null : item.planid))}
              onComplete={() => handleComplete(item.planid)}
              onPostpone={() => handlePostpone(item.planid)}
            />
          ))}
        </div>
      </div>
      {/* PopupConfirm */}
      <PopupConfirm
        open={popup.open}
        type={popup.type}
        planid={popup.planid}
        onComplete={handlePopupComplete}
        onPostpone={handlePopupPostpone}
        onCancel={handleCancelPopup}
      />

      {/* LogoutConfirm popup */}
      <LogoutConfirm
        open={logoutPopup}
        onConfirm={handleLogoutConfirm}
        onCancel={handleCancelLogout}
      />

      <footer className="footer">
        <div className="footer-inner">
          <button
            className={"pill" + (activeTab === 'upcoming' ? ' active' : '')}
            onClick={() => switchTab('upcoming')}
          >
            <Icon.Calendar />
            <small>Upcoming</small>
          </button>
          <button
            className={"pill" + (activeTab === 'pending' ? ' active' : '')}
            onClick={() => switchTab('pending')}
          >
            <Icon.Clock />
            <small>Pending</small>
          </button>
          <button
            className={"pill" + (activeTab === 'complete' ? ' active' : '')}
            onClick={() => switchTab('complete')}
          >
            <Icon.Check />
            <small>Complete</small>
          </button>
        </div>
      </footer>
    </div>
  );
}
