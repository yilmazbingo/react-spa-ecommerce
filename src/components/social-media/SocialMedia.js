import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";
import { GrInstagram } from "react-icons/gr";
import { IoLogoYoutube } from "react-icons/io";
import "./social-media.scss";

const SocialMedia = () => {
  return (
    <div className="social-media">
      <a target="_blank" href="https://www.facebook.com/gezerperde">
        <FaFacebook />
      </a>
      <a href="#" target="_blank">
        <AiFillTwitterSquare />
      </a>
      <a href="https://www.instagram.com/janbutiik/">
        <GrInstagram />
      </a>
      <a href="#" target="_blank">
        <IoLogoYoutube />
      </a>
    </div>
  );
};

export default SocialMedia;
