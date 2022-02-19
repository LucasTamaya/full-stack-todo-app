import { useEffect, useState } from "react";
import AllTodos from "../components/allTodos";
import ErrorMessage from "../components/ErrorMessage";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form"; //librairie afin de faciliter la mise en place de formulaire
import * as Yup from "yup"; //librairie afin de faciliter la gestion d'erreur des champs de mon formulaire
import { yupResolver } from "@hookform/resolvers/yup"; //nécessaire afin d'utiliser "react-hook-form" et "yup" ensemble
const axios = require("axios");
const template = require("../utils/template");

const TodoPage = () => {
  // va contenir toutes les todos à afficher
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // header avec le JWT pour les requête vers l'api
  const headersConfig = {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  };

  // faire les redirections nécessaires
  const router = useRouter();

  const fetching = async () => {
    const res = await axios.get(`${template}api/todos`, headersConfig);
    const data = await res;

    // si erreur avec le JWT
    if (data.data.message === "JWT error") {
      router.reload(window.location.pathname);
      setErrorMessage("Error, you must be connected");
      setLoading(false);
    }

    // si aucune erreur
    if (!data.data.message) {
      setAllTodos(data.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetching();
    console.log(allTodos);
  }, []);

  // schema de validation de notre formulaire avec gestion d'erreurs inclus
  // en gros on stipule ici ce qu'on veut recevoir comme data de la part de l'utilisateur, et si il ne respecte pas les règles misent en place, on triger les messages d'erreur entre ()
  const validationSchema = Yup.object({
    todo: Yup.string()
      .required("You must enter something to add")
      .min(2, "Error"), //message d'erreur si on ne remplit pas le champ
  }).required();

  // import des composantss afin de vérifier nos formulaires
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), //on indique à react-hook-form d'utiliser notre validationSchema afin de traiter les erreurs
  });

  const addTodo = async (input) => {
    const res = await axios.post(
      `${template}api/create-todo`,
      {
        todo: input.todo,
      },
      headersConfig
    );

    // une fois data envoyée, on reinitialise le formulaire
    reset();

    const data = await res;

    if (data.data.message === "JWT error") {
      setErrorMessage("Error, you must be connected");
    }

    if (data.data.message === "Fetch error") {
      setErrorMessage("Internal server error during the fetch of the data");
    }

    if (!data.data.message) {
      setAllTodos(data.data);
    }
  };

  return (
    <div>
      <Header />
      {allTodos.length === 0 && (
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-center">
            Here is your Todo List {localStorage.getItem("userName")}
          </h1>
          <form
            className="flex flex-col items bg-red w-full p-10 gap-y-3 sm:max-w-screen-md mx-auto"
            onSubmit={handleSubmit(addTodo)}
          >
            <label className="text-violet-700 font-bold">Add Todo</label>
            <Controller
              control={control}
              name="todo"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div>
                  <input
                    type="text"
                    placeholder="Add new todo"
                    value={value || ""}
                    className="border-2 border-violet-700 p-1 focus:outline-0 w-full"
                    onChange={onChange}
                  />
                  {/* si il y a une erreur dans le champs, on affiche le message correspondant à l'erreur */}
                  {!!error && (
                    <p className="text-red-500 text-sm">{error?.message}</p>
                  )}
                </div>
              )}
            />
            <input
              type="submit"
              value="Add"
              className="bg-violet-700 rounded-2xl py-1 px-7 w-fit text-white cursor-pointer"
            />
          </form>
        </div>
      )}
      {allTodos.length > 0 && (
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-center">
            Here is your Todo List {localStorage.getItem("userName")}
          </h1>
          <form
            className="flex flex-col items bg-red w-full p-10	gap-y-3 sm:max-w-screen-md	mx-auto"
            onSubmit={handleSubmit(addTodo)}
          >
            <label className="text-violet-700 font-bold">Add Todo</label>
            <Controller
              control={control}
              name="todo"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div>
                  <input
                    type="text"
                    placeholder="Add new todo"
                    value={value || ""}
                    className="border-2 border-violet-700 p-1 focus:outline-0 w-full"
                    onChange={onChange}
                  />
                  {/* si il y a une erreur dans le champs, on affiche le message correspondant à l'erreur */}
                  {!!error && (
                    <p className="text-red-500 text-sm">{error?.message}</p>
                  )}
                </div>
              )}
            />
            <input
              type="submit"
              value="Add"
              className="bg-violet-700 rounded-2xl py-1 px-7 w-fit text-white cursor-pointer"
            />
          </form>
          <AllTodos allTodos={allTodos} setAllTodos={setAllTodos} />
        </div>
      )}
      {loading && <Loading />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default TodoPage;
