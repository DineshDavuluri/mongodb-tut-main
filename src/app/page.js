import React from "react";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
export default function Home() {
  return <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold">Todo List</h1>
    <p className="text-gray-500 text-center">
      This is a simple todo list application with CRUD operations. <br /> 
      Go to the <Link href="/mytodos" className="text-blue-500">My Todos</Link> page to get started.
    </p>

  </div>;
}
