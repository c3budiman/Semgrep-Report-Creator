import { SelectSessionType } from "../../Types/AssesmentSession";

type actionType = {
  type: string;
  payload: any;
};

type INIT_STATE_TYPE = {
  selectedSessions: SelectSessionType
};

const INIT_STATE: INIT_STATE_TYPE = {
  selectedSessions: {
    uuid: "",
    name: "",
    githubRepo: "",
  },
};

// eslint-disable-next-line default-param-last
const AssesmentSession = (state = INIT_STATE, action: actionType) => {
  switch (action.type) {
    case "SELECT_ASSESMENT":
      return {
        ...state,
        selectedSessions: action.payload,
      };
    default:
      return state;
  }
};

export default AssesmentSession;
