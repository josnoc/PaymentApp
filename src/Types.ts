import { Moment } from "moment";

export interface IPayment {
  date: Moment;
  description: string;
  amount: number;
}
