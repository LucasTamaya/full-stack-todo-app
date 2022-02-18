import { connectToDatabase } from "../../../utils/mongodb";
import { nextCors } from "../../../utils/cors";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  // connexion a MongoDB
  const { db } = await connectToDatabase();

  // middleware cors
  await nextCors(req, res);

  const { email, password } = req.body;

  //   vérifie que l'utilisateur n'existe pas dans MongoDB
  const existingUser = await db
    .collection("users")
    .find({ email: email })
    .toArray();

  // si utilisateur existant
  if (existingUser.length >= 1) {
    console.log("utilisateur existant");

    // on vérifie les mots de passe hashé
    const isMatch = await bcrypt.compare(password, existingUser[0].password);

    // si erreur avec le pwd
    if (!isMatch) {
      console.log("mot de passe incorrect");
      return res.send({ message: "Login error" });
    }

    // si aucune erreur avec le pwd
    if (isMatch) {
      // récupère le nom de l'utilisateur
      const name = existingUser[0].name;

      // création du JWT avec l'email
      const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
      return res.status(200).send({accessToken: accessToken, userName: name});
    }
  }

  //   si utilisateur non existant
  if (existingUser.length < 1) {
    console.log("utilisateur non existant");
    return res.send({ message: "Login error" });
  }
}
