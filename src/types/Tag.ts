import { NewsType } from "./News";

export type TagType = {
  id: number;
  name: string;
  news: NewsType[];
};
