export interface FindingRequest {
  githubPath?: string;
  message?: string;
  cwe?: string;
  owasp?: string;
  references?: string;
  severity?: "low" | "medium" | "high";
  isFalsePositive?: boolean;
  assesmentWord?: string | undefined;
  sessionsId?: string;
}
