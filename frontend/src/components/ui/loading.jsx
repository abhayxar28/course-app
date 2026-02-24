import React from "react";

const LoadingComponent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        
        <div className="w-12 h-12 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"></div>

        <p className="text-gray-600 text-sm font-medium">
          Loading...
        </p>

      </div>
    </div>
  );
};

export default LoadingComponent;