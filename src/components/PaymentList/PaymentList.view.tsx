import React from "react";

import "./PaymentList.scss";

interface IProps {
  className?: string;
}

const PaymentListView = (props: React.PropsWithChildren<IProps>) => {
  return (
    <div className={`Payment_List ${props.className}`}>{props.children}</div>
  );
};

export default PaymentListView;
