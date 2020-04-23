import React from "react";
import { IPayment } from "../../Types";

import "./Payment.scss";
import ContextMenu from "../ContextMenu";

interface IProps {
  id: number;
  payment: IPayment;
  isContextMenuOpened: boolean;
  onSettingsClicked: () => void;
}

const PaymentView = (props: React.PropsWithChildren<IProps>) => {
  return (
    <div className="Payment">
      <p className="date">{props.payment.date.format("MMMM DD,YYYY")}</p>
      <p className="description">{props.payment.description}</p>
      <p className="amount">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(props.payment.amount)}
      </p>
      <p
        onClick={props.onSettingsClicked}
        className="settings icon-ellipsis-vertical"
      ></p>
      {props.isContextMenuOpened && <ContextMenu id={props.id} />}
    </div>
  );
};

export default PaymentView;
