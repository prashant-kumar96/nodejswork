import mongoose from "mongoose";
const { Schema } = mongoose;

const detailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const insertInDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Prashant:prashant123@cluster0.udmreuk.mongodb.net/learncrud",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const detailsModel = mongoose.model("details", detailsSchema);
    let data = new detailsModel({
      name: "prashant",
      number: 89273423,
      email: "pk@gmail.com",
      password: "12356",
    });

    let result = await data.save();
    console.log(result);
  } finally {
  }
};

// insertInDb();
const updateInDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Prashant:prashant123@cluster0.udmreuk.mongodb.net/learncrud"
  );

  const Details = mongoose.model("details", detailsSchema);
  let data = await Details.updateOne(
    { email: "gs@gmail.com" },
    {
      $set: { email: "gurmeet@gmail.com" },
    }
  );

  console.log(data);
};

// updateInDb();

const deleteInDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Prashant:prashant123@cluster0.udmreuk.mongodb.net/learncrud"
  );

  const Details = mongoose.model("details", detailsSchema);
  const data = await Details.deleteOne({
    name: "prashant",
  });
  console.log(data);
};

// deleteInDb();
const findInDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Prashant:prashant123@cluster0.udmreuk.mongodb.net/learncrud"
  );
  const Details = mongoose.model("details", detailsSchema);
  const data = await Details.find();
  console.log(data);
};

findInDb();
