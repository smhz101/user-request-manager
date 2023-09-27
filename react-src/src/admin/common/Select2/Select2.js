import React from "react";
import Select from "react-select"; // you can use react-select or any other library that provides Select2 functionality

import "./Select2.css";

const Select2 = ({ options, value, onChange, ...otherProps }) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  );
};

export default Select2;
