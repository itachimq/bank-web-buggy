import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { CreditCard, Eye, EyeOff, ShieldAlert, Check, AlertTriangle } from 'lucide-react';

export default function Cards() {
  const { resetTimer } = useBank();
  const [showDetails, setShowDetails] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [freezeError, setFreezeError] = useState(false);

  const cardData = {
    number: "4112 5028 9034 8190",
    holder: "Sarah Jenkins",
    expiry: "11/29",
    cvv: "392",
    pin: "4081",
    creditLimit: 50000.00,
    availableCredit: 48920.45,
    type: "Infinite Visa Black"
  };

  const handleRevealClick = () => {
    resetTimer();
    setShowDetails(!showDetails);
    
    // Controlled Information Disclosure Bug: 
    // Logs the sensitive card details including PIN and CVV directly into the browser logs in plain text.
    console.warn("DEBUG LOGGER (VULNERABLE DETECTOR): Card details loaded into client DOM scope.");
    console.log("RAW CARD OBJECT PAYLOAD:", JSON.stringify(cardData, null, 2));
  };

  const handleFreezeToggle = () => {
    resetTimer();
    
    // Buggy implementation: toggles the visual state but throws an unhandled console error,
    // or fails to persist because it doesn't hook into any backend or global Context persistence layers.
    setIsFrozen(!isFrozen);
    setFreezeError(true);
    
    console.error("Uncaught StateSyncError: Cannot sync CardStatus:Frozen to storage backend. Storage thread context is read-only.");
    setTimeout(() => {
      setFreezeError(false);
    }, 4000);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '2rem', background: 'linear-gradient(135deg, #fff 60%, #a78bfa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Credit & Debit Card Center
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Control spending limits, freeze assets, and manage electronic wallets.</p>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'flex-start' }}>
        
        {/* Visa Card Graphic */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-panel" style={{ 
            background: 'linear-gradient(135deg, #1b2336 0%, #0b0f19 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '28px',
            position: 'relative',
            height: '240px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: isFrozen ? 0.4 : 1,
            transition: 'all 0.3s ease'
          }}>
            {/* Glossy Overlay */}
            <div style={{ 
              position: 'absolute', 
              top: '-50%', 
              left: '-20%', 
              width: '100%', 
              height: '200%', 
              background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)',
              transform: 'rotate(25deg)',
              pointerEvents: 'none'
            }} />

            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 'bold', letterSpacing: '0.1em' }}>
                  {cardData.type.toUpperCase()}
                </span>
                <h3 style={{ fontSize: '1.2rem', color: 'white', marginTop: '2px' }}>SecureBank</h3>
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', fontStyle: 'italic', color: 'white' }}>VISA</span>
            </div>

            {/* Chip */}
            <div style={{ width: '45px', height: '35px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }} />

            {/* Card Number */}
            <div style={{ fontSize: '1.35rem', letterSpacing: '0.15em', fontFamily: 'monospace', color: 'white' }}>
              {showDetails ? cardData.number : "•••• •••• •••• 8190"}
            </div>

            {/* Expiry / CVV Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>CARDHOLDER</span>
                <span style={{ fontWeight: '500' }}>{cardData.holder.toUpperCase()}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>EXPIRES</span>
                <span style={{ fontWeight: '500' }}>{cardData.expiry}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block' }}>CVV</span>
                <span style={{ fontWeight: '500' }}>{showDetails ? cardData.cvv : "•••"}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button id="btn-reveal-card" className="btn-secondary" style={{ flex: '1', justifyContent: 'center' }} onClick={handleRevealClick}>
              {showDetails ? <EyeOff size={16} /> : <Eye size={16} />}
              {showDetails ? 'Hide Details' : 'Reveal Details'}
            </button>
            <button id="btn-freeze-card" className="btn-secondary" style={{ flex: '1', justifyContent: 'center', color: isFrozen ? 'var(--accent-emerald)' : 'var(--accent-rose)' }} onClick={handleFreezeToggle}>
              <CreditCard size={16} />
              {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
            </button>
          </div>
        </div>

        {/* Info Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Card Limits */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem' }}>Card Ledger Limits</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Monthly Spend Limit</span>
                  <span>{formatCurrency(cardData.availableCredit)} / {formatCurrency(cardData.creditLimit)}</span>
                </div>
                {/* Progress bar */}
                <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(cardData.availableCredit / cardData.creditLimit) * 100}%`, height: '100%', background: 'var(--accent-blue)', borderRadius: '4px' }} />
                </div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Daily Cash Withdrawal Limit:</span>
                <strong>$1,500.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Online Transactions Limit:</span>
                <strong>Unlimited</strong>
              </div>
            </div>
          </div>

          {/* Sync Error Indicator */}
          {freezeError && (
            <div className="glass-panel" style={{ 
              borderColor: 'var(--accent-rose)', 
              background: 'rgba(244, 63, 94, 0.05)',
              padding: '16px',
              borderRadius: '8px',
              color: 'var(--accent-rose)',
              fontSize: '0.8rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                <AlertTriangle size={16} />
                CONSOLE SYNC CRASH
              </div>
              <p>
                An error occurred attempting to synchronize card state changes to persistent server. Check developer tools console (<code>F12</code>) for full stack trace error dump.
              </p>
            </div>
          )}

          {/* AI Risk Alert */}
          <div className="glass-panel" style={{ padding: '20px', borderColor: 'var(--accent-gold)', background: 'rgba(245, 158, 11, 0.02)' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-gold)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldAlert size={16} /> AI Assistant Code Risk
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              <strong>Vulnerability Info:</strong>
              <br />
              Notice that clicking "Reveal Details" outputs the full JSON block (including PIN and CVV) directly to standard output console logs. 
              In real code review, console logging critical security fields is a severe compliance violation (OWASP Top 10 Information Leak).
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
