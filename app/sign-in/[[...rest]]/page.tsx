"use client";
import React from "react";
import {SignIn} from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <SignIn />
    </div>
  );
}
