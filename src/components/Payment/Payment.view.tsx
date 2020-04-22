import React from "react";
import { IPayment } from "../../Types";

import "./Payment.scss";

const PaymentView = (props: React.PropsWithChildren<IPayment>) => {
  return (
    <div className="Payment">
      <p className="date">{props.date.format("MMMM DD,YYYY")}</p>
      <p className="description">{props.description}</p>
      <p className="amount">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(props.amount)}
      </p>
      <p className="settings icon-ellipsis-vertical"></p>
    </div>
  );
};

export default PaymentView;
