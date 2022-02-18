import { useEffect, useState } from "react";
const axios = require("axios");

const Todos = () => {
  useEffect(() => {}, []);

  // va contenir la todo a ajouter
  const [todo, setTodo] = useState("");

  // va contenir toutes les todos à afficher
  const [allTodos, setAllTodos] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();

    // header avec le JWT pour la requête vers l'api
    let config = {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      },
    };

    const res = await axios.post(
      "http://localhost:3000/api/create-todo",
      {
        todo: todo,
      },
      config
    );

    const data = await res;

    if (data.data.message === "JWT error") {
      setErrorMessage("Error, you must be connected");
    }

    if (data.data.message === "Fetch error") {
      setErrorMessage("Internal server error during the fetch of the data");
    }

    if (!data.data.message) {
      setAllTodos([...allTodos, data.data]);
      console.log(data);
      console.log(allTodos);
    }
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-bold text-center">
        Here is your Todo List {localStorage.getItem("userName")}
      </h1>
      <form className="flex flex-col items bg-red w-full p-10	gap-y-3 sm:max-w-screen-md	mx-auto">
        <label className="text-violet-700 font-bold">Add Todo</label>
        <input
          type="text"
          name="todo"
          placeholder="Add new todo"
          onChange={(e) => setTodo(e.target.value)}
          className="border-2 border-violet-700 p-1 focus:outline-0"
        />
        <button
          onClick={addTodo}
          className="bg-violet-700 rounded-2xl py-1 px-7 w-fit text-white"
        >
          Add
        </button>
      </form>
      {allTodos.length > 0 && (
        <div>
          <h2>TODOS</h2>
          {allTodos.map((x) => (
            <div key={x._id}>
              <p>{x.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Todos;
