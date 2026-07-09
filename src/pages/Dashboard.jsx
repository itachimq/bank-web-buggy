import React from 'react';
import { useBank } from '../context/BankContext';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft, DollarSign, Wallet, ShieldAlert, CreditCard, Send, History, User } from 'lucide-react';

export default function Dashboard() {
  const { 
    user, 
    checkingBalance, 
    savingsBalance, 
    investmentBalance, 
    transactions, 
    timeLeft, 
    resetTimer, 
    getPortfolioValue 
  } = useBank();

  // Arithmetic discrepancy calculator for the vulnerability demonstration
  const correctSum = checkingBalance + savingsBalance + investmentBalance;
  const shownSum = getPortfolioValue();
  const mathIsBuggy = Math.abs(correctSum - shownSum) > 0.01;

  // Formatting helper
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  // Recent transactions subset
  const recentTx = transactions.slice(0, 4);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Client Session Timeout Banner */}
      <div className="glass-panel" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px 24px', 
        borderColor: timeLeft < 30 ? 'var(--accent-rose)' : 'var(--border-color)',
        background: timeLeft < 30 ? 'rgba(244, 63, 94, 0.08)' : 'rgba(27, 35, 54, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldAlert className={timeLeft < 30 ? 'text-danger' : 'text-warning'} size={20} />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Simulated Session Security: Your token expires in <strong className={timeLeft < 30 ? 'text-danger' : 'text-warning'} style={{ fontFamily: 'monospace', fontSize: '1rem' }}>{timeLeft}s</strong>
          </span>
        </div>
        <button id="btn-extend-session" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={resetTimer}>
          Renew Client Lease
        </button>
      </div>

      {/* Greeting Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', background: 'linear-gradient(135deg, #fff 60%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Welcome back, {user?.name || 'Administrator'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>SecureBank Wealth Center | Last checked: Just now</p>
        </div>
        <div className="badge badge-info" style={{ letterSpacing: '0.05em' }}>
          SECURE STAGING ACTIVE
        </div>
      </div>

      {/* Main Asset Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Card 1: Checking */}
        <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>CHECKING ACCOUNT</span>
              <p style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginTop: '4px' }}>
                {formatCurrency(checkingBalance)}
              </p>
            </div>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '12px' }}>
              <Wallet size={20} className="text-blue" />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Acct: *******2810</span>
            <span className="text-success">● Active</span>
          </div>
        </div>

        {/* Card 2: Savings */}
        <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent-purple)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>HIGH-YIELD SAVINGS</span>
              <p style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginTop: '4px' }}>
                {formatCurrency(savingsBalance)}
              </p>
            </div>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '10px', borderRadius: '12px' }}>
              <DollarSign size={20} className="text-blue" style={{ color: 'var(--accent-purple)' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Acct: *******9481</span>
            <span style={{ color: 'var(--accent-purple)' }}>4.85% APY</span>
          </div>
        </div>

        {/* Card 3: Investment */}
        <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid var(--accent-gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>INVESTMENT BROKERAGE</span>
              <p style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', marginTop: '4px' }}>
                {formatCurrency(investmentBalance)}
              </p>
            </div>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '10px', borderRadius: '12px' }}>
              <ArrowUpRight size={20} className="text-warning" />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Acct: *******3049</span>
            <span className="text-warning">Market Open</span>
          </div>
        </div>

      </div>

      {/* Big Portfolio Aggregate Banner (With Arithmetic Bug) */}
      <div className="glass-panel" style={{ 
        padding: '28px', 
        background: 'linear-gradient(135deg, rgba(27,35,54,0.6) 0%, rgba(18,24,38,0.8) 100%)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
            TOTAL PORTFOLIO ASSETS VALUE
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <h2 id="total-assets-value" style={{ fontSize: '2.5rem', fontWeight: '800', color: mathIsBuggy ? 'var(--accent-rose)' : '#fff' }}>
              {formatCurrency(shownSum)}
            </h2>
            {mathIsBuggy && (
              <span className="text-danger" style={{ fontSize: '0.85rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldAlert size={14} /> Arithmetic discrepancy detected (Investment assets excluded). Real value: {formatCurrency(correctSum)}
              </span>
            )}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Portfolio valuation calculated client-side in context thread via <code>getPortfolioValue()</code> logic.
          </p>
        </div>
      </div>

      {/* Grid: Charts & Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        
        {/* Custom SVG Chart */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Asset Growth Trend (Custom SVG Engine)</h3>
          
          <div style={{ width: '100%', height: '220px', position: 'relative' }}>
            {/* Visual SVG chart */}
            <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              {/* Gradients */}
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="160" x2="500" y2="160" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

              {/* Area Path */}
              <path d="M 0 160 Q 100 120 200 130 T 400 60 L 500 40 L 500 180 L 0 180 Z" fill="url(#chartGrad)" />
              
              {/* Line Path */}
              <path d="M 0 160 Q 100 120 200 130 T 400 60 L 500 40" fill="none" stroke="var(--accent-blue)" strokeWidth="3" />
              
              {/* Dots */}
              <circle cx="100" cy="140" r="4" fill="var(--accent-purple)" />
              <circle cx="200" cy="130" r="4" fill="var(--accent-purple)" />
              <circle cx="300" cy="95" r="4" fill="var(--accent-purple)" />
              <circle cx="400" cy="60" r="4" fill="var(--accent-purple)" />
              <circle cx="500" cy="40" r="4" fill="var(--accent-purple)" />

              {/* X Axis Labels */}
              <text x="5" y="195" fill="var(--text-muted)" fontSize="10">Jan</text>
              <text x="100" y="195" fill="var(--text-muted)" fontSize="10">Feb</text>
              <text x="200" y="195" fill="var(--text-muted)" fontSize="10">Mar</text>
              <text x="300" y="195" fill="var(--text-muted)" fontSize="10">Apr</text>
              <text x="400" y="195" fill="var(--text-muted)" fontSize="10">May</text>
              <text x="475" y="195" fill="var(--text-muted)" fontSize="10">Jun</text>
            </svg>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span>* Simulated monthly projections based on dynamic equity assets.</span>
            <span>Graph updates real-time.</span>
          </div>
        </div>

        {/* Quick Actions & Recent Activity Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Quick Actions */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Instant Services</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <Link id="action-transfer" to="/transfer" className="btn-secondary" style={{ flexDirection: 'column', padding: '16px', gap: '8px', textDecoration: 'none', textAlign: 'center', fontSize: '0.85rem' }}>
                <Send size={18} className="text-blue" />
                Transfer
              </Link>
              <Link id="action-cards" to="/cards" className="btn-secondary" style={{ flexDirection: 'column', padding: '16px', gap: '8px', textDecoration: 'none', textAlign: 'center', fontSize: '0.85rem' }}>
                <CreditCard size={18} className="text-warning" />
                Cards
              </Link>
              <Link id="action-profile" to="/profile" className="btn-secondary" style={{ flexDirection: 'column', padding: '16px', gap: '8px', textDecoration: 'none', textAlign: 'center', fontSize: '0.85rem' }}>
                <User size={18} className="text-success" />
                Profile
              </Link>
            </div>
          </div>

          {/* Mini Recent Transactions */}
          <div className="glass-panel" style={{ padding: '20px', flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Recent Ledger Activity</h3>
              <Link id="view-all-tx" to="/transactions" style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <History size={14} /> Full Ledger
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentTx.map((tx) => (
                <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{tx.description}</div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.date} • {tx.category}</span>
                  </div>
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }} className={tx.amount > 0 ? 'text-success' : 'text-primary'}>
                    {tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
