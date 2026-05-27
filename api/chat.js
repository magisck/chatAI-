const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.dify.ai/v1/chat-messages",
      {
        inputs: {},
        query: message,
        response_mode: "blocking",
        user: "girlfriend"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      reply: response.data.answer
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: "AI 回复失败"
    });
  }
});

module.exports = app;
