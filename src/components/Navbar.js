// components/Navbar.js
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="text-white">Logo</div>
        <div className="hidden lg:block">
          <ul className="flex space-x-4 text-white">
            <li>Home</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
