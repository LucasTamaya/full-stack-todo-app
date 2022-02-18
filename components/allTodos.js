import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
const axios = require("axios");

const AllTodos = ({ allTodos, setAllTodos }) => {
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

    console.log(data);
  };

  return (
    <div>
      {allTodos.length > 0 && (
        <div className="w-full p-10 sm:max-w-screen-md mx-auto">
          <h2 className="text-violet-700 font-bold mb-5">TODOS</h2>
          {allTodos.map((x) => (
            <ul key={x._id} className="flex flex-col">
              <li className="border-2 p-3 border-violet-700 mb-2 flex justify-between text-violet-700">
                {x.title}
                <div>
                  <DoneIcon className="border border-violet-700 text-violet-700 cursor-pointer transition ease-out mr-2 hover:scale-110" />
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
    </div>
  );
};

export default AllTodos;
