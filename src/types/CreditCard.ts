import { UserType } from "./User";

export type CreditCardType = {
  id: number;
  cardNumber: string;
  cardHolderName: string;
  expirationDate: string;
  cvv: string;
  userId: number;
  user: UserType;
  createdAt: string;
  updatedAt: string;
};
