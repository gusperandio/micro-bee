import { PaymentType } from "./Payment";

export type VoucherType = {
  id: number;
  code: string;
  discountPercent: number;
  createdAt: string;
  updatedAt: string;
  payments: PaymentType[];
};
