import styled, { css } from "styled-components";

const $lightBlue = "#009ffd";
const $mainBlue = "#2a2a72";
const $mainYellow = "#fc810d";

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;
  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;
  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;
  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

const detailsPageStyles = css`
  text-transform: capitalize;
  font-size: 1.8rem;
  background: transparent;
  border: 0.05rem solid ${$lightBlue};
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: ${$lightBlue};
  color: ${(props) => (props.inCart ? $mainYellow : $lightBlue)};
  display: inline-block;

  outline-color: red;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.5s ease-in-out;

  &:hover {
    background: ${$lightBlue};
    background: ${(props) => (props.inCart ? $mainYellow : $lightBlue)};
    color: ${$mainBlue};
  }
  &:focus {
    outline: none;
  }

  @media screen and (max-width: 576px) {
    margin-left: 20%;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  } else if (props.detailsPage) {
    return detailsPageStyles;
  }
  return props.inverted ? invertedButtonStyles : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 16.5rem;
  text-transform: capitalize;
  width: auto;

  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  ${getButtonStyles}
`;
