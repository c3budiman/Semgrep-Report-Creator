export interface SelectSessionType {
  uuid: string | undefined;
  name: string | undefined;
  githubRepo: string | undefined;
}

export interface DataInsAssesmentSessionType {
  id?: string;
  name?: string;
  githubMain?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
}

export interface InsertAssesmentSessionsResponse {
  statusCode?: number;
  data?: DataInsAssesmentSessionType;
}

export interface RowSelectAssesmentSessionsResponse {
  id?: string;
  name?: string;
  githubMain?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
}

export interface SelectAssesmentSessionsResponse {
  count?: number;
  rows?: RowSelectAssesmentSessionsResponse[];
}
