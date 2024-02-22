import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { useTodoContext } from "./TodoContext";

const ShowTodo = () => {
  const { todos, setTodos } = useTodoContext();
  const addTodo = (todo) => {
    if (todo.trim() !== "") {
      setTodos([...todos, todo]);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl mb-4">Todo App</h1>
      <TodoForm onSubmit={addTodo} />
      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li key={index} className="text-gray-800">
            {todo.todoString}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowTodo;
