import React from "react";

export const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-pink-500 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline hover:bg-pink-600 hover:text-gray-100"
    >
      {props.text}
    </button>
  );
};
