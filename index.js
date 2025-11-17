import express from "express";
const app = express();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "salon_verif_2025";

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified!");
      return res.status(200).send(challenge);
  } else {
      console.log("Verification failed");
      return res.sendStatus(403);
  }
});

app.post("/webhook", express.json(), (req, res) => {
  console.log("POST /webhook:", JSON.stringify(req.body).slice(0,1500));
  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Webhook server running"));
