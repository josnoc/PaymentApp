import React from "react";

import "./Total.scss";

interface IProps {
  total: number;
}

const TotalView = (props: React.PropsWithChildren<IProps>) => {
  return (
    <div className="Total">
      <p>
        Total Amount:
        <span className="amount">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(props.total)}{" "}
        </span>{" "}
      </p>
    </div>
  );
};

export default TotalView;
