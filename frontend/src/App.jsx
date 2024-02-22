import React, { useEffect, useState } from "react";
import SignupPage from "./SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowTodo from "./ShowTodo";
import { useTodoContext } from "./TodoContext";

const App = () => {
  const { fetchAndSendCookie } = useTodoContext();
  useEffect(() => {
    fetchAndSendCookie();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/todo" element={<ShowTodo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
