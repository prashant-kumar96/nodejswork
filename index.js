import express from "express";
import "./config.js";
const app = express();
import ProductModel from "./product.js";

app.use(express.json());
app.post("/create", async (req, resp) => {
  console.log(req.body);
  const data = new ProductModel(req.body);
  const result = await data.save();
  console.log(result);
  resp.send(result);
});

app.get("/list", async (req, resp) => {
  const data = await ProductModel.find();
  resp.send(data);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
