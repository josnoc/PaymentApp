import { Moment } from "moment";

export interface IPayment {
  date: Moment;
  description: string;
  amount: number;
}

export interface IAppState {
  isPaymentVisualizerOpened: boolean;
  isContextMenuOpened: boolean;
  visualizerOpenMode: visualizerOpenMode;
  visualizerId: number | undefined;
  contextId: number | undefined;
}

export type visualizerOpenMode = "editing" | "adding";

export type setAppState = (state: IAppState) => void;

export type Payments = IPayment[];

export type setPaymentsState = (state: Payments) => void;
