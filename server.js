import cors from 'cors';
import axios from 'axios';
import express, { json } from 'express';

const app = express();
const port = 5000;

const BASE_URL = 'https://newsapi.org/v2/everything';
const API_KEY = 'b59fac3a063e4125b1bd5dc3d885938f';

app.use(
  cors({
    origin: ['https://forex-news-aggregator-backend.vercel.app'],
    method: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(json());

app.get('/', (req, res) => {
  res.json('Hello');
});

app.get('/api/news', async (req, res) => {
  const { query, language } = req.query;
  const lang = language || 'en';

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        apiKey: API_KEY,
        language: lang,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
