import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// ⭐ ABILITA CORS PER TUTTE LE ROTTE
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// ⭐ SERIE A
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

// ⭐ MONDIALI
app.get("/wc-matches", async (req, res) => {
  try {
    const response = await fetch("https://api.football-data.org/v4/competitions/WC/matches", {
      headers: { "X-Auth-Token": process.env.API_KEY }
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Errore nella chiamata ai Mondiali:", error);
    res.status(500).json({ error: "Errore nel proxy Mondiali" });
  }
});

// ⭐ PING PER TENERE SVEGLIO RENDER
app.get("/ping", (req, res) => {
  res.send("ok");
});

app.listen(PORT, () => console.log(`Proxy attivo su porta ${PORT}`));

