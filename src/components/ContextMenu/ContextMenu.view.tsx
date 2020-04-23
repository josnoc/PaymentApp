import React from "react";

import "./ContextMenu.scss";

interface IProps {
  onOutsideClicked: () => void;
  onDeleteClicked: () => void;
  onEditClicked: () => void;
}

const ContextMenuView = (props: React.PropsWithChildren<IProps>) => {
  return (
    <div className="ContextMenu">
      <div onClick={props.onOutsideClicked} className="background"></div>
      <div className="Menu">
        <p onClick={props.onDeleteClicked} className="item">
          <span className="icon icon-trash-sharp" />
          Remove
        </p>
        <div className="separator"></div>
        <p onClick={props.onEditClicked} className="item">
          <span className="icon icon-pencil-sharp" />
          Edit
        </p>
      </div>
    </div>
  );
};

export default ContextMenuView;
