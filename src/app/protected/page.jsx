"use client"
import React from "react";

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
export default function ProtectedPage() {
  const { user } = useUser();

    return (

    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold"> Hello {user?.firstName} {user?.lastName} Protected Page</h1>
      <p className="text-gray-500">This is a protected page</p> 
      <UserButton />
    </div>
  );
}
