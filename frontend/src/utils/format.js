export function formatTime(t){
  if(!t) return '-';
  const m1 = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(t.trim());
  if(!m1) return t;
  const hh = String(Math.min(parseInt(m1[1],10),23)).padStart(2,'0');
  const mm = String(Math.min(parseInt(m1[2],10),59)).padStart(2,'0');
  const ss = m1[3] ? String(Math.min(parseInt(m1[3],10),59)).padStart(2,'0') : '00';
  return `${hh}:${mm}:${ss}`;
}

export function timeRange(s,e){
  if(!s && !e) return '-';
  return [formatTime(s)||'', e?(' - '+formatTime(e)):''].join('');
}

export function todayISO(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

export function formatDate(str) {
  if (!str) return '';
  const [d, m, y] = str.split('-');
  return `${d}-${m}-${y}`;
}