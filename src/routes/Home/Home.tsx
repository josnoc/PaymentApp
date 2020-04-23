import * as React from "react";
import Moment from "moment";

import "./Home.scss";
import PaymentList from "../../components/PaymentList";
import Total from "../../components/Total";
import Add from "../../components/Add";
import AppStore, { initialState } from "../../store/app";
import PaymentVisualizer from "../../components/PaymentVisualizer";
import ContextMenu from "../../components/ContextMenu";

const Home: React.SFC = () => {
  const [appState, setAppState] = React.useState(initialState);

  React.useLayoutEffect(() => {
    const subscription = AppStore.subscribe(setAppState);
    AppStore.init();

    return () => {
      subscription.unsubscribe();
    };
  });

  return (
    <div className="home">
      <Total />
      <PaymentList />
      <Add />
      {appState.isPaymentVisualizerOpened && (
        <PaymentVisualizer
          mode={appState.visualizerOpenMode}
          id={appState.visualizerId}
        />
      )}
    </div>
  );
};

export default Home;
