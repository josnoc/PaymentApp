import React from "react";

import PaymentListView from "./PaymentList.view";
import Payment from "../Payment/Payment";
import { IPayment } from "../../Types";
import moment from "moment";

const PaymentList = () => {
  const [payments, setPayments] = React.useState([
    {
      date: moment("2020-08-20"),
      description: "Esse pariatur elit eu commodo in nulla nisi occa...",
      amount: 245,
    },
    {
      date: moment("2020-08-20"),
      description: "Esse pariatur elit eu commodo in nulla nisi occa...",
      amount: 750,
    },
  ] as IPayment[]);
  const renderPayments = () => {
    if (payments.length)
      return payments.map((payment, index) => {
        return (
          <Payment
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
