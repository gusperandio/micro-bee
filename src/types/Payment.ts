import { UserType } from "./User";
import { VoucherType } from "./Voucher";

export type PaymentType = {
  id: number;
  amount: number;
  method: PaymentMethod;
  userId: number;
  user: UserType;
  createdAt: string;
  updatedAt: string;
  voucherId?: number;
  voucher?: VoucherType;
};

export enum PaymentMethod {
  PIX = "PIX",
  CREDIT_CARD = "CREDIT_CARD",
  IN_APP_PURCHASE = "IN_APP_PURCHASE",
  PAYPAL = "PAYPAL",
  VOUCHER = "VOUCHER",
}
