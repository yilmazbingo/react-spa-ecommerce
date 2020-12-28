import React, { Component } from "react";
import { FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import { FcCustomerSupport } from "react-icons/fc";
import { RiProfileLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import Title from "../title/Title";
import "./footer.scss";

export default class Footer extends Component {
  state = {
    services: [
      {
        icon: <FcCustomerSupport />,
        title: "Customer Service",
        info:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?",
      },
      {
        icon: <MdAccountCircle />,
        title: "Account",
        info:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?",
      },
      {
        icon: <RiProfileLine />,
        title: "Social Media",
        info:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?",
      },
      {
        icon: <FiLink />,
        title: "Quick Link",
        info:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?",
      },
    ],
  };

  render() {
    return (
      <footer className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item) => {
            return (
              <article key={`item-${item.title}`} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </footer>
    );
  }
}
