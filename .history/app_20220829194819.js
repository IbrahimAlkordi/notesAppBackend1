const express = require("express");
const app = express();

const authRoutes = require("./routes/auth");
app.use("/auth",authRoutes);

app.listen(8080);