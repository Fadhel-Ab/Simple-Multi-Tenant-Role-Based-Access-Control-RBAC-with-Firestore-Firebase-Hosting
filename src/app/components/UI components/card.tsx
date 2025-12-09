import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`p-4 bg-white shadow-md rounded-md ${className}`}>
      {children}
    </div>
  );
}

