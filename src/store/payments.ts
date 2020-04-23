import { Subject } from "rxjs";
import { Payments, setPaymentsState, IPayment } from "../Types";

const subject = new Subject<Payments>();

export const initialState: Payments = [];

let state = initialState;

const PaymentStore = {
  init: () => subject.next(state),
  subscribe: (setState: setPaymentsState) => subject.subscribe(setState),
  getPayment: (id: number) => {
    return state[id];
  },
  addPayment: (payment: IPayment) => {
    state = [...state, payment];
    subject.next(state);
  },
  removePayment: (id: number) => {
    state = state.filter((payment, index) => index !== id);
    subject.next(state);
  },
  editPayment: (id: number, changes: IPayment) => {
    state = state.map((payment, index) =>
      index === id ? { ...payment, ...changes } : payment
    );
    subject.next(state);
  },
};

export default PaymentStore;
