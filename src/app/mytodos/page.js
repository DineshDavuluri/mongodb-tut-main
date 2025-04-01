'use client';

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (!isSignedIn) {
      console.error("User is not signed in.");
      toast.error("Please log in to access your todos.");
      return;
    }

    const userId = user?.id;
    if (!userId) {
      console.error("User ID is missing.");
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    fetchTodos(userId);
  }, [isSignedIn, user]);

  const fetchTodos = async (userId) => {
    try {
      setIsLoading(true);
      console.log('Fetching todos for user:', userId);
      
      const response = await fetch(`/api/todos?userId=${userId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error('Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const userId = user?.id;
    if (!userId) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }

    try {
      setIsAdding(true);
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTodo, userId }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      setNewTodo("");
      fetchTodos(userId);
      toast.success("Todo added successfully");
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Failed to add todo");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Todo List</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={addTodo} className="flex gap-2 mb-6 rounded-md">
              <Input
                type="text"
                placeholder="Add a new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1"
                disabled={isAdding}
              />
              <Button type="submit" disabled={isAdding}>
                {isAdding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add'
                )}
              </Button>
            </form>

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
                    <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
