import { useState } from "react";
import { useRouter } from "next/router";
const axios = require("axios");

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // import le package yup afin de faire des verification sur les formulaires

  async function handleForm(e) {
    e.preventDefault();
    setLoading(!loading);
    const res = await axios.post("http://localhost:3000/api/auth/register", {
      email: email,
      name: name,
      password: password,
    });

    const data = await res;

    console.log(data);

    // si erreur
    if (data.data.message === "Existing user error") {
      setLoading(false);
      setErrorMessage("This email is already used");
    }

    // si aucune erreur
    if (!data.data.message) {
      setLoading(false);
      // enregistre le JWT dans le local storage
      localStorage.setItem("accessToken", data.data);
      // on redirige l'utilisateur vers la page des Todos
      router.push("/todos", "/");
    }
  }
  return (
    <div className="w-screen h-screen">
      <h1 className="text-2xl sm:text-4xl text-center font-bold">Register</h1>
      <div className="w-full h-4/5 flex justify-center items-center">
        <form className="flex flex-col ">
          <input
            className="px-3 py-1 m-2 border border-violet-700"
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-3 py-1 m-2 border border-violet-700"
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="px-3 py-1 m-2 border border-violet-700"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="bg-violet-700 px-3 m-2 py-1 rounded-sm text-white font-semibold"
            type="submit"
            onClick={handleForm}
            value="Register"
          />
        </form>
      </div>
      {loading && <p>Loading ...</p>}
      {errorMessage && (
        <p className="text-red-500 text-xl text-center font-bold border border-red-500 w-fit">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
