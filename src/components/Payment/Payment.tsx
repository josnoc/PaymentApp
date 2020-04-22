import React from "react";

import PaymentView from "./Payment.view";
import { IPayment } from "../../Types";

const Payment = (props: React.PropsWithChildren<IPayment>) => {
  return (
    <PaymentView
      date={props.date}
      description={props.description}
      amount={props.amount}
    />
  );
};

export default Payment;
