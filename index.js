const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

app.get('/api/dog-fact', async (req, res) => {
  try {
    const response = await axios.get('http://dog-api.kinduff.com/api/facts');
    const dogFact = response.data.facts[0];

    const htmlContent = `
      <div class="fact">
        <p>${dogFact}</p>
        <button 
          hx-delete="http://localhost:8080/api/dog-fact"
          hx-confirm="Are you sure?"
          hx-target="closest .fact"
          hx-swap="outerHTML swap:1s"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(htmlContent);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/api/dog-fact', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
