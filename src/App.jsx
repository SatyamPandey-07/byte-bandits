import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import LegoLanding from './components/LegoLanding';
import Hero from './components/HeroLego.jsx';
import NavBar from './components/Navbar.jsx';
import InfiniteScrolling from './components/InfiniteScrolling.jsx';

function App() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Assuming landing page occupies full viewport height.
      if (window.scrollY > window.innerHeight) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <LegoLanding />
      {showNav && <NavBar />}
      <div id="hero-section">
        <Hero />
      </div>
      <div id="inf-section">
        <InfiniteScrolling />
      </div>
    </>
  );
}

export default App;
