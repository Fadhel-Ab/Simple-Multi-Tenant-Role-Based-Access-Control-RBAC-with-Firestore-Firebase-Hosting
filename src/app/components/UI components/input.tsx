"use client";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}

