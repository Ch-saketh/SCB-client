export type ID = string | number;

export type StatusType = 'idle' | 'loading' | 'success' | 'error';

export type UserRole = 'user' | 'admin';

export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
