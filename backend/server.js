import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const DATA_FILE = './data.json';

app.use(cors());
app.use(express.json());

// Initialize data structure
const defaultData = {
  user: {
    user_id: 1,
    annual_salary: 85000,
    age: 32,
    current_balance: 28450,
    ytd_contributions: 6200,
    ytd_employer_match: 2480
  },
  contributions: [
    {
      id: 1,
      user_id: 1,
      contribution_type: 'percentage',
      contribution_value: 8,
      updated_at: new Date().toISOString()
    }
  ]
};

// Load or create data file
let data = defaultData;
try {
  if (fs.existsSync(DATA_FILE)) {
    const fileData = fs.readFileSync(DATA_FILE, 'utf8');
    data = JSON.parse(fileData);
  } else {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  }
} catch (err) {
  console.log('Using default data');
}

// Helper to save data
function saveData() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Get current contribution settings
app.get('/api/contribution', (req, res) => {
  const latest = data.contributions[data.contributions.length - 1];
  res.json({
    contribution_type: latest.contribution_type,
    contribution_value: latest.contribution_value
  });
});

// Update contribution settings
app.post('/api/contribution', (req, res) => {
  const { contribution_type, contribution_value } = req.body;
  
  if (!contribution_type || contribution_value === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!['percentage', 'fixed'].includes(contribution_type)) {
    return res.status(400).json({ error: 'Invalid contribution type' });
  }

  const newContribution = {
    id: data.contributions.length + 1,
    user_id: 1,
    contribution_type,
    contribution_value,
    updated_at: new Date().toISOString()
  };

  data.contributions.push(newContribution);
  saveData();

  res.json({ 
    success: true, 
    contribution_type, 
    contribution_value 
  });
});

// Get user data for dashboard
app.get('/api/user', (req, res) => {
  res.json(data.user);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
