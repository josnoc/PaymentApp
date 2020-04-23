import React, { useState, useLayoutEffect } from "react";

import TotalView from "./Total.view";
import PaymentStore, { initialState } from "../../store/payments";

const Total = () => {
  const [paymentState, setPaymentState] = useState(initialState);
  const [total, setTotal] = useState(0);

  useLayoutEffect(() => {
    const subscription = PaymentStore.subscribe(setPaymentState);
    PaymentStore.init();

    return () => {
      subscription.unsubscribe();
    };
  });

  const calculateTotal = () => {
    let sum = 0;
    paymentState.forEach((payment) => (sum += payment.amount));
    return sum;
  };

  return <TotalView total={calculateTotal()} />;
};

export default Total;
