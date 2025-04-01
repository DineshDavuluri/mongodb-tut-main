"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const { user, isSignedIn } = useUser();
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      toast.error("Please log in to access your todos.");
      return;
    }
    if (!user?.id) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    fetchTodos(user.id);
  }, [isSignedIn, user]);

  const fetchTodos = async (userId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/todos?userId=${userId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to fetch todos");
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (newTodo) => {
    if (!newTodo.trim()) return;
    if (!user?.id) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTodo, userId: user.id }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      fetchTodos(user.id);
      toast.success("Todo added successfully");
    } catch (error) {
      toast.error("Failed to add todo");
    }
  };

  return (
    <TodoContext.Provider value={{ todos, isLoading, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);
