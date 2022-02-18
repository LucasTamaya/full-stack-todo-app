import { useState } from "react";
import { useRouter } from "next/router";
const axios = require("axios");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  async function handleForm(e) {
    setLoading(true);

    e.preventDefault();

    const res = await axios.post("http://localhost:3000/api/auth/login", {
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
      localStorage.setItem("accessToken", data.data);

      // on redirige l'utilisateur vers la page des Todos
      router.push("/todos", "/");
    }
  }
  return (
    <div className="w-screen h-screen">
      <h1 className="text-2xl sm:text-4xl text-center font-bold">Login</h1>
      <div className="w-full h-4/5 flex justify-center items-center">
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
            className="bg-violet-700 px-3 m-2 py-1 rounded-sm text-white font-semibold"
            type="submit"
            onClick={handleForm}
            value="Login"
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
