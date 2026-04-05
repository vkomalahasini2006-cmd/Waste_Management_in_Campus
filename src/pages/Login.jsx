import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail } from 'lucide-react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        // Successful login
        navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password
        });
        if (error) throw error;
        setSuccessMsg('Registration successful! You can now sign in.');
        setIsLogin(true);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container card">
        <div className="login-header text-center">
          <div className="login-logo">
            <Leaf size={32} />
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="section-subtitle">
            {isLogin ? 'Sign in to access the administrator dashboard.' : 'Register a new account to manage campus operations.'}
          </p>
        </div>

        {errorMsg && <div className="error-message">{errorMsg}</div>}
        {successMsg && <div className="success-message">{successMsg}</div>}

        <form onSubmit={handleAuth} className="login-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-with-icon">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="admin@college.edu"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock className="input-icon" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="login-footer text-center mt-4">
          <button className="text-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
          <div className="mt-4">
            <button className="text-btn back-btn" onClick={() => navigate('/')}>
              &larr; Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
