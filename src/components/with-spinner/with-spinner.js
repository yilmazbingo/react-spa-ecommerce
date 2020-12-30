import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styled";

const WithSpinner = (WrappedComponent) => ({
  isCollectionLoaded,
  ...otherProps
}) => {
  return !isCollectionLoaded ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
