export const Icon = {
  Search: (p)=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20" {...p}>
      <circle cx="11" cy="11" r="7" strokeWidth="2" stroke="currentColor"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" stroke="currentColor"/>
    </svg>
  ),
  Calendar:(p)=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2"/>
      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
    </svg>
  ),
  Clock:(p)=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
      <polyline points="12 6 12 12 16 14" strokeWidth="2" fill="none"/>
    </svg>
  ),
  Check:(p)=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...p}>
      <polyline points="20 6 9 17 4 12" strokeWidth="2" fill="none"/>
    </svg>
  ),
  ArrowDown: (p) => (
    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18" {...p}>
      <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20" {...p}>
      <circle cx="12" cy="8.5" r="4.5" strokeWidth="2" />
      <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" strokeWidth="2" />
    </svg>
  ),
  Logout: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20" {...p}>
      <path d="M16 17l5-5-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 4v16" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Complete: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20" {...p}>
      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
      <polyline points="9 12 12 15 17 10" strokeWidth="2" fill="none"/>
    </svg>
  ),
  Postpone: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20" {...p}>
      <path d="M18 6L6 18" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};