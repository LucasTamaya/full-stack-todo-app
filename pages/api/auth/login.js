import mongoose from "mongoose";
import User from "../models/user";

mongoose.connect("mongodb://localhost:27017/todoApp");

export default async function handler(req, res) {
  const { email, password } = req.body;

  //  Todo: 
  let userData = await User.findOne({});

  res.status(200).json({ name: "codedamn" });
}
