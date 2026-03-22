import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/matches", async (req, res) => {
  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/SA/matches", {
      headers: { "X-Auth-Token": process.env.API_KEY }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Errore nel proxy" });
  }
});

app.listen(PORT, () => console.log(`Proxy attivo su porta ${PORT}`));
