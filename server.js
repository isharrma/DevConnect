const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("API running"));

// The first will look for env. variable PORT as it will be assigned by heroku,
// if not found then host it on port no. 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
