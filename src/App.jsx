import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages & Components
import Home from './pages/Home';
import About from './components/About';
import Categories from './components/Categories';
import SmartSolution from './components/SmartSolution';
import ReportForm from './components/ReportForm';
import Awareness from './components/Awareness';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Game from './pages/Game';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<><About /><SmartSolution /></>} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/report" element={<ReportForm />} />
            <Route path="/tips" element={<Awareness />} />
            <Route path="/play" element={<Game />} />
            
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
