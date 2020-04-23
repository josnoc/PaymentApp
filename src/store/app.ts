import { Subject } from "rxjs";
import { setAppState, IAppState } from "../Types";

const subject = new Subject<IAppState>();

export const initialState: IAppState = {
  isNewPaymentOpened: false,
};

let state = initialState;

const appStore = {
  init: () => subject.next(state),
  subscribe: (setState: setAppState) => subject.subscribe(setState),
  openNewPayment: () => {
    state = {
      ...state,
      isNewPaymentOpened: true,
    };
    subject.next(state);
  },
  closeNewPayment: () => {
    state = {
      ...state,
      isNewPaymentOpened: false,
    };
    subject.next(state);
  },
};

export default appStore;
