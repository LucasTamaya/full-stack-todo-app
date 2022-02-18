import Head from "next/head";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <main className="w-screen h-screen">
        <h1 className="text-2xl sm:text-4xl font-bold text-center">
          Welcome to your TODO App
        </h1>
        <div className="flex w-screen h-4/5 justify-center items-center gap-x-10">
          <button className="border border-violet-700 w-40 py-3 text-violet-700 rounded-2xl transition ease-out hover:scale-105">
            <Link href="/register">Register</Link>
          </button>
          <button className="border border-violet-700 w-40 py-3 text-white rounded-2xl bg-violet-700 transition ease-out hover:scale-105">
            <Link href="/login">Login</Link>
          </button>
        </div>
      </main>
    </>
  );
}
