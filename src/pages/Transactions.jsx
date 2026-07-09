import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { Search, Filter, ShieldAlert } from 'lucide-react';

export default function Transactions() {
  const { transactions } = useBank();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Generate categories from transaction list
  const categories = ['All', ...new Set(transactions.map(tx => tx.category))];

  // Filter transactions based on search and category
  const filteredTx = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  // VULNERABLE: Deliberate AI coding flaw where search queries are rendered directly 
  // via dangerouslySetInnerHTML to support "dynamic custom bold highlighting".
  // An attacker can input payload: <img src=x onerror="alert('SecureBank DOM XSS!')"> or similar.
  const renderSearchFeedback = () => {
    if (!searchQuery) return null;
    
    // Developer's buggy attempt to do bold highlighting that leaves the DOM vulnerable to HTML injection
    const highlightedMarkup = {
      __html: `Search Results for: <span style="color: var(--accent-blue); font-weight: 600;">${searchQuery}</span> (${filteredTx.length} found)`
    };

    return (
      <div 
        id="xss-vulnerable-output"
        className="glass-panel" 
        style={{ 
          padding: '12px 18px', 
          fontSize: '0.88rem', 
          borderColor: 'rgba(244, 63, 94, 0.2)', 
          background: 'rgba(244, 63, 94, 0.02)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '1rem'
        }}
      >
        <ShieldAlert size={16} className="text-danger" />
        <div dangerouslySetInnerHTML={highlightedMarkup} />
      </div>
    );
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '2rem', background: 'linear-gradient(135deg, #fff 60%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Transaction Ledger
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Real-time audit log of all checking and savings activities.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* Search Box */}
          <div style={{ flex: '1 1 300px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
              <Search size={18} />
            </span>
            <input 
              id="tx-search-input"
              type="text" 
              className="form-input" 
              style={{ paddingLeft: '44px' }} 
              placeholder="Search ledger descriptions, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div style={{ flex: '0 1 200px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
              <Filter size={16} />
            </span>
            <select 
              id="tx-category-select"
              className="form-input" 
              style={{ paddingLeft: '40px', appearance: 'none', background: 'var(--bg-tertiary)' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

        </div>

        {/* XSS Output Rendering */}
        {renderSearchFeedback()}

      </div>

      {/* Ledger Table */}
      <div className="glass-panel" style={{ overflowX: 'auto', padding: '12px' }}>
        <table className="bank-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>DESCRIPTION</th>
              <th>CATEGORY</th>
              <th>STATUS</th>
              <th style={{ textAlign: 'right' }}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {filteredTx.length > 0 ? (
              filteredTx.map(tx => (
                <tr key={tx.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{tx.id}</td>
                  <td>{tx.date}</td>
                  <td style={{ fontWeight: '500' }}>{tx.description}</td>
                  <td>
                    <span className="badge badge-info" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                      {tx.category}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${tx.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: '600' }} className={tx.amount > 0 ? 'text-success' : 'text-primary'}>
                    {tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No matching transaction records found in database cache.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Audit Warning */}
      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        🔒 Secured Ledger. Audit entries are immutable once confirmed by the distributed branch synchronizer node.
      </div>

    </div>
  );
}
