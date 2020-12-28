import React, { useEffect, useCallback } from "react";
import WithSpinner from "../with-spinner/with-spinner";
import CollectionsOverview from "../collections-overview/collections-overview";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import DatabaseError from "../database-error/DatabaseError";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
  selectError,
} from "../../redux/shop/shop.selectors";
import "./featured-products.style.scss";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);

const FeaturedProducts = (props) => {
  // we cannot return anyhting, we have to just call a function.
  //return function is componentWillUnmount
  useEffect(() => {
    const abortController = new AbortController();
    props.fetchCollectionsStart();
    return () => {
      abortController.abort();
    };
  }, []);

  //we are passing "isLoading" prop before we fetch the data because render is called componentDidMount
  //since isLoading will be false, it will render items but items array will be null

  const { isCollectionLoaded, error } = props;

  //With useCallback you memoize functions, useMemo memoizes any computed value:
  const head = useCallback(() => {
    return (
      <Helmet>
        <title>Shop from Jan </title>
        <meta property="og:title" content="shop from bingo" />
      </Helmet>
    );
  }, []);
  return (
    <React.Fragment>
      {head()}
      <h1 className="featured-products-title">FEATURED PRODUCTS</h1>
      {error ? (
        <DatabaseError />
      ) : (
        <CollectionOverviewWithSpinner
          isLoading={!isCollectionLoaded}
          {...props}
        />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionsLoaded,
  error: selectError,
});

export default connect(mapStateToProps, { fetchCollectionsStart })(
  FeaturedProducts
);
