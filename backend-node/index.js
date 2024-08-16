// imports
const cors = require("cors");
const dotenv = require("dotenv");
const { db } = require("./models");
const express = require("express");
const bodyParser = require("body-parser");
const { userRoutes, postRoutes, commentRoutes } = require("./routes");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// initialize
const app = express();
const port = process.env.PORT || 8080;

// configurations
dotenv.config();
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/comments", commentRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);

  db.authenticate().then(() => {
    console.log("authenticated");
  });
  db.sync({ force: false, alter: true })
    .then(() => {
      console.log("Tables Created Successfully");
    })
    .catch((err) => {
      console.log("error from index.js", err);
    });
});
