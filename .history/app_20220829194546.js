const express = require("express");
const app = express();

const authRoutes = require("./routes/authentication");
app.use("/auth",authRoutes)

app.listen(8080);