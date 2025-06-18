import React from "react";

interface StatusIndicatorProps {
  status: "up" | "down";
  size?: "sm" | "md" | "lg";
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const statusClasses = {
    up: "bg-green-500 shadow-lg shadow-green-500/40",
    down: "bg-red-500 shadow-lg shadow-red-500/40",
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${statusClasses[status]} 
        rounded-full 
        animate-pulse
      `}
    />
  );
};
