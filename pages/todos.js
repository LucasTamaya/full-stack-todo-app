const Todos = () => {
  return (
    <div>
      <h1>Here is your Todo list {localStorage.getItem("userName")} </h1>
    </div>
  );
};

export default Todos;
