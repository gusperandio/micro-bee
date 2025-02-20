import { AwardType } from "./Award";
import { CreditCardType } from "./CreditCard";
import { NewsType } from "./News";
import { PaymentType } from "./Payment";

export type UserType = {
  id: number;
  name: string;
  password?: string;
  email: string;
  age: number;
  socialAuth?: boolean;
  premiumTime?: Date;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  news: NewsType[];
  awards: AwardType[];
  creditCard?: CreditCardType;
  payments: PaymentType[];
};
