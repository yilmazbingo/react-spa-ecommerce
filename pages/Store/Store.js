import React, { useCallback } from "react";
import Directory from "../../components/directory/directory.component";
import { HomePageContainer } from "./Store.styled";
import metaTags from "./store.meta-tags";
// import Footer from "../../components/footer/footer";
const Store = (props) => {
  const head = useCallback(() => metaTags(), []);

  return (
    <React.Fragment>
      {head()}
      <HomePageContainer>
        <Directory />
      </HomePageContainer>
    </React.Fragment>
  );
};

export default Store;
