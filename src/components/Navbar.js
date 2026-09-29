import React, { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';

const wa = 'https://wa.me/919940058091?text=Hi%20EVENTORA%2C%20I%20would%20like%20to%20discuss%20planning%20an%20event.';

export default function Navbar({ navigate }) {
  const [open, setOpen] = useState(false);
  const links = [['Home','home'],['Events','events'],['Services','services'],['Catering','catering'],['Our team','team'],['About','about']];
  const go = (path) => { setOpen(false); navigate(path); };
  return (
    <header className="nav">
      <button className="brand" onClick={() => go('home')} aria-label="Go to EVENTORA home">
        <span className="brandMark">E</span><span>EVENTORA</span>
      </button>
      <nav className={open ? 'open' : ''} aria-label="Primary navigation">
        {links.map(([label,path]) => <button key={path} onClick={() => go(path)}>{label}</button>)}
        <button className="mobilePlan" onClick={() => go('plan')}>Plan an event</button>
      </nav>
      <div className="navActions">
        <a className="navCta" href={wa} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Talk to us</a>
        <button className="planTop" onClick={() => go('plan')}>Plan an event</button>
      </div>
      <button className="mobileMenu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
    </header>
  );
}
