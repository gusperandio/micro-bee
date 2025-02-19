import { ControlDataType } from "./ControlData";

export type DemandDataType = {
  id: number;
  project: string;
  type: string;
  who: string;
  supp: string;
  demand: string;
  analist: string;
  aprov: string;
  dev: string;
  test: string;
  date: string;
  usersApproved: string[];
  usersRefused: string[];
  usersIndifferent: string[];
  controlDataId: number;
  controlData: ControlDataType;
};

