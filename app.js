const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userModel = require("./src/model/userModel.js");
const DBConnect = require("./src/connection/database.js");

//ENV
const ENV_PORT = 7777;

app.use(express.json())

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const user = {
      firstName,
      lastName,
      emailId,
      password
    }
    const isEmailUnique = await userModel.findOne({ emailId: emailId });
    if (isEmailUnique) {
      throw new Error("Email Id Already Exists")
    }

    const dbSuccess = await userModel.insertOne(user);
    // console.log(dbSuccess)
    res.send("User Registered Successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(`Error : ${error}`);
  }
});

app.get("/user", async (req, res) => {
  try {
    const dbSuccess = await userModel.find({});

    res.send(dbSuccess);
  } catch (err) {
    console.log(err)
    res.status(500).send("Something Went Wrong");
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
