import React from "react";

import PaymentListView from "./PaymentList.view";
import Payment from "../Payment/Payment";
import { IPayment } from "../../Types";
import moment from "moment";
import PaymentStore, { initialState } from "../../store/payments";

const PaymentList = () => {
  const [payments, setPayments] = React.useState(initialState);

  React.useLayoutEffect(() => {
    const subscription = PaymentStore.subscribe(setPayments);
    PaymentStore.init();

    return () => {
      subscription.unsubscribe();
    };
  });

  const renderPayments = () => {
    if (payments.length)
      return payments.map((payment, index) => {
        return (
          <Payment
            id={index}
            key={index}
            date={payment.date}
            description={payment.description}
            amount={payment.amount}
          />
        );
      });
    return <p className="message">Oops, there's nothing here...</p>;
  };

  return (
    <PaymentListView className={!payments.length ? "empty" : ""}>
      {renderPayments()}
    </PaymentListView>
  );
};

export default PaymentList;
