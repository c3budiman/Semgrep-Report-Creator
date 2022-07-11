export interface FindingResponseSession {
  id?: string;
  name?: string;
  githubMain?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface statusFindingResponse {
  id?: string;
  name?: string;
}

export interface RowFindingResponse {
  id?: string;
  githubPath?: string;
  message?: string;
  cwe?: string;
  owasp?: string;
  references?: string;
  severity?: string;
  isFalsePositive?: boolean;
  assesmentWord?: string;
  sessionsId?: string;
  status: statusFindingResponse;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  session?: FindingResponseSession;
}

export interface FindingResponse {
  count?: number;
  rows?: RowFindingResponse[];
}

export interface DatumFindingResponse {
  id?: string;
  githubPath?: string;
  message?: string;
  cwe?: string;
  owasp?: string;
  references?: string;
  severity?: string;
  isFalsePositive?: boolean;
  assesmentWord?: string;
  sessionsId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CreateFindingResponse {
  statusCode?: number;
  data?: DatumFindingResponse[];
}

export interface SummaryResponseDatum {
  severity?: "LOW" | "MEDIUM" | "HIGH";
  count_severity?: number;
}

export interface SummaryResponse {
  statusCode?: number;
  data?: SummaryResponseDatum[];
}

export interface UpdateFindingResponse {
  statusCode?: number;
  data?: DatumFindingResponse;
}
