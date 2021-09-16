import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  selectCollection,
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selectors";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import Spinner from "../../components/spinner/spinner";
import CollectionItem from "../../components/collection-item/collection-item.component";
import SearchBar from "../../components/search-bar/search-bar";
import "./collection.scss";

const CollectionPage = (props) => {
  const { isCollectionLoaded } = props;
  const [searchField, setSearchField] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setSearchField(value);
  };

  useEffect(() => {
    const abortController = new AbortController();
    props.fetchCollectionsStart();
    return () => {
      abortController.abort();
    };
  }, []);

  if (!isCollectionLoaded) {
    return <Spinner />;
  }
  const { title, items } = props.collection;
  const filteredItems = !searchField
    ? items
    : items.filter((item) =>
        item.name.toLowerCase().includes(searchField.toLowerCase())
      );

  return (
    <div className="collection-page">
      <SearchBar value={searchField} onChange={onChange} />
      <h2 className="title">{title} </h2>

      <div className="items">
        {filteredItems.map((item) => (
          <CollectionItem key={item.id} {...props} item={item} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
  isCollectionFetching: selectIsCollectionFetching(state),
  isCollectionLoaded: selectIsCollectionsLoaded(state),
});

export default connect(mapStateToProps, { fetchCollectionsStart })(
  CollectionPage
);
