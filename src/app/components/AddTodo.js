"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTodo } from "@/context/TodoContext";

export default function AddTodo() {
  const { addTodo } = useTodo();
  const [newTodo, setNewTodo] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    await addTodo(newTodo);
    setNewTodo("");
    setIsAdding(false);
  };

  return (
    <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Add a new todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        disabled={isAdding}
      />
      <Button type="submit" disabled={isAdding}>
        {isAdding ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          "Add"
        )}
      </Button>
    </form>
  );
}
