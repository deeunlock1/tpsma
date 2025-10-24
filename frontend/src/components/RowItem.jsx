import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { formatDate, timeRange, formatTime } from '../utils/format.js';
import { Icon } from './Icon.jsx';

function StatusBadge({ status }){
  if (!status) return null;
  const s = status.toLowerCase();
  if (s === 'upcoming') return <span className="badge-scheduled">Upcoming</span>;
  if (s === 'pending') return <span className="badge-wait">Pending</span>;
  if (s === 'complete') return <span className="badge-success">Complete</span>;
  return <span className="badge-wait">{status}</span>;
}

export function RowItem({ item, open, onToggle, activeTab, onComplete, onPostpone }){
  const [ripples, setRipples] = useState([]);
  const detailRef = useRef(null);
  const [maxH, setMaxH] = useState(0);

  useLayoutEffect(()=>{
    if(open && detailRef.current){
      setMaxH(detailRef.current.scrollHeight);
    } else setMaxH(0);
  },[open, item]);

  useEffect(()=>{
    if(ripples.length){
      const t = setTimeout(()=> setRipples(r=>r.slice(1)), 500);
      return ()=>clearTimeout(t);
    }
  },[ripples]);

  function handleClick(e){
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples(r=>[...r,{
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }]);
    onToggle();
  }

  return (
    <div className="row-wrap">
      <div
        className={"row" + (open ? ' is-open' : '')}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && handleClick(e)}
      >
        <div style={{position:'absolute',inset:0,overflow:'hidden'}}>
          {ripples.map(r=>(

            <span key={r.id} className="ripple" style={{left:r.x, top:r.y}} />
          ))}
        </div>

        {/* คอลัมน์ 1: Project Name */}
        <div className="cell">
          <div className="title-project" title={item.projectname || '-'}>{item.projectname || '-'}</div>
        </div>

        {/* คอลัมน์ 2: Account Name */}
        <div className="cell">
          <div className="text-account" title={item.accountname || '-'}>{item.accountname || '-'}</div>
        </div>

        {/* คอลัมน์ 3: Start Date (หรือ Status ถ้า complete) */}
        <div className="cell cell-meta">
          {activeTab === 'complete'
            ? <StatusBadge status={item.Status} />
            : (
              <span className="date-text" style={{wordBreak: 'break-word', fontSize: 'clamp(11px,2.4vw,14px)'}}>
                {formatDate(item.dateStart)}
              </span>
            )
          }
        </div>
      </div>

      <div
        className={"detail-anim"+(open?' open':'')}
        style={{maxHeight:open?maxH:0}}
        aria-hidden={!open}
      >
        <div ref={detailRef} className="detail">
          <div className="detail-box">
            <div className="stack">
              <div className="kv"><b>Engineer:</b> {item.engineers || '-'}</div>
              <div className="kv"><b>Start Date:</b> {formatDate(item.dateStart)}</div>
              <div className="kv"><b>End Date:</b> {item.dateEnd ? formatDate(item.dateEnd) : '-'}</div>
              <div className="kv"><b>Time Start:</b> {formatTime(item.timeStart)}</div>
              <div className="kv"><b>Time End:</b> {formatTime(item.timeEnd)}</div>
              {activeTab === 'complete' && (
                <>
                  <div className="kv"><b>Complete Date:</b> {item.dateSuccess ? formatDate(item.dateSuccess) : '-'}</div>
                  <div className="kv"><b>Completed By:</b> {item.completedBy || '-'}</div>
                </>
              )}
            </div>
            {activeTab === 'pending' && (
              <div className="btns flex flex-col sm:flex-row gap-2">
                <button
                  className="btn btn-success flex items-center justify-center gap-2"
                  onClick={e=>{ e.stopPropagation(); onComplete && onComplete(); }}
                >
                  <span className="flex items-center justify-center">
                    <Icon.Complete className="mr-2" width={16} height={16} />
                    <span className="text-center w-full">Complete</span>
                  </span>
                </button>
                <button
                  className="btn btn-warn flex items-center justify-center gap-2"
                  onClick={e=>{ e.stopPropagation(); onPostpone && onPostpone(); }}
                >
                  <span className="flex items-center justify-center">
                    <Icon.Clock className="mr-2" width={16} height={16} />
                    <span className="text-center w-full">Postpone</span>
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}