import React from "react";
import CollectionItem from "../collection-item/collection-item.component";
import { Link } from "react-router-dom";
import AddToCardForMobile from "../mobile-button/mobile-button";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <Link className="title" to={`/shop/${title.toLowerCase()}`}>
      {title.toUpperCase()}
    </Link>
    <div className="preview">
      {items
        .filter((item, index) => index < 4)
        .map((item, index) => (
          <CollectionItem
            item={item}
            title={title}
            index={index}
            key={item.id}
          />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
