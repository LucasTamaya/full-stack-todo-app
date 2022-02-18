import { connectToDatabase } from "../../utils/mongodb";
import { nextCors } from "../../utils/cors";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  // connexion a MongoDB
  const { db } = await connectToDatabase();

  const token = req.headers["x-access-token"];

  //   vérification du JWT
  try {
    const authenticatedUser = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // récupère l'utilisateur
    const user = await db
      .collection("users")
      .find({ email: authenticatedUser })
      .toArray();

    // récupere son id
    const userId = user[0]._id;

    // recupere toutes les todos correspondant à l'id de l'utilisateur
    const userTodos = await db.collection("todos").find({ userId: userId }).toArray();

    return res.status(200).json(userTodos)
    // console.log(userTodos)

  } catch (err) {
    console.log(err);
    return res.send({ message: "JWT error" });
  }

  console.log("hello");

  // middleware cors
  await nextCors(req, res);
}
