"use client";
import {SignUp} from "@clerk/nextjs";
import React from "react";

export default function SignUpPage() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <SignUp />
    </div>
  );
}
