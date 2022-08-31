const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ValidationError } = require("express-validation");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");
const categoryRoutes = require("./routes/category");
const tagRoutes = require("./routes/tag");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/note", noteRoutes);
app.use("/category", categoryRoutes);
app.use("/tag", tagRoutes);


// app.use((error, req, res, next) => {
//   console.log(error);
//   const status = error.statusCode || 500;
//   const message = error.message;
//   const data = error.data;
//   res.status(status).json({ message: message, data: data });
// });

// express error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(400).send(error);
  } else {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).send({ message: message, data: data });
  }
});

mongoose
  .connect(
    "mongodb+srv://bob:bob334455@cluster0.zokh2cp.mongodb.net/notesApp?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080);
    console.log("database connecting and running")
  })
  .catch((err) => console.log(err));
