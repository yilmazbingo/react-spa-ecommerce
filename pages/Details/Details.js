import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCollections,
  selectIsCollectionFetching,
} from "../../redux/shop/shop.selectors";
import { selectIsOpen } from "../../redux/modal/modal.selector";
import { openModal, closeModal } from "../../redux/modal/modal.actions";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { addItem } from "../../redux/cart/cart.actions";
import Spinner from "../../components/spinner/spinner";
import Button from "../../components/custom-button/custom-botton.component";
import Modal from "../../components/modal/Modal";
import "./details.style.scss";

const Details = (props) => {
  const {
    fetchCollectionsStart,
    location,
    addItem,
    collections,
    openModal,
    isModalOpen,
    closeModal,
  } = props;
  // const [openModal, setOpenModal] = useState(false);
  console.log("collections in details", collections);
  useEffect(() => {
    const abortController = new AbortController();
    fetchCollectionsStart();
    return () => {
      abortController.abort();
    };
  }, []);

  const urlParamsArray = location.pathname.substr(1).split("/");

  console.log("urls parameters in details", urlParamsArray);
  const collectionName = urlParamsArray[1].toLowerCase();
  const itemName = urlParamsArray[2];

  const renderDetails = (collections) => {
    const item = collections[collectionName].items.find(
      ({ name }) => name === itemName
    );
    const { name, imageUrl, price, details, inCart } = item;
    return (
      <div>
        {" "}
        <div
          onClick={closeModal}
          className={`details ${isModalOpen ? "details-opacity" : ""}  `}
        >
          <h1>{collectionName} Collection</h1>
          <div className="details-box">
            <div className="details-img">
              <img src={imageUrl} alt="" />
            </div>

            <div className="details-info">
              <h2 className="product"> {name} </h2>

              <h2 className="price">
                <strong>
                  price: <span className="dollar-sign">$</span>
                  {price}
                </strong>
              </h2>
              <h4>Product Info</h4>
              <ul>
                {details.map((detail, index) => {
                  return <li key={index}>{detail} </li>;
                })}
              </ul>
              <div className="details-buttons">
                <Link to="/store">
                  <Button inCart detailsPage>
                    back to products
                  </Button>
                </Link>
                <Button
                  detailsPage
                  inCart={inCart}
                  disabled={inCart ? true : false}
                  onClick={(e) => {
                    e.stopPropagation();
                    addItem(item);
                    openModal();
                    // value.openModal(id);
                  }}
                >
                  {inCart ? "in cart" : "add to cart"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen ? <Modal {...item} /> : ""}
      </div>
    );
  };

  return (
    <React.Fragment>
      {collections ? (
        // collections.collections[location.pathname.substr(1).split("/")[1]]
        renderDetails(collections)
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

// it returns only a function to clean up

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
  isFetching: selectIsCollectionFetching,
  isModalOpen: selectIsOpen,
});

export default connect(mapStateToProps, {
  fetchCollectionsStart,
  addItem,
  openModal,
  closeModal,
})(Details);
