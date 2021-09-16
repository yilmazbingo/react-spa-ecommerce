import React from "react";
import "./hero.scss";

//headers should be used as containers for introductory contents.
const Hero = ({ children, hero }) => {
  return <header className={hero}>{children}</header>;
};

export default Hero;

Hero.defaultProps = {
  hero: "defaultHero",
};
