import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="w-full h-fit bg-violet-700 p-5 flex justify-between mb-10">
        <h1 className="text-2xl sm:text-4xl text-white font-bold">Todo App</h1>
        <nav>
          <Link href="/login">
            <button className="mr-8 text-white">Login</button>
          </Link>

          <Link href="/register">
            <button className="bg-white p-2 text-violet-700 rounded-2xl">
              Register
            </button>
          </Link>
        </nav>
      </header>
    </>
  );
};

export default Header;
