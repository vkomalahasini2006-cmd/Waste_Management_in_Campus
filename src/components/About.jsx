import React from 'react';
import { CheckCircle } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2 className="section-title">Why Sustainable Waste Management?</h2>
        <p className="section-subtitle">
          Transforming our campus into a clean, green ecosystem requires everyone's participation. 
          Here's why proper waste management is crucial for our college.
        </p>

        <div className="about-grid">
          <div className="about-content">
            <h3>Benefits for our Campus</h3>
            <ul className="benefits-list">
              <li>
                <CheckCircle className="check-icon" />
                <div>
                  <strong>Cleaner Surroundings</strong>
                  <p>Eliminate overflowing bins and litter for a beautiful studying environment.</p>
                </div>
              </li>
              <li>
                <CheckCircle className="check-icon" />
                <div>
                  <strong>Reduced Pollution</strong>
                  <p>Proper segregation prevents hazardous waste from contaminating soil and water.</p>
                </div>
              </li>
              <li>
                <CheckCircle className="check-icon" />
                <div>
                  <strong>Recycling Awareness</strong>
                  <p>Fosters eco-friendly habits that students carry beyond college life.</p>
                </div>
              </li>
              <li>
                <CheckCircle className="check-icon" />
                <div>
                  <strong>Resource Recovery</strong>
                  <p>Convert wet waste to compost for campus gardens and recycle dry waste.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="about-visual card">
            <h3>The Campus Cycle</h3>
            <div className="process-flow">
              <div className="step">
                <div className="step-number">1</div>
                <span>Waste Generated</span>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number" style={{background: '#52796f'}}>2</div>
                <span>Segregation</span>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number">3</div>
                <span>Collection</span>
              </div>
              <div className="step-connector"></div>
              <div className="step">
                <div className="step-number" style={{background: '#40916c'}}>4</div>
                <span>Recycling & Compost</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
