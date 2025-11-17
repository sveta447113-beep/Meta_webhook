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

import axios from "axios";

app.post("/webhook", express.json(), async (req, res) => {
  console.log("POST /webhook:", JSON.stringify(req.body).slice(0,1500));

  try {
    await axios.post(
      "https://hook.eu1.make.com/t5evx2td7jkp97vsfu42pfpumuzjseiw",
      req.body
    );
    console.log("➡ Successfully sent to Make.com");
  } catch (error) {
    console.error("❌ Error sending to Make.com:", error.message);
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Webhook server running"));
