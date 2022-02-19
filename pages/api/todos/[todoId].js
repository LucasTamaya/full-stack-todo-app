import { connectToDatabase } from "../../../utils/mongodb";
import { nextCors } from "../../../utils/cors";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongodb = require("mongodb");

export default async function handler(req, res) {
  // connexion a MongoDB
  const { db } = await connectToDatabase();

  // middleware cors
  await nextCors(req, res);

  //   recupere le JWT
  const token = req.headers["x-access-token"];

  //   verification du JWT

  try {
    const authenticatedUser = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // suppression todo
    if (req.method === "DELETE") {
      // recupere l'id de la todo a supprimer
      const { todoId } = req.query;

      console.log(todoId);

      // supprime la todo de la base de donnée
      const deleteTodo = await db
        .collection("todos")
        .deleteOne({ _id: new mongodb.ObjectId(todoId) });

      console.log(deleteTodo);

      console.log("todo supprimer avec succes");
      return res.status(200).send({ message: "todo supprimer" });
    }

    // Mise a jour todo
    if (req.method === "PUT") {
      // recupere l'id de la todo
      const { todoId } = req.query;

      //   recupere l'etat de la todo
      const { doneState } = req.body;

      //   udpate la todo
      const updateTodo = await db.collection("todos").updateOne(
        { _id: new mongodb.ObjectId(todoId) }, //filtre
        { $set: { done: doneState } } //$set -> atomic operators mongodb afin d'update
      );

      console.log("todo update avec succes");
      return res.status(200).send({ message: "update reussi" });
    }
  } catch (err) {
    console.log(err);
    return res.send({ message: "JWT error" });
  }
}
