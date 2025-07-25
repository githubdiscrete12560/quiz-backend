const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Set these from your Supabase project
const SUPABASE_URL = 'https://kxbhmwlqlykdyaeeblld.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4Ymhtd2xxbHlrZHlhZWVibGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MTQzNzgsImV4cCI6MjA2ODk5MDM3OH0.ZkfAoE9Ap1hCkdL_1TZU-8zCqMZF7DFSptGBq3VVeY4';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Endpoint to receive quiz result
app.post('/submit', async (req, res) => {
  const { name, answer, isCorrect } = req.body;
  const { error } = await supabase
    .from('quiz_results')
    .insert([{ name, answer, isCorrect }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: true });
});

app.get('/', (req, res) => {
  res.send('Quiz API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));
