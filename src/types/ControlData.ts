import { DemandDataType } from "./DemandData";

export type ControlDataType = {
  id: number;
  initialDate: string;
  finalDate: string;
  demandData: DemandDataType[] | [];
};