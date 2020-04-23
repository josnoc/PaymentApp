import React, { useState } from "react";
import moment, { Moment } from "moment";

import PaymentVisualizerView from "./PaymentVisualizer.view";
import { IPayment } from "../../Types";
import appStore from "../../store/app";

interface IState {
  date: Moment | null;
  amount: string;
  description: string;
  isDateValid: boolean;
  isAmountValid: boolean;
}

const defaultState: IState = {
  date: null,
  amount: "",
  description: "",
  isDateValid: true,
  isAmountValid: true,
};

const PaymentVisualizer = () => {
  const [formState, setFormState] = useState(defaultState);

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = moment(event.target.value);

    dateIsValid(newDate);
  };

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = event.target.value;
    setFormState((prev) => ({
      ...prev,
      isAmountValid: true,
      amount: newAmount,
    }));
  };

  const onDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescription = event.target.value;
    setFormState((prev) => ({ ...prev, description: newDescription }));
  };

  const onAmountBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(event.target.value);
    amountIsValid(newAmount);
  };

  const onSubmit = (payment: IPayment) => {
    console.log("submitted?");
    if (dateIsValid(payment.date) && amountIsValid(payment.amount)) {
    }
  };

  const onOutsideClick = () => {
    console.log("clicked?");
    appStore.closeNewPayment();
  };

  const dateIsValid = (newDate: Moment) => {
    const today = moment();

    if (newDate && newDate.isSameOrAfter(today.subtract(8, "days"))) {
      setFormState((prev) => ({ ...prev, isDateValid: true, date: newDate }));
      return true;
    } else
      setFormState((prev) => ({ ...prev, isDateValid: false, date: null }));
    return false;
  };

  const amountIsValid = (newAmount: number) => {
    if (isNaN(newAmount) || newAmount === 0) {
      setFormState((prev) => ({ ...prev, isAmountValid: false, amount: "" }));
      return false;
    }
    return true;
  };

  return (
    <PaymentVisualizerView
      date={formState.date}
      amount={formState.amount}
      description={formState.description}
      onDateChange={onDateChange}
      onAmountChange={onAmountChange}
      onAmountBlur={onAmountBlur}
      onDescriptionChange={onDescriptionChange}
      onOutsideClick={onOutsideClick}
      isDateValid={formState.isDateValid}
      isAmountValid={formState.isAmountValid}
      onSubmit={onSubmit}
    />
  );
};

export default PaymentVisualizer;
