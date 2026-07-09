import React from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useBank } from './context/BankContext';
import { 
  LayoutDashboard, 
  History, 
  Send, 
  User, 
  CreditCard, 
  LogOut, 
  ShieldAlert, 
  Building 
} from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Transfer from './pages/Transfer';
import Profile from './pages/Profile';
import Cards from './pages/Cards';

export default function App() {
  const { isLoggedIn, handleLogout, timeLeft } = useBank();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  // Auth Guard
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Banner (Always Visible to Warn Users) */}
      <div style={{ 
        background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)', 
        color: '#0b0f19', 
        fontSize: '0.8rem', 
        fontWeight: 'bold', 
        textAlign: 'center', 
        padding: '6px 12px',
        letterSpacing: '0.03em',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        🛡️ DEMO MODE ONLY: SecureBank V1 is a vulnerability sandbox. Real financial transfers or authentications are disabled.
      </div>

      {/* Main Navigation Bar */}
      {isLoggedIn && (
        <nav className="navbar">
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.5rem' }}>🏦</span>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                Secure<span style={{ color: 'var(--accent-blue)' }}>Bank</span>
              </span>
            </Link>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ul className="nav-links">
              <li>
                <Link id="nav-dashboard" to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
              </li>
              <li>
                <Link id="nav-transactions" to="/transactions" className={`nav-link ${location.pathname === '/transactions' ? 'active' : ''}`}>
                  <History size={16} /> Ledger
                </Link>
              </li>
              <li>
                <Link id="nav-transfer" to="/transfer" className={`nav-link ${location.pathname === '/transfer' ? 'active' : ''}`}>
                  <Send size={16} /> Transfer
                </Link>
              </li>
              <li>
                <Link id="nav-cards" to="/cards" className={`nav-link ${location.pathname === '/cards' ? 'active' : ''}`}>
                  <CreditCard size={16} /> Cards
                </Link>
              </li>
              <li>
                <Link id="nav-profile" to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}>
                  <User size={16} /> Profile
                </Link>
              </li>
            </ul>

            <div style={{ height: '24px', width: '1px', background: 'var(--border-color)', margin: '0 8px' }} />

            {/* Logout */}
            <button id="btn-logout" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={handleLogoutClick}>
              <LogOut size={14} /> Exit
            </button>
          </div>
        </nav>
      )}

      {/* Main Container Scope */}
      <main className="main-container" style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/transactions" element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          } />
          
          <Route path="/transfer" element={
            <ProtectedRoute>
              <Transfer />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="/cards" element={
            <ProtectedRoute>
              <Cards />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </main>

      {/* Portal Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--border-color)', 
        padding: '24px', 
        textAlign: 'center', 
        fontSize: '0.78rem', 
        color: 'var(--text-muted)',
        marginTop: '3rem',
        background: 'rgba(11, 15, 25, 0.4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '8px' }}>
          <a href="/api/branches" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            <Building size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Public Branch API Check
          </a>
          <span>•</span>
          <span>Environment: Staging (No Security Policies Implemented)</span>
        </div>
        <p>© 2026 SecureBank Group Inc. All assets simulated for local risk and automation audit demonstrations.</p>
      </footer>

    </div>
  );
}
