import React, { useCallback } from "react";
import { Helmet } from "react-helmet";

export default () => {
  return (
    <Helmet>
      <title>Jan Boutique</title>
      <meta property="og:title" content="Jan Boutique Store" />

      <meta name="description" content="Jan Boutique categories" />
    </Helmet>
  );
};
