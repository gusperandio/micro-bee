import { AwardType } from "./Award";
import { CreditCardType } from "./CreditCard";
import { NewsType } from "./News";
import { PaymentType } from "./Payment";
import { RoleType } from "./Roles";

export type UserType = {
  name: string;
  password?: string;
  email: string;
  age: number;
  avatar?: string;
  socialAuth?: boolean;
  premiumTime?: Date;
  lastLogin?: Date;
  role?: string;
  news?: NewsType[];
  awards?: AwardType[];
  creditCard?: CreditCardType;
  payments?: PaymentType[];
};

export type UserLoginType = {
  email: string;
  password: string;
};

export type UserSocialLoginType = {
  email: string;
  password: string;
  name: string;
  socialAuth: boolean;
};