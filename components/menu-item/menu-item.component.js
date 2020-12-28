import React from "react";
import { withRouter } from "react-router-dom";
import "./menu-item.scss";

//we pass "size" from item property to adjust the size of the image
const MenuItem = ({ title, imageUrl, size, linkUrl, match, history }) => {
  console.log("linkUrl", linkUrl);
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}/${linkUrl}`)}
    >
      {/* we dynamically style our component */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      {/* background image has no child element */}
      {/* we want our content to have same size in hover effect */}
      <div className="content">
        <h1 className="title">{title}</h1>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);

// style={{ backgroundImage: `url("./images/hats.jpg")` }}
