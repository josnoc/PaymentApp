import React from "react";

import ContextMenuView from "./ContextMenu.view";
import appStore from "../../store/app";
import PaymentStore from "../../store/payments";

interface IProps {
  id: number;
}

const ContextMenu = (props: React.PropsWithChildren<IProps>) => {
  const onOutsideClick = () => {
    appStore.closeContextMenu();
  };

  const onDelete = () => {
    PaymentStore.removePayment(props.id);
    appStore.closeContextMenu();
  };

  const onEdit = () => {
    appStore.openPaymentVisualizer("editing", props.id);
    appStore.closeContextMenu();
  };

  return (
    <ContextMenuView
      onOutsideClicked={onOutsideClick}
      onDeleteClicked={onDelete}
      onEditClicked={onEdit}
    />
  );
};

export default ContextMenu;
