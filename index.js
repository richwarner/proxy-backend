const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 4000;

const RUST_SERVER_URL = "http://127.0.0.1:3030";

app.use(cors());
app.use(express.json());

app.post("/forward", async (req, res) => {
  try {
    const { input_data, input_shapes, output_data } = req.body;
    const response = await axios.post(`${RUST_SERVER_URL}/forward`, {
      input_data,
      input_shapes,
      output_data,
    });
    console.log("Response from Rust server:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("Error forwarding request to Rust server:", error.message);
    res.status(500).send("Error forwarding request to Rust server");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
