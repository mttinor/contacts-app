import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg">
        {/* Spinner */}
        <div className="flex items-center justify-center">
          <span>Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
