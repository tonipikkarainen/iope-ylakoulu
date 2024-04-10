import React from "react";
import { useState } from "react";
import { FaHome, FaCog, FaUser } from "react-icons/fa"; // Import icons from react-icons library
import { FiAlignJustify } from "react-icons/fi";
import { BiBoltCircle } from "react-icons/bi";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`bg-gradient-to-b from-purple-700 via-purple-500 to-purple-300 text-white p-4 transition-all duration-300 ${
        isHovered ? "w-1/5" : "w-16"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <>
          <h1 className="text-3xl font-bold mb-4">LaskijanAI</h1>
        </>
      ) : (
        <div className="mb-4">
          <FiAlignJustify className="inline-block" />
        </div>
      )}

      <ul>
        <li className=" whitespace-nowrap">
          {isHovered && (
            <>
              <FaHome className="mr-2 inline-block" />
              <a
                href="#"
                className="inline-block py-2 hover:underline whitespace-nowrap"
              >
                Home
              </a>
            </>
          )}
        </li>
        <li className=" whitespace-nowrap">
          {isHovered && (
            <>
              <BiBoltCircle className="mr-2 inline-block" />
              <a
                href="#"
                className="inline-block py-2 hover:underline whitespace-nowrap"
              >
                Tehtävä 1
              </a>
            </>
          )}
        </li>
        <li className=" whitespace-nowrap">
          {isHovered && (
            <>
              <BiBoltCircle className="mr-2 inline-block" />
              <a href="#" className="inline-block py-2 hover:underline">
                Tehtävä 2
              </a>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
