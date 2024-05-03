import React, { useState } from 'react';

const Combobox = ({ options, selectedValue, onChange }) => {
  const [selected, setSelected] = useState(selectedValue); 

  
  const handleChange = (event) => {
    setSelected(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select
        value={selected}
        onChange={handleChange}
        className="w-3/4 border border-none rounded-md px-4 py-2 mb-2 bg-gray-800 "
        >
        {options.map((option) => (
            <option
            key={option.value}
            value={option.value}
            className=" text-gray-200 border-none rounded-md px-4 py-2 mb-2 font-body focus:border-none"
            >
            {option.label}
            </option>
        ))}
    </select>
  );
};

export default Combobox; 