/* eslint-disable arrow-body-style */
import { FindingsType } from "../../../Types/Findings";

const severitySemgrep = ["LOW", "MEDIUM", "HIGH"];
type SemgrepConverterType = { data?: FindingsType[]; sessionsId?: string };
const SemgrepConverter = ({ data, sessionsId }: SemgrepConverterType) => {
  return data?.map((item: FindingsType) => {
    const cwe = item?.finding?.metadata?.cwe;
    const cweString = typeof cwe === "string" ? cwe : cwe?.join(", ");
    return {
      githubPath: `${item?.finding?.path}#L${item?.finding?.line}`,
      message: item?.finding?.message,
      cwe: cweString,
      owasp: item?.finding?.metadata?.["owasp-web"],
      references: item?.finding?.metadata?.shortlink,
      severity: item?.finding?.severity
        ? severitySemgrep[item?.finding?.severity]
        : "LOW",
      sessionsId,
      idStatus: "3d7a951a-df70-4be2-9483-8fd2661ee911"
    };
  });
};

export default SemgrepConverter;
