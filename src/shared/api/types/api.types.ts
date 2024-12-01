export type APIResponse<T = unknown> = {
  result: T;
  status: number;
  message: string;
};

export type ErrorResponse = {
  code: string;
  message: string;
  details?: Record<string, string[]>;
};
