/* node integrated `import`, so const/require is not necessary after including `"type": "module"` on package.json */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// *** In NODE, you DO HAVE TO add the file type, i.e. `.js`;
import postRoutes from "./Routes/posts.js";
/*
**** To Set Up a Server ****
  1. Module variables
  2. Connection variables
  3. Connect to DataBase using Module and Connection Variables
*/

// 1. **** Set-Up Module variables ****
const app = express();

// initialize `dotenv` to read `.env`
dotenv.config();
// use bodyParser to send requests to server
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// use CORS for server/client headers
app.use(cors());

// **** ROUTES ****
// every route on `postRoutes` will prefix with `/posts`
app.use("/posts", postRoutes);

// 2. **** Set-Up Connection Variables ****
// `CONNECTION_URL` and `PORT` on `.env` as per sec. standards
// use process PORT (from hosting site) or alt port #
const PORT = process.env.PORT || 5000;

// 3. **** Connect to DataBase ****
// mongoose to connect to db, process returns promise
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  // always add `catch` statement for errors
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set("useFindAndModify", false);
