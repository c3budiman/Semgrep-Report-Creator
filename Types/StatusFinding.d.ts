export interface RowStatusFinding {
  id?: string;
  name?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export interface StatusFinding {
  count?: number;
  rows?: RowStatusFinding[];
}
