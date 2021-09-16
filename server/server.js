const express = require("express");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "..", "public");

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server is up at ${PORT}`);
});
