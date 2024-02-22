import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const signInFn = async (signInData) => {
    try {
      const response = await fetch("http://localhost:4001/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
        credentials: "include",
      });

      if (response.ok) {
        const setCookieHeader = response.headers.get("Set-Cookie");
        if (setCookieHeader) {
          // Extract cookie value from the Set-Cookie header
          const cookieValue = setCookieHeader.split(";")[0];
          // Set the cookie in the browser
          document.cookie = cookieValue;
        }
        console.log("Sign-in successful");
        return true;
        // Optionally, redirect or perform other actions upon successful sign-up
      } else {
        console.error("Sign-in failed");
        return false;
        // Handle sign-up failure (e.g., display error message)
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle fetch error
    }
  };

  const signUpFn = async () => {
    try {
      const response = await fetch("http://localhost:4001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const setCookieHeader = response.headers.get("Set-Cookie");
        if (setCookieHeader) {
          // Extract cookie value from the Set-Cookie header
          const cookieValue = setCookieHeader.split(";")[0];
          // Set the cookie in the browser
          document.cookie = cookieValue;
        }
        console.log("Sign-up successful", response);
        return true;
        // Optionally, redirect or perform other actions upon successful sign-up
      } else {
        console.error("Sign-up failed");
        return false;
        // Handle sign-up failure (e.g., display error message)
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle fetch error
    }
  };

  const fetchAndSendCookie = async () => {
    try {
      // Fetch the cookie named "your_cookie_name"
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("sessionToken="))
        ?.split("=")[1];

      if (cookieValue) {
        // Send the cookie value to the backend for validation
        const response = await fetch("http://localhost:4001/todos", {
          method: "GET",
          headers: {
            Cookie: `sessionToken=${cookieValue}`,
          },
          credentials: "include",
        });

        const json = await response.json();

        if (response.ok) {
          setTodos([...json.todos]);
          // Cookie is valid, handle success
          console.log("Cookie validation successful", json);
        } else {
          // Cookie validation failed, handle error
          console.error("Cookie validation failed");
        }
      } else {
        console.error("Cookie not found");
      }
    } catch (error) {
      console.error("Error while validating cookie:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        todo,
        setTodo,
        formData,
        setFormData,
        isLoggedIn,
        setIsLoggedIn,
        signInFn,
        signUpFn,
        fetchAndSendCookie,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
