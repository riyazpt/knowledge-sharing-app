import express from "express";
import path from "path";
import methodOverride from "method-override";
import session from "express-session";
import expressMessages from "express-messages";
import flash from "connect-flash";

import { fileURLToPath } from "url";
import passport from "./config/passport.js";
import { connectDb } from "./config/db/db.js";
import articleRoute from "./routes/articleRoute.js";
import userRoute from "./routes/userRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
connectDb();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  //console.log('User:', req.user);
  res.locals.user = req.user;
  res.locals.messages = expressMessages(req, res);
  next();
});
app.use(express.json());
app.use("/", articleRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
