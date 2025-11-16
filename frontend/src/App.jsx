import { useState, useEffect } from 'react'

const API_BASE = 'http://localhost:3001/api';

function App() {
  const [userData, setUserData] = useState(null);
  const [contributionType, setContributionType] = useState('percentage');
  const [contributionValue, setContributionValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/user`).then(r => r.json()),
      fetch(`${API_BASE}/contribution`).then(r => r.json())
    ])
      .then(([user, contribution]) => {
        setUserData(user);
        setContributionType(contribution.contribution_type);
        setContributionValue(contribution.contribution_value);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data. Is the backend running?');
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await fetch(`${API_BASE}/contribution`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contribution_type: contributionType,
          contribution_value: contributionValue
        })
      });

      if (!response.ok) throw new Error('Failed to save');

      setSuccessMessage('Contribution settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const calculateAnnualContribution = () => {
    if (!userData) return 0;
    
    if (contributionType === 'percentage') {
      return (userData.annual_salary * contributionValue) / 100;
    }
    return contributionValue * 26; // biweekly
  };

  const calculateRetirementProjection = () => {
    if (!userData) return 0;

    const annualContribution = calculateAnnualContribution();
    const employerMatch = Math.min(annualContribution, userData.annual_salary * 0.04); // 4% match cap
    const totalAnnualContribution = annualContribution + employerMatch;
    const yearsToRetirement = 65 - userData.age;
    const annualReturn = 0.07; // 7% average return

    let futureValue = userData.current_balance;
    for (let i = 0; i < yearsToRetirement; i++) {
      futureValue = futureValue * (1 + annualReturn) + totalAnnualContribution;
    }

    return futureValue;
  };

  if (loading) {
    return <div className="app"><div className="loading">Loading...</div></div>;
  }

  if (!userData) {
    return <div className="app"><div className="error">Failed to load user data</div></div>;
  }

  const projectedValue = calculateRetirementProjection();
  const annualContribution = calculateAnnualContribution();
  const perPaycheck = contributionType === 'percentage' 
    ? (userData.annual_salary * contributionValue) / 100 / 26
    : contributionValue;

  return (
    <div className="app">
      <div className="header">
        <h1>Manage Your 401(k) Contributions</h1>
        <p>Adjust your retirement savings to meet your financial goals</p>
      </div>

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="card">
        <h2>Year-to-Date Summary</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">Your Contributions</div>
            <div className="stat-value">${userData.ytd_contributions.toLocaleString()}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Employer Match</div>
            <div className="stat-value">${userData.ytd_employer_match.toLocaleString()}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Current Balance</div>
            <div className="stat-value">${userData.current_balance.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Contribution Settings</h2>
        
        <div className="contribution-type">
          <button
            className={`type-button ${contributionType === 'percentage' ? 'active' : ''}`}
            onClick={() => setContributionType('percentage')}
          >
            Percentage of Salary
          </button>
          <button
            className={`type-button ${contributionType === 'fixed' ? 'active' : ''}`}
            onClick={() => setContributionType('fixed')}
          >
            Fixed Amount per Paycheck
          </button>
        </div>

        <div className="slider-container">
          <div className="slider-header">
            <span className="slider-label">
              {contributionType === 'percentage' ? 'Contribution Percentage' : 'Amount per Paycheck'}
            </span>
            <span className="slider-value">
              {contributionType === 'percentage' 
                ? `${contributionValue}%` 
                : `$${contributionValue.toLocaleString()}`}
            </span>
          </div>
          <input
            type="range"
            className="slider"
            min="0"
            max={contributionType === 'percentage' ? 50 : 1000}
            step={contributionType === 'percentage' ? 1 : 10}
            value={contributionValue}
            onChange={(e) => setContributionValue(Number(e.target.value))}
          />
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-label">Per Paycheck</div>
            <div className="stat-value">${perPaycheck.toFixed(0)}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Annual Contribution</div>
            <div className="stat-value">${annualContribution.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
          </div>
        </div>

        <div className="impact-section">
          <h3>Projected Balance at Retirement (age 65)</h3>
          <div className="impact-value">
            ${projectedValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
          </div>
          <div className="impact-description">
            Based on your current balance of ${userData.current_balance.toLocaleString()}, 
            contributing ${contributionType === 'percentage' ? contributionValue + '%' : '$' + contributionValue + ' per paycheck'} 
            for {65 - userData.age} years with an average 7% annual return and employer match.
          </div>
        </div>

        <div className="button-group">
          <button 
            className="button button-secondary"
            onClick={() => {
              fetch(`${API_BASE}/contribution`).then(r => r.json()).then(c => {
                setContributionType(c.contribution_type);
                setContributionValue(c.contribution_value);
              });
            }}
          >
            Reset
          </button>
          <button 
            className="button button-primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
