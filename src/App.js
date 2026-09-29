import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventsPage from './pages/EventsPage';
import ServicesPage from './pages/ServicesPage';
import CateringPage from './pages/CateringPage';
import EventPage from './pages/EventPage';
import TeamPage from './pages/TeamPage';
import AboutPage from './pages/AboutPage';
import PlanPage from './pages/PlanPage';
import { events, corporateClients, team } from './data/siteData';

const normalize = (hash) => {
  const value = (hash || '#/').replace(/^#\/?/, '').replace(/\/$/, '');
  return value || 'home';
};

export default function App() {
  const [route, setRoute] = useState(normalize(window.location.hash));
  const [selectedCatering, setSelectedCatering] = useState(null);
  const [initialType, setInitialType] = useState('Corporate Events');

  useEffect(() => {
    const onHash = () => setRoute(normalize(window.location.hash));
    window.addEventListener('hashchange', onHash);
    onHash();
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (path) => {
    const clean = path.replace(/^#\/?/, '');
    if (normalize(window.location.hash) === clean) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = `/${clean}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const plan = (type = 'Corporate Events', catering = null) => {
    setInitialType(type);
    setSelectedCatering(catering);
    navigate('plan');
  };

  let content;
  if (route === 'home') content = <Home events={events} clients={corporateClients} team={team} navigate={navigate} onPlan={plan} />;
  else if (route === 'events') content = <EventsPage events={events} navigate={navigate} />;
  else if (route === 'services') content = <ServicesPage events={events} navigate={navigate} />;
  else if (route === 'catering') content = <CateringPage onSelect={(item) => plan('Corporate Events', item)} />;
  else if (route === 'team') content = <TeamPage team={team} onPlan={() => plan()} />;
  else if (route === 'about') content = <AboutPage clients={corporateClients} />;
  else if (route === 'plan') content = <PlanPage initialType={initialType} initialCatering={selectedCatering} />;
  else if (route.startsWith('event/')) {
    const slug = route.split('/')[1];
    const event = events.find((item) => item.slug === slug) || events[0];
    content = <EventPage event={event} navigate={navigate} onPlan={() => plan(event.name)} />;
  } else content = <Home events={events} clients={corporateClients} team={team} navigate={navigate} onPlan={plan} />;

  return (
    <div className="app">
      <Navbar navigate={navigate} />
      <main className="page-transition" key={route}>{content}</main>
      <Footer navigate={navigate} />
    </div>
  );
}
