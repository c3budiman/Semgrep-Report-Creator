import { SelectSessionType } from "../../Types/AssesmentSession";

// eslint-disable-next-line import/prefer-default-export
export const SelectAssesment = (key: SelectSessionType) => ({
  type: "SELECT_ASSESMENT",
  payload: key,
});
