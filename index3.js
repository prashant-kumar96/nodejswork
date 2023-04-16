import express from "express";
const app = express();
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Client } from "./mongo.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/", async (req, res) => {
  console.log(req.body);
  let client = await Client();
  //code to enter data into mongodb
  const run = async () => {
    try {
      const database = client.db("learncrud");
      const details = database.collection("details");
      const data = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
      };
      const result = await details.insertOne(data, { unique: true });

      console.log(result);
      if (result) {
        console.log(
          `Registration successful with the _id: ${result.insertedId}`
        );

        res.sendFile(__dirname + "/public/login.html");
      }
    } finally {
      await client.close();
    }
  };

  run().catch(console.dir);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  //code to enter data into mongodb
  let client = await Client();
  const run = async () => {
    try {
      const database = client.db("learncrud");
      const details = database.collection("details");

      const result = await details.findOne({ email: req.body.email });
      console.log(result.password);
      if (result.password === req.body.password) {
        console.log("login success");
        res.sendFile(__dirname + "/public/dashboard.html");
      } else {
        console.log("login failked");
      }
    } finally {
      await client.close();
    }
  };

  run().catch(console.dir);
});

app.get("/api", async (req, res) => {
  let client = await Client();
  const run = async () => {
    try {
      let database = client.db("learncrud");
      // let details = database.collection("details");
      let details = database.collection("products");
      let result = await details.find({}).toArray();
      res.send(result);
    } finally {
      await client.close();
    }
  };
  run().catch(console.dir);
});

app.delete("/", async (req, res) => {
  let client = await Client();
  const run = async () => {
    try {
      let database = client.db("learncrud");
      let details = database.collection("details");
      let result = await details.deleteOne({ name: "pk" });
      console.log(result);
      res.send(result);
    } finally {
      await client.close();
    }
  };
  run().catch(console.dir);
});
app.listen("3000", (err) => {
  if (err) console.log(err);
  console.log("server started on port 3000");
});
