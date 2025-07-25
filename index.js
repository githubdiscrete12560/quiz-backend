const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Set these from your Supabase project
const SUPABASE_URL = 'https://YOUR-SUPABASE-URL.supabase.co';
const SUPABASE_KEY = 'YOUR-SUPABASE-ANON-KEY';
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
