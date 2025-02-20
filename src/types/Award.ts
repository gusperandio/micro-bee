import { UserType } from "./User";

export type AwardType = {
  id: number;
  title: string;
  year: number;
  description: string;
  userId: number;
  user: UserType;
};
