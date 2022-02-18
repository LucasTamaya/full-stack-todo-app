import { connectToDatabase } from "../../../utils/mongodb";
import { nextCors } from "../../../utils/cors";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  // connexion à MongoDB
  const { db } = await connectToDatabase();

  // middleware CORS
  await nextCors(req, res);

  // récupère les données de l'utilisateur
  const { email, name, password } = req.body;

  //   vérifie que l'utilisateur n'existe pas dans MongoDB
  const existingUser = await db
    .collection("users")
    .find({ email: email })
    .toArray();

    // si utilisateur existant
  if (existingUser.length >= 1) {
    console.log("utilisateur existant");
    return res.send({ message: "Existing user error" });
  }

//   si utilisateur non existant
  if (existingUser.length < 1) {
    console.log("nouvel utilisateur");
    // hash du password avec bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // enregistre le nouvel utilisateur dans MongoDB
    const newUser = await db.collection("users").insertOne({
      email: email,
      name: name,
      password: hashPassword,
    });
    // création du JWT (Json Web Token) avec l'email 
    const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
    console.log("access token", accessToken);
    res.status(200).send({accessToken: accessToken, userName: name});
  }
}
