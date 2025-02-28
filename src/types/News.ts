import { TagType } from "./Tag";
import { UserType } from "./User";

export type NewsType = {
  id: number;
  title: string;
  argument: string;
  tags: TagType[];
  userId: number; 
  important: boolean;
  cover: string;
  photo1: string;
  photo2: string;
  photo3: string;
  createdAt: string;
  updatedAt: string;
};
