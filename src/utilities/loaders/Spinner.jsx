import React from "react";

const Spinner = ({ size = 10, color = 'gray-500' }) => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className={`animate-spin w-${size} h-${size} text-${color}`}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[...Array(12)].map((_, i) => (
          <rect
            key={i}
            x="23"
            y="2"
            width="4"
            height="10"
            rx="2"
            fill="currentColor"
            transform={`rotate(${i * 30} 25 25)`}
            opacity={1 - i * 0.08}
          />
        ))}
      </svg>
    </div>
  );
};

export default Spinner;