import { Moment } from "moment";

export interface IPayment {
  date: Moment;
  description: string;
  amount: number;
}

export interface IAppState {
  isNewPaymentOpened: boolean;
}

export type setAppState = (state: IAppState) => void;
