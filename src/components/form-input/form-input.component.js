import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, type, label, ...otherProps }) => (
  <div className="group">
    <input
      className="form-input"
      type={type}
      onChange={handleChange}
      {...otherProps}
    />
    {/* //whenever user typed in anything we will have shrink class */}
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : " "
        } form-input-label`}
      >
        {label}{" "}
      </label>
    ) : null}
  </div>
);

export default FormInput;
