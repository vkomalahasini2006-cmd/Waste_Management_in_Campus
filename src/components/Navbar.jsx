import React, { useState, useEffect } from 'react';
import { Leaf, Menu, X, LogOut } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active-link' : '';

  return (
    <header className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-content">
        <div className="logo" onClick={() => handleNavClick('/')}>
          <div className="logo-icon">
            <Leaf size={28} />
          </div>
          <div>
            <h1 className="logo-title">Campus Clean</h1>
            <span className="logo-subtitle">Smart Waste Management</span>
          </div>
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <button className={isActive('/')} onClick={() => handleNavClick('/')}>Home</button>
          <button className={isActive('/about')} onClick={() => handleNavClick('/about')}>About</button>
          <button className={isActive('/categories')} onClick={() => handleNavClick('/categories')}>Categories</button>
          <button className={isActive('/tips')} onClick={() => handleNavClick('/tips')}>Eco Tips</button>
          <button className={isActive('/play')} onClick={() => handleNavClick('/play')}>🕹️ Play</button>
          
          <button className={`btn btn-primary ${isActive('/report')}`} onClick={() => handleNavClick('/report')}>
            Report Waste
          </button>

          {user ? (
            <>
              <button className={isActive('/dashboard')} onClick={() => handleNavClick('/dashboard')}>Dashboard</button>
              <button className="logout-btn" onClick={handleLogout} title="Sign Out">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <button className={`btn btn-secondary ${isActive('/login')}`} onClick={() => handleNavClick('/login')}>
              Admin Login
            </button>
          )}
        </nav>

        <button 
          className="mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
