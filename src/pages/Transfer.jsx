import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { Send, AlertOctagon, HelpCircle } from 'lucide-react';

export default function Transfer() {
  const { checkingBalance, savingsBalance, executeTransfer, resetTimer } = useBank();
  const [fromAccount, setFromAccount] = useState('checking');
  const [recipientName, setRecipientName] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Transfer');
  const [notes, setNotes] = useState('');

  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    resetTimer();

    // Call buggy context transfer
    const res = executeTransfer(fromAccount, recipientName, recipientAccount, amount, category, notes);
    setIsSuccess(res.success);
    setMessage(res.message);

    if (res.success) {
      // Reset input values (but keep fromAccount)
      setRecipientName('');
      setRecipientAccount('');
      setAmount('');
      setNotes('');
    }
  };

  const autofillContact = (name, acct) => {
    setRecipientName(name);
    setRecipientAccount(acct);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
      
      {/* Transfer Panel */}
      <div className="glass-panel" style={{ padding: '2.5rem 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Send className="text-blue" size={24} /> Simulated Wire Transfer
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Instantly dispatch funds across SecureBank internal accounts or external routing systems.
        </p>

        {message && (
          <div className="glass-panel" style={{ 
            borderColor: isSuccess ? 'var(--accent-emerald)' : 'var(--accent-rose)', 
            background: isSuccess ? 'rgba(16, 185, 129, 0.05)' : 'rgba(244, 63, 94, 0.05)',
            padding: '12px 16px', 
            borderRadius: '8px', 
            marginBottom: '1.5rem',
            fontSize: '0.88rem',
            color: isSuccess ? 'var(--accent-emerald)' : 'var(--accent-rose)'
          }}>
            {message}
          </div>
        )}

        <form onSubmit={handleTransferSubmit}>
          
          <div className="form-group">
            <label className="form-label" htmlFor="fromAccount">Source Account</label>
            <select 
              id="fromAccount"
              className="form-input" 
              value={fromAccount} 
              onChange={(e) => setFromAccount(e.target.value)}
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <option value="checking">Checking Account (Available: ${checkingBalance.toFixed(2)})</option>
              <option value="savings">Savings Account (Available: ${savingsBalance.toFixed(2)})</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="recipientName">Recipient Legal Name</label>
            <input 
              id="recipientName"
              type="text" 
              className="form-input" 
              placeholder="e.g. John Doe"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="recipientAccount">Recipient Account Number (10 digits)</label>
            <input 
              id="recipientAccount"
              type="text" 
              className="form-input" 
              placeholder="e.g. 1029384756"
              value={recipientAccount}
              onChange={(e) => setRecipientAccount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amount">Transfer Amount ($)</label>
            <input 
              id="amount"
              type="text" 
              className="form-input" 
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              ⚠️ Bug Notice: The input amount field lacks positive boundary validation (e.g. allows negative numbers).
            </span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">Transaction Category</label>
            <select 
              id="category"
              className="form-input" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <option value="Transfer">Wire Transfer</option>
              <option value="Utilities">Utilities Autopay</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Shopping">Shopping & Retailing</option>
              <option value="Entertainment">Entertainment Fees</option>
              <option value="Other">Miscellaneous Expenses</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label" htmlFor="notes">Reference Notes</label>
            <input 
              id="notes"
              type="text" 
              className="form-input" 
              placeholder="e.g. Monthly Rent"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button id="transfer-submit" type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Authorize ACH Wire
          </button>
        </form>
      </div>

      {/* Information Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Quick Contacts */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Frequent Payees</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              className="btn-secondary" 
              style={{ justifyContent: 'space-between', padding: '12px' }}
              onClick={() => autofillContact("Alice Smith (Developer)", "4839201948")}
            >
              <span>Alice Smith (Developer)</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Acct: *******1948</span>
            </button>
            <button 
              className="btn-secondary" 
              style={{ justifyContent: 'space-between', padding: '12px' }}
              onClick={() => autofillContact("Bob Johnson (Dev Lead)", "9038481230")}
            >
              <span>Bob Johnson (Dev Lead)</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Acct: *******1230</span>
            </button>
            <button 
              className="btn-secondary" 
              style={{ justifyContent: 'space-between', padding: '12px' }}
              onClick={() => autofillContact("Elena Rostova (Manager)", "1049283746")}
            >
              <span>Elena Rostova (Manager)</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Acct: *******3746</span>
            </button>
          </div>
        </div>

        {/* Security Warning Panel */}
        <div className="glass-panel" style={{ padding: '20px', borderColor: 'var(--accent-rose)', background: 'rgba(244, 63, 94, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-rose)', fontWeight: '600', marginBottom: '10px' }}>
            <AlertOctagon size={20} />
            AI Safety Demonstration
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            This panel demonstrates a critical vulnerability often created by AI-assisted code that implements client-side state adjustments without server-side validation. 
            <br /><br />
            <strong>How to trigger:</strong>
            <ol style={{ paddingLeft: '1.2rem', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li>Type a negative value (e.g. <code>-5000</code>) in the amount field.</li>
              <li>Fill in standard recipient details.</li>
              <li>Authorize the transaction.</li>
              <li>Observe that your balance increases by $5,000 rather than decreasing!</li>
            </ol>
          </p>
        </div>

      </div>

    </div>
  );
}
