import React, { useState } from "react";
import moment, { Moment } from "moment";

import PaymentVisualizerView from "./PaymentVisualizer.view";
import { IPayment, visualizerOpenMode } from "../../Types";
import appStore from "../../store/app";
import PaymentStore from "../../store/payments";

interface IProps {
  mode: visualizerOpenMode;
  id?: number;
}

interface IState {
  date: Moment | null;
  amount: string | number;
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

const PaymentVisualizer = (props: React.PropsWithChildren<IProps>) => {
  const getInitialState = () => {
    if (props.mode === "editing" && props.id)
      return {
        ...defaultState,
        ...PaymentStore.getPayment(props.id),
      } as IState;
    return defaultState;
  };

  const [formState, setFormState] = useState(getInitialState());

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
    if (dateIsValid(payment.date) && amountIsValid(payment.amount)) {
      if (props.mode === "adding") PaymentStore.addPayment(payment);
      else PaymentStore.editPayment(props.id!, payment);
      appStore.closePaymentVisualizer();
    }
  };

  const onOutsideClick = () => {
    appStore.closePaymentVisualizer();
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
      mode={props.mode}
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
