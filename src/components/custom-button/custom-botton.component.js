import React from "react";
import { CustomButtonContainer } from "./custom-button.styled";

// import "./custom-button.styles.scss";

const CustomButton = (props) => {
  //children prop is "SIGN-IN", "SIGN-IN-WITHgOOGLE","SIGN-UP"
  return (
    <CustomButtonContainer {...props}>{props.children}</CustomButtonContainer>
  );
};

export default CustomButton;

// <button
//     className={`${isGoogleSignIn ? "google-sign-in" : ""} ${
//       inverted ? "inverted" : ""
//     }  custom-button`}
//     {...otherProps}
//   >
//     {children}
//   </button>
