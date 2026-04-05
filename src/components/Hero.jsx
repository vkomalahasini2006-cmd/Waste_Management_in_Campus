import React from 'react';
import { ArrowRight, Recycle, RefreshCw, Leaf } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-elements">
        <div className="bg-circle circle-1 animate-float"></div>
        <div className="bg-circle circle-2 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <span className="badge">🌱 Welcome to a Greener Future</span>
          <h1 className="hero-title">
            Smart Solutions for a <br />
            <span className="text-highlight">Cleaner Campus</span>
          </h1>
          <p className="hero-subtitle">
            Join the movement. Report waste, learn about proper segregation, and help us maintain a sustainable, eco-friendly environment for everyone to thrive in.
          </p>
          
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo('report')}>
              Report Waste Now <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={() => scrollTo('about')}>
              Learn More
            </button>
          </div>
        </div>
        
        <div className="hero-cards">
          <div className="impact-card">
            <div className="icon-wrapper"><RefreshCw size={24} /></div>
            <h3>Reduce</h3>
            <p>Minimize waste generation at source</p>
          </div>
          <div className="impact-card">
            <div className="icon-wrapper" style={{ backgroundColor: '#52796f' }}><Recycle size={24} /></div>
            <h3>Reuse</h3>
            <p>Find new purposes for old items</p>
          </div>
          <div className="impact-card">
            <div className="icon-wrapper" style={{ backgroundColor: '#40916c' }}><Leaf size={24} /></div>
            <h3>Recycle</h3>
            <p>Turn waste into valuable resources</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
