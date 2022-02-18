import { connectToDatabase } from "../../utils/mongodb";
import { nextCors } from "../../utils/cors";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  // connexion à MongoDB
  const { db } = await connectToDatabase();

  // middleware CORS
  await nextCors(req, res);

  const token = req.headers["x-access-token"];

  // si aucune erreur avec le JWT
  try {
    const authenticatedUser = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // todo envoyé par l'utilisateur
    const { todo } = req.body;

    console.log(todo);

    // trouve l'utilisateur
    const user = await db
      .collection("users")
      .find({ email: authenticatedUser })
      .toArray();

    // récupère son id
    const userId = user[0]._id;

    // enregistre la nouvelle todo dans MongoDB
    const newTodo = await db.collection("todos").insertOne({
      title: todo,
      userId: userId,
      done: false,
      date: new Date(Date.now()),
    });

    // si erreur lors l'ajout de la todo
    if (!newTodo) {
      console.log("error during the insertion");
      return res.send({ message: "Fetch error" });
    }

    // si aucune erreur
    if (newTodo) {
      //   récupère les todos correspondant à l'utilisateur
      const userTodos = await db
        .collection("todos")
        .find({ userId: userId })
        .toArray();

      // si erreur lors de la récupération des todos de l'utilisateur
      if (!userTodos) {
        console.log("error during the fetch of user todos");
        res.send({ message: "Fetch error" });
      }

      //   si aucune erreur, on renvoit toutes les todos au front
      if (userTodos) {
        console.log("recuperation de toutes les todos");
        return res.status(200).json(userTodos);
      }
    }
  } catch (err) {
    console.log(err);
    return res.send({ message: "JWT error" });
  }
}

/*

{ 
   "_id": randomly auto-generated _id by mongodb,
   "title": "bring milk",
   "userid": user documents _id field, 
   "done": false (this should be a boolean value, and should be false when the user creates the todo),
   "time":  date object
}
*/
