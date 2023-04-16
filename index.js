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

app.delete("/delete/:id", async (req, resp) => {
  console.log(req.params, "helloeowle");
  const result = await ProductModel.deleteOne({ _id: req.params.id });
  console.log(result);
});

app.put("/update/:id", async (req, resp) => {
  console.log(req.params, "helloeowle");
  const result = await ProductModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: "mi",
        price: "18000",
        brand: "China",
      },
    }
  );
  console.log(result);
  if (result.acknowledged) {
    resp.send("updated the data");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
