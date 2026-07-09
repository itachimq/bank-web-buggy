import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function Login() {
  const { handleLogin } = useBank();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isDbError, setIsDbError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDbError(false);
    setErrorMsg('');

    // Simulated SQL injection trigger check
    if (username.includes("'") || password.includes("'")) {
      setIsDbError(true);
      setErrorMsg(`Database Error: SQL execution failed. 
Query: SELECT * FROM users WHERE username = '${username}' AND password = '${password}';
Details: PostgreSQL PGError: unterminated quoted string at or near "${username.includes("'") ? username : password}"
Trace:
  at pg_query_params (pg_adapter.c:482)
  at db_authenticate_user (user_model.py:129)
  at handle_login_request (auth_controller.go:88)`);
      return;
    }

    // Exact matching for admin
    if (username === 'admin') {
      if (password === 'password123') {
        handleLogin({
          username: 'admin',
          name: 'Sarah Jenkins',
          accountNo: '3049-2810-9481',
          email: 'sjenkins@securebank.internal',
          role: 'Administrator / Wealth Lead'
        });
        navigate('/dashboard');
      } else {
        // Verbose credentials error with leaked hash and salt!
        setErrorMsg(`Login failed for user 'admin': Incorrect password. 
Note: Stored MD5 password hash is 'e59c56860f0d2c0199d7990967c7e6e5' (salt: 'securebank_salt_2026'). 
Please contact Mark Vance (mvance@securebank.internal) to reset your AD password.`);
      }
    } else {
      // Verbose error indicating account does not exist
      setErrorMsg(`Authentication Error: User '${username}' does not exist in local user database table 'tbl_web_users'. 
If this user was recently provisioned, ensure that the active directory syncer has pushed the username from 'LDAP://us-east-1.corp.internal' database to local Postgres cache.`);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '1rem' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '3rem 2.5rem', width: '100%', maxWidth: '480px' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', marginBottom: '1rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <ShieldCheck size={36} className="text-blue" />
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.25rem', background: 'linear-gradient(135deg, #fff 30%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            SecureBank
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Enterprise Wealth & Asset Management</p>
        </div>

        {/* Dynamic Verbose Error Banner */}
        {errorMsg && (
          <div className="glass-panel" style={{ 
            borderColor: isDbError ? 'var(--accent-rose)' : 'var(--accent-gold)', 
            background: isDbError ? 'rgba(244, 63, 94, 0.05)' : 'rgba(245, 158, 11, 0.05)',
            padding: '16px', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            lineHeight: '1.4',
            whiteSpace: 'pre-wrap',
            fontFamily: isDbError ? 'Courier New, monospace' : 'inherit',
            color: isDbError ? 'var(--accent-rose)' : 'var(--accent-gold)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', marginBottom: '6px' }}>
              <AlertTriangle size={16} />
              {isDbError ? 'CRITICAL DATABASE EXCEPTION' : 'LOGIN FAILED'}
            </div>
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Username</label>
            <input 
              id="username"
              type="text" 
              className="form-input" 
              placeholder="e.g. admin" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button id="login-submit" type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Access Portal
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <p>Demo Credentials: <strong>admin</strong> / <strong>password123</strong></p>
          <p style={{ marginTop: '4px' }}>System Version: 2026.4.12-vulner-testing</p>
        </div>

      </div>
    </div>
  );
}
