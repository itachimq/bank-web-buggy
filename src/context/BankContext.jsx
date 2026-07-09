import React, { createContext, useState, useEffect, useContext } from 'react';

const BankContext = createContext();

const initialTransactions = [
  { id: 'tx-101', date: '2026-07-08', type: 'Credit', category: 'Income', description: 'GlobalTech Corp Payroll Direct Deposit', amount: 4850.00, status: 'Completed' },
  { id: 'tx-102', date: '2026-07-07', type: 'Debit', category: 'Food & Dining', description: 'Starbucks Coffee #4920', amount: -6.85, status: 'Completed' },
  { id: 'tx-103', date: '2026-07-06', type: 'Debit', category: 'Shopping', description: 'Amazon.com Marketplace Purchase', amount: -124.50, status: 'Completed' },
  { id: 'tx-104', date: '2026-07-05', type: 'Debit', category: 'Utilities', description: 'Metropolitan Electric Bill Autopay', amount: -185.20, status: 'Completed' },
  { id: 'tx-105', date: '2026-07-03', type: 'Debit', category: 'Entertainment', description: 'Netflix Subscription Premium 4K', amount: -22.99, status: 'Completed' },
  { id: 'tx-106', date: '2026-07-02', type: 'Credit', category: 'Transfer', description: 'Zelle Transfer from Alice Smith', amount: 150.00, status: 'Completed' },
  { id: 'tx-107', date: '2026-06-30', type: 'Debit', category: 'Shopping', description: 'Target Store #2839 Minneapolis', amount: -89.40, status: 'Completed' }
];

export const BankProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('sb_auth_token') === 'simulated-jwt-token-xyz123';
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sb_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Account balances (Checking, Savings, Investment)
  const [checkingBalance, setCheckingBalance] = useState(() => {
    const saved = localStorage.getItem('sb_checking_bal');
    return saved ? parseFloat(saved) : 12850.45;
  });
  const [savingsBalance, setSavingsBalance] = useState(() => {
    const saved = localStorage.getItem('sb_savings_bal');
    return saved ? parseFloat(saved) : 54120.80;
  });
  const [investmentBalance, setInvestmentBalance] = useState(() => {
    const saved = localStorage.getItem('sb_invest_bal');
    return saved ? parseFloat(saved) : 112430.15;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('sb_transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  // Client-side session timeout (120 seconds of simulated session duration)
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (!isLoggedIn) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Client-side timeout triggers logout
          handleLogout();
          alert("Session Timed Out! (Simulated Timeout)");
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // Keep track of state in localStorage
  useEffect(() => {
    localStorage.setItem('sb_checking_bal', checkingBalance.toString());
    localStorage.setItem('sb_savings_bal', savingsBalance.toString());
    localStorage.setItem('sb_invest_bal', investmentBalance.toString());
    localStorage.setItem('sb_transactions', JSON.stringify(transactions));
  }, [checkingBalance, savingsBalance, investmentBalance, transactions]);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setTimeLeft(120);
    localStorage.setItem('sb_auth_token', 'simulated-jwt-token-xyz123');
    localStorage.setItem('sb_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('sb_auth_token');
    localStorage.removeItem('sb_user');
  };

  const resetTimer = () => {
    setTimeLeft(120);
  };

  // Buggy transfer logic (contains negative inputs and overflows)
  const executeTransfer = (fromAccount, recipientName, recipientAccount, amountStr, category, notes) => {
    // Buggy AI Code: parses as float directly without verifying if amount is negative
    const amount = parseFloat(amountStr);
    
    if (isNaN(amount)) {
      return { success: false, message: "Invalid amount input format." };
    }

    // Buggy Validation logic: forgot to check if amount <= 0
    // (If transfer amount is negative, e.g., -5000, checkingBalance - (-5000) = checkingBalance + 5000)
    if (fromAccount === 'checking') {
      if (checkingBalance < amount) {
        return { success: false, message: "Error: Insufficient funds in checking account." };
      }
      setCheckingBalance(prev => prev - amount);
    } else if (fromAccount === 'savings') {
      if (savingsBalance < amount) {
        return { success: false, message: "Error: Insufficient funds in savings account." };
      }
      setSavingsBalance(prev => prev - amount);
    } else {
      return { success: false, message: "Invalid origin account selected." };
    }

    // Create credit or debit record depending on positive/negative
    // Buggy UI displays positive amounts as Credits and negative amounts as Debits
    const isDebit = amount >= 0;
    const newTx = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      type: isDebit ? 'Debit' : 'Credit',
      category: category || 'Transfer',
      description: `Transfer to Acct #${recipientAccount} (${recipientName}) - ${notes || 'No description'}`,
      amount: isDebit ? -amount : Math.abs(amount), // Buggy arithmetic
      status: 'Completed'
    };

    setTransactions(prev => [newTx, ...prev]);
    return { success: true, message: `Successfully simulated wire of $${amount.toFixed(2)} to ${recipientName}.` };
  };

  // Custom UI Arithmetic error:
  // Adds checking and savings, but does direct string concatenation if checkingBalance or savingsBalance are modified into string forms.
  // We can force this bug to exist in UI representation by returning a concatenated string under certain simulated conditions or adding investment incorrectly.
  const getPortfolioValue = () => {
    // Buggy AI summation that does checkingBalance + savingsBalance + investmentBalance
    // But is written with a buggy type conversion check
    const val1 = checkingBalance;
    const val2 = savingsBalance;
    // Bug: under specific conditions, let's treat the third value as string to trigger concatenation
    if (transactions.length % 2 === 0) {
      // Inadvertently converts numbers to string representation or does incorrect addition (e.g. missing investment)
      return val1 + val2; // Leaves out investment balance entirely! (Dashboard display bug)
    }
    return val1 + val2 + investmentBalance;
  };

  return (
    <BankContext.Provider value={{
      isLoggedIn,
      user,
      checkingBalance,
      savingsBalance,
      investmentBalance,
      transactions,
      timeLeft,
      handleLogin,
      handleLogout,
      resetTimer,
      executeTransfer,
      getPortfolioValue,
      setTransactions,
      setCheckingBalance,
      setSavingsBalance
    }}>
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => useContext(BankContext);
