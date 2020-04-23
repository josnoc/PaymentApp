import React from "react";

import "./PaymentVisualizer.scss";
import { IPayment, visualizerOpenMode } from "../../Types";
import { Moment } from "moment";

interface IProps {
  mode: visualizerOpenMode;
  date: Moment | null;
  amount: string | number;
  description: string;
  isDateValid: boolean;
  isAmountValid: boolean;
  amountError: string;
  dateError: string;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAmountBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (payment: IPayment) => void;
  onOutsideClick?: () => void;
}

const PaymentVisualizerView = (props: React.PropsWithChildren<IProps>) => {
  const onSubmit = () => {
    props.onSubmit({
      date: props.date!,
      amount: Number(props.amount),
      description: props.description,
    });
  };

  return (
    <div className="PaymentVisualizer">
      <div className="background" onClick={props.onOutsideClick}></div>
      <form className="form">
        <div
          className={`input_container ${!props.isDateValid ? "invalid" : ""}`}
        >
          <label htmlFor="date" className="icon icon-calendar-sharp" />
          <input
            onChange={props.onDateChange}
            onBlur={props.onDateChange}
            id="date"
            className="input date"
            type="date"
            required
            value={props.date ? props.date.format("YYYY-MM-DD") : ""}
          />
          <label htmlFor="date">Date:</label>
        </div>
        {!props.isDateValid && (
          <p className="error-message">{props.dateError}</p>
        )}
        <div
          className={`input_container ${!props.isAmountValid ? "invalid" : ""}`}
        >
          <input
            onChange={props.onAmountChange}
            onBlur={props.onAmountBlur}
            id="amount"
            className="input"
            type="text"
            value={props.amount ? props.amount : ""}
            required
          />
          <label htmlFor="amount">Amount:</label>
        </div>
        {!props.isAmountValid && (
          <p className="error-message">{props.amountError}</p>
        )}
        <div className="input_container">
          <textarea
            id="description"
            className="input"
            maxLength={255}
            onChange={props.onDescriptionChange}
            value={props.description}
            required
          ></textarea>
          <label htmlFor="description">Description:</label>
        </div>
        <button type="button" onClick={onSubmit} className="submit">
          {props.mode === "adding" ? "Create" : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default PaymentVisualizerView;
