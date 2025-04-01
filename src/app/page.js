"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodoProvider } from "@/context/TodoContext";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Todo List</CardTitle>
            </CardHeader>
            <CardContent>
              <AddTodo />
              <TodoList />
            </CardContent>
          </Card>
        </div>
      </div>
    </TodoProvider>
  );
}
