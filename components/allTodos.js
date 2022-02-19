import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
const axios = require("axios");

const AllTodos = ({ allTodos, setAllTodos }) => {
  // const [allTodosFront, setAllTodosFront] = useState()
  const [errorMessage, setErrorMessage] = useState("");

  // header avec le JWT pour les requête vers l'api
  const headersConfig = {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  };

  const deleteTodo = async (todoId) => {
    // supprime la todo de la liste directement du front pour la rapidité puis dans MongoDB
    setAllTodos(allTodos.filter((x) => x._id != todoId));

    const res = await axios.delete(
      `http://localhost:3000/api/todos/${todoId}`,
      headersConfig
    );

    const data = await res;
  };

  //   fonction qui update la todo et prend en para l'id de la todo et son etat (false or true)
  const updateTodo = async (todoId, doneState) => {
    //   update la todo directement du front pour la rapidité car sinon besoin de re récupérer toutes les todos etc ...
    // om map dans toutes les todos, on trouve la todo a update et on update son state avec la state inverse
    setAllTodos(
      allTodos.map((x) => {
        if (x._id != todoId) {
        }
        if (x._id === todoId) {
          return { ...x, done: doneState };
        }
        return x;
      })
    );
    const res = await axios.put(
      `http://localhost:3000/api/todos/${todoId}`,
      {
        doneState: doneState, //afin d'update l'etat, on envoit l'etat inverse (si true, on renvoit false et inversement)
      },
      headersConfig
    );

    const data = await res;

    // si erreur avec le JWT
    if (data.data.message === "JWT error") {
      setErrorMessage("Error, you must be connected");
    }
  };

  return (
    <div>
      {allTodos.length > 0 && (
        <div className="w-full p-10 sm:max-w-screen-md mx-auto">
          {/* <h2 className="text-violet-700 font-bold mb-5">TODOS</h2> */}
          {allTodos.map((x) => (
            <ul key={x._id} className="flex flex-col">
              <li
                className={`${"border-2 p-3 border-violet-700 mb-5 flex justify-between text-violet-700 rounded"} ${
                  x.done ? "line-through" : "no-underline"
                }`}
              >
                {x.title}
                <div>
                  <DoneIcon
                    className={`${"mr-2 cursor-pointer"} ${
                      x.done
                        ? "bg-violet-700 text-white" //si done == true
                        : "border border-violet-700 text-violet-700" //si donne == false
                    }`}
                    onClick={() => updateTodo(x._id, !x.done)}
                  />
                  <CloseIcon
                    className="border border-red-500 text-red-500 cursor-pointer transition ease-out hover:bg-red-500 hover:text-white"
                    onClick={() => deleteTodo(x._id)}
                  />
                </div>
              </li>
            </ul>
          ))}
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default AllTodos;
