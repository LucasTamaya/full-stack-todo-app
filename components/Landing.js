import Link from "next/link";
import Footer from "./footer";

export default function Landing() {
  return (
    <>
      <main className="w-screen h-screen">
        <div className="flex flex-col w-screen h-4/5 justify-center items-center gap-x-10">
          <h1 className="text-2xl text-violet-700 sm:text-4xl font-bold text-center mb-10">
            Welcome to your TODO App
          </h1>
          <div className="flex gap-x-10">
            <Link href="/register">
              <button className="border border-violet-700 w-28 sm:w-40 py-3 text-violet-700 rounded-2xl transition ease-out hover:scale-105">
                Register
              </button>
            </Link>

            <Link href="/login">
              <button className="border border-violet-700 w-28 sm:w-40 py-3 text-white rounded-2xl bg-violet-700 transition ease-out hover:scale-105">
                Login
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
