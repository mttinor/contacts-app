const Select = ({ value, title, titleSelected, options, onChangeValue }) => {
  return (
    <div className="">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {title}
      </label>
      <select
        value={value}
        onChange={(e) => onChangeValue(e)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value={""} defaultValue>
          {titleSelected}
        </option>
        {options.map(({ value, name }, i) => (
          <option key={i} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
