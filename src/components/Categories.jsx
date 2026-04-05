import React from 'react';
import { Apple, Battery, Package, AlertTriangle, ArrowRight } from 'lucide-react';
import './Categories.css';

const Categories = () => {
  const categories = [
    {
      title: 'Wet Waste',
      color: 'var(--color-bin-green)',
      icon: <Apple size={32} />,
      desc: 'Biodegradable waste that can be composted.',
      examples: ['Food scraps', 'Fruit peels', 'Coffee grounds']
    },
    {
      title: 'Dry Waste',
      color: 'var(--color-bin-blue)',
      icon: <Package size={32} />,
      desc: 'Recyclable materials that do not decompose easily.',
      examples: ['Plastic bottles', 'Paper', 'Cardboard', 'Glass']
    },
    {
      title: 'E-Waste',
      color: 'var(--color-bin-yellow)',
      icon: <Battery size={32} />,
      desc: 'Electronic devices and accessories.',
      examples: ['Broken earphones', 'Old batteries', 'Calculators']
    },
    {
      title: 'Hazardous',
      color: 'var(--color-bin-red)',
      icon: <AlertTriangle size={32} />,
      desc: 'Toxic materials that require special disposal.',
      examples: ['Chemicals', 'Paints', 'Medical waste']
    }
  ];

  return (
    <section id="categories" className="section categories-section">
      <div className="container">
        <h2 className="section-title">Waste Categories</h2>
        <p className="section-subtitle">
          Learn how to segregate your waste properly. Following this guide helps our recycling facilities process materials efficiently.
        </p>

        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <div className="category-card" key={idx} style={{ '--card-color': cat.color }}>
              <div className="cat-icon" style={{ backgroundColor: cat.color }}>
                {cat.icon}
              </div>
              <h3 className="cat-title">{cat.title}</h3>
              <p className="cat-desc">{cat.desc}</p>
              
              <div className="cat-examples">
                <h4><ArrowRight size={14} /> Examples:</h4>
                <ul>
                  {cat.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="which-bin card mt-4">
          <h3>Which Bin Guide 🗑️</h3>
          <div className="guide-items">
            <div className="guide-item">
              <span className="item-name">Banana Peel</span>
              <span className="arrow">→</span>
              <span className="bin-badge" style={{ backgroundColor: 'var(--color-bin-green)' }}>Green Bin</span>
            </div>
            <div className="guide-item">
              <span className="item-name">Plastic Bottle</span>
              <span className="arrow">→</span>
              <span className="bin-badge" style={{ backgroundColor: 'var(--color-bin-blue)' }}>Blue Bin</span>
            </div>
            <div className="guide-item">
              <span className="item-name">Old Battery</span>
              <span className="arrow">→</span>
              <span className="bin-badge" style={{ backgroundColor: '#2d3436' }}>Black/Yellow Bin</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
