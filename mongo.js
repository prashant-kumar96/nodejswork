import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://Prashant:prashant123@cluster0.udmreuk.mongodb.net/test";
export const Client = async () => {
  const client = new MongoClient(uri);
  return client;
};
