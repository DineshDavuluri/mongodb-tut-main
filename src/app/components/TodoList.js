"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2 } from "lucide-react";
import { useTodo } from "@/context/TodoContext";

export default function TodoList() {
  const { todos, isLoading } = useTodo();

  return (
    <div className="space-y-2">
      {isLoading ? (
        <div className="text-center py-4">Loading todos...</div>
      ) : todos.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No todos yet. Add one above!</div>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => console.log("Toggle feature to be implemented")}
            />
            <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>
              {todo.text}
            </span>
            <Button size="icon" variant="ghost">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
