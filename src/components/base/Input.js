import React from "react";

const Input = ({
  type = "text",
  readOnly = false,
  title,
  value,
  onChangeValue,
  placeholder,
}) => {
  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <input
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        value={value}
        onChange={(e) => onChangeValue(e)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default Input;
