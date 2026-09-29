import React from 'react';
import EventCard from '../components/EventCard';
export default function EventsPage({ events, navigate }) {
  return <section className="page-shell"><div className="page-hero" style={{backgroundImage:"linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.92)),url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2200&q=90')"}}><div><p className="eyebrow">EVENTORA / EXPERIENCES</p><h1>Events designed around the moment.</h1><p>Explore the experiences we plan, produce and coordinate from first brief to final guest departure.</p></div></div><div className="content-section"><div className="section-heading"><p className="eyebrow">Explore</p><h2>Choose an event</h2><p>Tap any category for a dedicated experience page with services, planning approach and visual references.</p></div><div className="event-grid">{events.map(e=><EventCard key={e.slug} event={e} onClick={()=>navigate(`event/${e.slug}`)}/>)}</div></div></section>;
}
