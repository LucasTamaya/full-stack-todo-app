import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Controller, useForm } from "react-hook-form"; //librairie afin de faciliter la mise en place de formulaire
import * as Yup from "yup"; //librairie afin de faciliter la gestion d'erreur des champs de mon formulaire
import { yupResolver } from "@hookform/resolvers/yup"; //nécessaire afin d'utiliser "react-hook-form" et "yup" ensemble
const axios = require("axios");
const template = require("../utils/template");

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // schema de validation de notre formulaire avec gestion d'erreurs inclus
  // en gros on stipule ici ce qu'on veut recevoir comme data de la part de l'utilisateur, et si il ne respecte pas les règles misent en place, on triger les messages d'erreur entre ()
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("You must enter a valid email address") //message d'erreur si l'email n'est pas valide
      .required("You must enter your email address"), //message d'erreur si on ne remplit pas le champ email
    password: Yup.string()
      .min(6, "This password is too short") //message d'erreur si le password fait moins de 6 caractères
      .required("You must enter a password"), //message d'erreur si on ne remplit pas le champ password
  }).required();

  // import des composantss afin de vérifier nos formulaires
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema), //on indique à react-hook-form d'utiliser notre validationSchema afin de traiter les erreurs
  });

  async function handleForm(input) {
    setLoading(true);

    setErrorMessage("");

    const res = await axios.post(`${template}api/auth/login`, {
      email: input.email,
      password: input.password,
    });

    const data = await res;

    if (data.data.message === "Login error") {
      setLoading(false);
      setErrorMessage("Wrong email or password");
    }

    if (!data.data.message) {
      setLoading(false);
      // enregistre le JWT dans le local storage
      localStorage.setItem("accessToken", data.data.accessToken);
      // enregistre le nom de l'utilisateur aussi
      localStorage.setItem("userName", data.data.userName);

      // on redirige l'utilisateur vers la page des Todos
      router.push("/");
    }
  }
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-4/5 flex flex-col justify-center items-center">
        <h1 className="text-2xl text-violet-700 sm:text-4xl text-center font-bold mb-10">
          Login
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit(handleForm)}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={value || ""}
                  className="px-3 py-1 m-2 border border-black sm:w-80 sm:h-12"
                  onChange={onChange}
                />
                {/* si il y a une erreur dans le champs, on affiche le message correspondant à l'erreur */}
                {!!error && (
                  <p className="text-red-500 text-sm ml-2">{error?.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={value || ""}
                  className="px-3 py-1 m-2 border border-black sm:w-80 sm:h-12"
                  onChange={onChange}
                />
                {/* si il y a une erreur dans le champs, on affiche le message correspondant à l'erreur */}
                {!!error && (
                  <p className="text-red-500 text-sm ml-2">{error?.message}</p>
                )}
              </div>
            )}
          />

          <input
            className="bg-violet-700 px-3 m-2 py-1 rounded-sm text-white font-semibold cursor-pointer sm:w-80 sm:h-12"
            type="submit"
            value="Login"
          />
        </form>
        <p className="text-sm">
          You don't have an account yet ?
          <span className="text-violet-700 font-bold ml-1">
            <Link href="/register">Register</Link>
          </span>
        </p>
      </div>
      {loading && <Loading />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
