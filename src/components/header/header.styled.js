import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

//{css} allows us write a block of css and pass in
//we have div and link that are using same css. so we write css at one place and use it inside of them
// or we could write as div and in the link components put prop "as=Link"

const OptionsContainerStyles = css`
  padding: 1rem 1.5rem;
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  height: 8rem;
  width: 100%;
  background: black;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  @media screen and (max-width: 80rem) {
    height: 6rem;
    padding: 1rem;
    margin-bottom: 2rem;
  }
`;

export const LogoContainer = styled(Link)`
  /* height: 100%; */
  width: 7rem;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  @media screen and (max-width: 800px) {
    width: 5rem;
    padding: 0;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 80rem) {
    width: 80%;
  }
`;

export const OptionLink = styled(Link)`
  ${OptionsContainerStyles};
  color: ${(props) => (props.currentUser ? "yellow" : "white")};
`;

export const OptionDiv = styled.div`
  ${OptionsContainerStyles};
  color: red;
`;

export const OptionGithub = styled.a`
  ${OptionsContainerStyles};

  .github-icon {
    color: white;
    height: 3.5rem;
    width: 3.5rem;
  }
`;
