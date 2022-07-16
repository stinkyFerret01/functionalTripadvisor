const express = require("express");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const cors = require("cors");
require("dotenv").config();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "Lafon Christophe",
  key: process.env.API_KEY,
});
const app = express();

app.use(express.json());
app.use(cors());

app.post("/send-email", (req, res) => {
  console.log(req.body);
  try {
    mg.messages
      .create(process.env.MAIL_GUN, {
        from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}>`,
        to: process.env.MAIL,
        subject: req.body.subject,
        text: req.body.message,
      })
      .then((msg) => res.json(msg.message)) // logs response data
      .catch((err) => res.json(err.message)); // logs any error
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.all("*", (req, res) => {
  res.status(404).json("Cette route n'existe pas");
});

app.listen(3000, () => {
  console.log("Server started");
});
