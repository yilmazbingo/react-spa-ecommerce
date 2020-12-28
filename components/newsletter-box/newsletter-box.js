import React, { useState, useCallback } from "react";
import { FiMail } from "react-icons/fi";
import "./newsletter-box.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-botton.component";

const NewsletterBox = ({ history }) => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };

  const handleClick = useCallback(() => {
    setEmail("Successfully Subscribed");
    const delay = (t) =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve(setEmail("you are subscribed"));
        }, t)
      );
    delay(2000).then(() => history.push("/store"));
  }, []);

  return (
    <section>
      <div className="newsletter">
        <FiMail className="mail-icon" />
        <h3>
          Make your inbox HAPPY and get Extra 25 percent off now. Sign up for
          emails
        </h3>
        <FormInput
          type="email"
          handleChange={handleChange}
          value={email}
          name="email"
          placeholder="Enter your email"
        />
        <button className="newsletter-button" onClick={handleClick}>
          SUBSCRIBE
        </button>
        <FiMail className="mail-icon" />
      </div>
    </section>
  );
};

export default NewsletterBox;
