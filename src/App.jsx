import { useState } from 'react';
import React from 'react';
import './App.css';
import LegoLanding from './components/LegoLanding';
import Hero from './components/HeroLego.jsx';  // ensure the file name matches

function App() {
  return (
    <>
      <LegoLanding />
      <div id="hero-section">
        <Hero />
      </div>
    </>
  );
}

export default App;
