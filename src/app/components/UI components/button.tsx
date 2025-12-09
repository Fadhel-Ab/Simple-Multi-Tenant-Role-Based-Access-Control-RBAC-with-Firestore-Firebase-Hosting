"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "delete";
};

export default function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  const base = "px-4 py-2 rounded font-semibold";
  
    const styles ={
        primary:"bg-blue-500 text-white hover:bg-blue-600",
        secondary:"bg-gray-200 text-gray-800 hover:bg-gray-300",
        delete:"bg-red-500 text-white hover:bg-red-600",
    }
    
  return (
    <button className={`${base} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
