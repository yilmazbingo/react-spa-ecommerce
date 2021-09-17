import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-botton.component";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";
import "./sign-in.styles.scss";

const SignIn = ({ emailSignInStart, googleSignInStart, history }) => {
  console.log("history in login", history);
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    //   we want full control over what submit will do
    event.preventDefault();

    emailSignInStart({ email, password, history });
  };
  const handleChange = (event) => {
    //event.target is the input element itself
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      {/* The action attribute specifies where to send the form-data when a form is submitted. */}
      <form action="" onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />
        {/* <label> Email</label> */}
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        {/* <label htmlFor="">Password</label> */}
        {/* <input type="submit" value="Submit Form" /> */}
        <div className="buttons">
          <CustomButton type="submit" value="Submit Form">
            SIGN-IN
          </CustomButton>
          {/* type=button will not trigger submit for the form. it will just trigger onCLick */}
          <CustomButton
            type="submit"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            SIGN-IN-WITH-GOOGLE
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

//  is used for dispatching actions to the store.
const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});
export default withRouter(connect(null, mapDispatchToProps)(SignIn));
