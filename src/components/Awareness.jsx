import React from 'react';
import { Lightbulb, Droplets, Wind, Zap, Coffee, Smartphone, ShoppingBag, BookOpen } from 'lucide-react';
import './Awareness.css';

const Awareness = () => {
  const tips = [
    {
      icon: <Coffee size={28} />,
      title: "Say No to Single-Use Cups",
      desc: "Bring a reusable mug to the campus cafeteria. Over a semester, you can save hundreds of paper cups from landfills.",
      color: "#e67e22"
    },
    {
      icon: <Smartphone size={28} />,
      title: "Digital over Paper",
      desc: "Whenever possible, take digital notes and submit assignments online to conserve our campus paper resources.",
      color: "#3498db"
    },
    {
      icon: <Droplets size={28} />,
      title: "Save Every Drop",
      desc: "Turn off taps tightly in restrooms and laboratories. Report leaking faucets to the administration immediately.",
      color: "#2980b9"
    },
    {
      icon: <Zap size={28} />,
      title: "Power Down Ritual",
      desc: "Always switch off lights, fans, and projectors when an empty classroom isn't in use.",
      color: "#f1c40f"
    },
    {
      icon: <ShoppingBag size={28} />,
      title: "Tote Bags Only",
      desc: "Keep a cloth tote bag in your backpack for spontaneous campus store trips. Avoid plastic bags entirely.",
      color: "#16a085"
    },
    {
      icon: <BookOpen size={28} />,
      title: "Book Exchange",
      desc: "Instead of buying brand new printed materials, utilize the campus book exchange program to reuse textbooks.",
      color: "#8e44ad"
    }
  ];

  return (
    <div className="tips-page-wrapper">
      <div className="tips-hero">
        <div className="container tips-hero-content">
          <div className="icon-pulse-wrapper">
            <Lightbulb size={48} className="tips-main-icon" />
          </div>
          <h1 className="tips-page-title">Eco Tips</h1>
          <p className="tips-page-subtitle">Small daily habits from every student create a massive positive impact across our entire campus. Here is how you can help.</p>
        </div>
        <div className="wave-bottom"></div>
      </div>

      <section className="section tips-grid-section">
        <div className="container">
          <div className="premium-tips-grid">
            {tips.map((tip, index) => (
              <div 
                className="premium-tip-card animate-fade-in" 
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="tip-icon-header" style={{ color: tip.color, backgroundColor: `${tip.color}15` }}>
                  {tip.icon}
                </div>
                <h3 className="tip-card-title">{tip.title}</h3>
                <p className="tip-card-desc">{tip.desc}</p>
                <div className="tip-card-border" style={{ backgroundColor: tip.color }}></div>
              </div>
            ))}
          </div>

          <div className="slogans-container">
            <h3>Campus Pledges</h3>
            <div className="slogans">
              <span className="slogan-badge">🌍 Clean Campus, Green Future</span>
              <span className="slogan-badge">♻️ Sort Waste, Save Earth</span>
              <span className="slogan-badge">🌱 Don't Trash the Future</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awareness;
