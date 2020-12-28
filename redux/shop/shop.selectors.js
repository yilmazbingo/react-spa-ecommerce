import { createSelector } from "reselect";

//initial input selector
const selectShop = (state) => state.shop;

//caches the state.shop.collections
//gives me just collections property of the state
export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

//we convert the object to an array because array methods is easier for displaying on the screen.
//we use this in CollectionOverview to display collections
//we convert collections to the array and then getting the values of those keys.
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

//collectionUrlParam is "womens,hats,sneakers"
export const selectCollection = (collectionUrlParam) =>
  createSelector([selectCollections], (collections) =>
    collections ? collections[collectionUrlParam] : null
  );

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectError = createSelector(
  [selectShop],
  (shop) => shop.errorMessage
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
