const express = require("express");
const mongoose = require("mongoose");
const DBConnect = require("./src/connection/database.js");
const userModel = require("./src/model/userModel.js");
const app = express();

//ENV
const ENV_PORT = 7777;

app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const user = {
      firstName: "jAI",
      lastName: "Nandham",
      emailId: "abc@gmail.com",
    };
    const dbSuccess = await userModel.insertOne(user);
    console.log(dbSuccess)
    res.send("Signup Request Success ");
  } catch {
    res.status(400).send("Something Went Wrong");
  }
});

app.use("/", (req, res) => {
  console.log("Inside Route");
  res.send("Hello World");
});

DBConnect.then(() => {
  console.log("Db Connection Successful");
  app.listen(ENV_PORT, () => {
    console.log(`Listening on Port ${ENV_PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
