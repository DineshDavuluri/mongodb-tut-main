'use client';
import { useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
export default function SignInPage() {
  const { user, isSignedIn } = useUser();

  console.log("User:", user);
  console.log("Signed in:", isSignedIn);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
