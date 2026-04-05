import React from 'react';
import { Truck, MapPin, BarChart3, Users } from 'lucide-react';
import './SmartSolution.css';

const SmartSolution = () => {
  const features = [
    {
      icon: <MapPin size={24} />,
      title: 'Smart Bin Locations',
      desc: 'Strategically placed color-coded bins across campus zones for easy access.'
    },
    {
      icon: <Truck size={24} />,
      title: 'Scheduled Collection',
      desc: 'Optimized daily routes ensuring no bin overflows during peak college hours.'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Data-Driven Tracking',
      desc: 'Real-time dashboard monitoring waste generation and recycling metrics.'
    },
    {
      icon: <Users size={24} />,
      title: 'Student Participation',
      desc: 'Report issues directly and earn green karma for maintaining cleanliness.'
    }
  ];

  return (
    <section id="smart-solution" className="section solution-section">
      <div className="container">
        <div className="solution-content">
          <div className="solution-text">
            <h2>Our Smart Campus Solution</h2>
            <p className="lead-text">
              We leverage modern technology and community participation to create a seamless waste management ecosystem.
            </p>
            <p>
              From color-coded segregation at the source to scheduled collections and an on-campus composting facility, our approach ensures that over 80% of generated waste is either recycled or sustainably disposed of.
            </p>
            
            <div className="feature-grid mt-4">
              {features.map((feat, idx) => (
                <div className="feat-item" key={idx}>
                  <div className="feat-icon">{feat.icon}</div>
                  <div>
                    <h4>{feat.title}</h4>
                    <p>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="solution-image-placeholder glass">
            {/* abstract eco friendly visualization */}
            <div className="eco-circle">
              <div className="inner-circle"></div>
              <span>Eco-System</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartSolution;
