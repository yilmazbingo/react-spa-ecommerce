import React from "react";

const SearchBar = (props) => {
  const { value, onChange } = props;
  return (
    <input
      type="search"
      placeholder="Check Items"
      value={value}
      onChange={onChange}
    />
  );
};
export default SearchBar;
