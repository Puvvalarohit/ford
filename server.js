// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";
const RAPIDAPI_KEY = "YOUR_RAPIDAPI_KEY"; // Replace with your key

app.post("/run", async (req, res) => {
  const { language_id, source_code, stdin } = req.body;

  try {
    const response = await axios.post(JUDGE0_API_URL, {
      language_id,
      source_code,
      stdin
    }, {
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
      }
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
