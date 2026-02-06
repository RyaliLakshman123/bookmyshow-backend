require("dotenv").config();

const express = require("express");
const cors = require("cors");

const homeRoutes = require("./routes/home.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("✅ BookMyShow Backend Running");
});

// Home API
app.use("/", homeRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
