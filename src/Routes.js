import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Store from "./pages/Store/Store";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import Login from "./pages/Login/Login";
import Checkout from "./pages/Checkout/Checkout";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/header/header.component";

const Routes = (props) => {
  // ------NOT A GOOD PLACE BECAUSE WILL BE CALLED TWICE-------
  // useEffect(() => {
  //   addCollectionAndDocuments(
  //     "collections",
  //     Object.keys(shopData)
  //       .map((key) => shopData[key])
  //       .map(({ items, title }) => ({ title, items }))
  //   );
  // }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route exact path="/shop/:id/:id" component={Details} />
        <Route
          exact
          path="/store/:collectionId/:collectionId"
          component={CollectionPage}
        />
        <Route path="/store" component={Store} />

        <Route path="/login" component={Login} />
        <Route path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
