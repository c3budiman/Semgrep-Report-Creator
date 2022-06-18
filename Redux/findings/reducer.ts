import { FindingsType } from "../../Types/Findings";

type actionType = {
  type: string;
  payload: any;
};

type INIT_STATE_TYPE = {
  findings: FindingsType[];
  githubRepo: string;
  findingsBySeverity: any;
}

const INIT_STATE:INIT_STATE_TYPE = {
  findings: [],
  githubRepo: "",
  findingsBySeverity: [
    {
      severity: "LOW",
      count: 0,
    },
    {
      severity: "MEDIUM",
      count: 0,
    },
    {
      severity: "HIGH",
      count: 0,
    },
  ],
};

const calculateFindings = (Findings: FindingsType[]) => {
  let low = 0;
  let medium = 0;
  let high = 0;
  Findings.forEach((value) => {
    if (value.finding?.severity === 0) low += 1;
    if (value.finding?.severity === 1) medium += 1;
    if (value.finding?.severity === 2) high += 1;
  });
  return [
    {
      severity: "LOW",
      count: low,
    },
    {
      severity: "MEDIUM",
      count: medium,
    },
    {
      severity: "HIGH",
      count: high,
    },
  ];
};

// eslint-disable-next-line default-param-last
const Findings = (state = INIT_STATE, action: actionType) => {
  switch (action.type) {
    case "INSERT_FINDINGS":
      return {
        ...state,
        findings: action.payload,
      };
    case "INSERT_GITHUB_URL":
      return {
        ...state,
        githubRepo: action.payload,
      };
    case "CALCULATE_FINDINGS":
      return {
        ...state,
        findingsBySeverity: calculateFindings(state.findings),
      };
    case "CLEAR_FINDINGS":
      return {
        ...state,
        findings: [],
      };
    default:
      return state;
  }
};

export default Findings;
