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
  dateError: string;
  isAmountValid: boolean;
  amountError: string;
}

const defaultState: IState = {
  date: null,
  amount: "",
  description: "",
  isDateValid: true,
  dateError: "",
  isAmountValid: true,
  amountError: "",
};

const PaymentVisualizer = (props: React.PropsWithChildren<IProps>) => {
  const getInitialState = () => {
    if (props.mode === "editing")
      return {
        ...defaultState,
        ...PaymentStore.getPayment(props.id!),
      } as IState;
    return defaultState;
  };

  const [formState, setFormState] = useState(getInitialState());

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = moment(event.target.value);

    dateIsValid(event.target.value ? newDate : undefined);
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

  const dateIsValid = (newDate: Moment | undefined) => {
    const today = moment();

    if (!newDate) {
      setFormState((prev) => ({
        ...prev,
        isDateValid: false,
        date: null,
        dateError: "Date is required",
      }));
      return false;
    }

    if (newDate.isBefore(today.subtract(8, "days"))) {
      setFormState((prev) => ({
        ...prev,
        isDateValid: false,
        date: null,
        dateError: "Date cannot be more than 7 days ago",
      }));
      return false;
    }

    setFormState((prev) => ({ ...prev, isDateValid: true, date: newDate }));
    return true;
  };

  const amountIsValid = (newAmount: number) => {
    if (isNaN(newAmount)) {
      setFormState((prev) => ({
        ...prev,
        isAmountValid: false,
        amount: "",
        amountError: "Amount can only contain numbers.",
      }));
      return false;
    }
    if (newAmount < 0) {
      setFormState((prev) => ({
        ...prev,
        isAmountValid: false,
        amount: "",
        amountError: "Only positive values are valid",
      }));
      return false;
    }
    if (newAmount === 0) {
      setFormState((prev) => ({
        ...prev,
        isAmountValid: false,
        amount: "",
        amountError: "Amount is required",
      }));
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
      amountError={formState.amountError}
      dateError={formState.dateError}
      onSubmit={onSubmit}
    />
  );
};

export default PaymentVisualizer;
