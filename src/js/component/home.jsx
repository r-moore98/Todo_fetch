import React, { useEffect, useState } from "react";
import axios from "axios";

const TodoItem = ({ item, removeItem }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <li
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {item.label}
      {isHovering && <button onClick={() => removeItem(item)}>Remove</button>}
    </li>
  );
};

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const apiUrl = "https://assets.breatheco.de/apis/fake/todos/user/r-moore98";

  const updateApi = (arr) => {
    axios.put(`${apiUrl}`, arr).then((response) => {
      getTodo();
    });
  };

  const getTodo = () => {
    axios.get(`${apiUrl}`).then((response) => {
      setTodos(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    getTodo();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      let newtodo = [
        ...todos,
        { label: inputValue.trim(), done: false },
      ];
	  updateApi(newtodo);
      setInputValue("");
    }
  };

  const handleRemoveTodo = (item) => {
    let todolist = todos.filter((todo) => todo !== item);
	updateApi(todolist);
  };

  return (
    <div className="list">
      <h1>todos</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="What Needs To Be Done?"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <TodoItem key={index} item={todo} removeItem={handleRemoveTodo} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
