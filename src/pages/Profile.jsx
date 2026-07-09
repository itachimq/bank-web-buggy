import React, { useState, useEffect } from 'react';
import { useBank } from '../context/BankContext';
import { User, MapPin, Code, ShieldAlert, Cpu } from 'lucide-react';

export default function Profile() {
  const { user } = useBank();
  const [branches, setBranches] = useState([]);
  const [rawApiOutput, setRawApiOutput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/branches')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setBranches(data.branches || []);
        setRawApiOutput(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch branches from public endpoint:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '2rem', background: 'linear-gradient(135deg, #fff 60%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Customer Security Profile
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Manage personal details, viewing permissions, and internal branch routing.</p>
      </div>

      {/* Profile Details Card */}
      <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'center' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)', 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)'
        }}>
          <User size={48} color="#white" />
        </div>
        <div style={{ flex: '1' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{user?.name || 'Sarah Jenkins'}</h2>
          <span className="badge badge-info" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            {user?.role || 'Administrator'}
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
            <div>
              <strong style={{ color: 'var(--text-secondary)' }}>Account Identifier:</strong>
              <p style={{ fontFamily: 'monospace', fontSize: '0.95rem', marginTop: '4px' }}>{user?.accountNo || '3049-2810-9481'}</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-secondary)' }}>Internal Email:</strong>
              <p style={{ marginTop: '4px' }}>{user?.email || 'sjenkins@securebank.internal'}</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-secondary)' }}>Linked Branch:</strong>
              <p style={{ marginTop: '4px' }}>SecureBank Main Headquarters (br-01)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Branches Section */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin className="text-blue" size={20} /> Registered Bank Branches
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Loaded dynamically from the public <code>/api/branches</code> network interface.
        </p>

        {loading && <p style={{ color: 'var(--text-muted)' }}>Loading branch data...</p>}
        {error && <p className="text-danger">Failed to connect: {error}</p>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {branches.map(branch => (
            <div key={branch.id} className="glass-panel" style={{ padding: '20px', background: 'rgba(11, 15, 25, 0.4)' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-blue)', marginBottom: '8px' }}>{branch.name}</h4>
              <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-secondary)' }}>
                <li><strong>Routing:</strong> <span style={{ fontFamily: 'monospace' }}>{branch.routing_number}</span></li>
                <li><strong>Address:</strong> {branch.address}</li>
                <li><strong>Phone:</strong> {branch.phone}</li>
                <li><strong>Manager:</strong> {branch.manager}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Security Finding Panel (Information Leak Demonstration) */}
      <div className="glass-panel" style={{ padding: '2rem', borderColor: 'var(--accent-gold)', background: 'rgba(245, 158, 11, 0.02)' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
          <ShieldAlert size={20} /> System API Integration Debugging
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.2rem' }}>
          ⚠️ <strong>Information Disclosure Check:</strong> The <code>/api/branches</code> endpoint includes verbose comments and variables that should be restricted to development. Below is the raw response payload demonstrating how internal network layouts and credentials leak to client applications.
        </p>
        
        {rawApiOutput ? (
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', right: '12px', top: '12px', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Code size={12} /> application/json
            </span>
            <pre style={{ 
              background: '#070a12', 
              padding: '16px', 
              borderRadius: '8px', 
              fontSize: '0.8rem', 
              overflowX: 'auto', 
              color: '#38bdf8', 
              fontFamily: 'Consolas, Monaco, Courier New, monospace',
              border: '1px solid var(--border-color)',
              lineHeight: '1.4'
            }}>
              {JSON.stringify(rawApiOutput, null, 2)}
            </pre>
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No debug JSON payload loaded.</p>
        )}
      </div>

    </div>
  );
}
