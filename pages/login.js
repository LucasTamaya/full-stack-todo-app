import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
const axios = require("axios");
const template = require("../utils/template");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function handleForm(e) {
    e.preventDefault();

    setLoading(true);

    setErrorMessage("");

    const res = await axios.post(`${template}api/auth/login`, {
      email: email,
      password: password,
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
        <form className="flex flex-col ">
          <input
            className="px-3 py-1 m-2 border border-black"
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-3 py-1 m-2 border border-black"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="bg-violet-700 px-3 m-2 py-1 rounded-sm text-white font-semibold cursor-pointer"
            type="submit"
            onClick={handleForm}
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
