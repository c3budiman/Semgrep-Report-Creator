import { FindingsType } from "../../Types/Findings";

export const InsertFindings = (key: FindingsType[]) => ({
  type: "INSERT_FINDINGS",
  payload: key,
});

export const InsertGithub = (key: string) => ({
  type: "INSERT_GITHUB_URL",
  payload: key,
});

export const CalculateFindings = () => ({
  type: "CALCULATE_FINDINGS",
  payload: "",
});

export const ClearFindings = () => ({
  type: "CLEAR_FINDINGS",
  payload: "",
});
