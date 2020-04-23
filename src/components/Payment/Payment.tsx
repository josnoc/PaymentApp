import React, { useState, useLayoutEffect } from "react";

import PaymentView from "./Payment.view";
import { IPayment } from "../../Types";
import appStore, { initialState } from "../../store/app";
import { Moment } from "moment";

interface IProps extends IPayment {
  id: number;
}

const Payment = (props: React.PropsWithChildren<IProps>) => {
  const [appState, setAppState] = useState(initialState);

  useLayoutEffect(() => {
    const subscription = appStore.subscribe(setAppState);
    appStore.init();

    return () => {
      subscription.unsubscribe();
    };
  });

  const onSettingsClicked = () => {
    appStore.openContextMenu(props.id);
  };

  return (
    <PaymentView
      id={props.id}
      payment={props}
      onSettingsClicked={onSettingsClicked}
      isContextMenuOpened={
        appState.isContextMenuOpened && appState.contextId === props.id
      }
    />
  );
};

export default Payment;
