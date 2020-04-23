import React, { useEffect } from "react";

import AppStore from "../../store/app";
import "./Add.scss";

const Add = () => {
  const onClick = () => {
    console.log("working?");
    AppStore.openNewPayment();
  };

  return <p onClick={onClick} className="Add icon-add-circle"></p>;
};

export default Add;
