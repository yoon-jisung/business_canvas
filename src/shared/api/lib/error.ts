import axios from 'axios';

export class APIError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const handleAPIError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new APIError(
      error.response?.data?.code ?? 'UNKNOWN_ERROR',
      error.response?.data?.message ?? 'Unknown error occurred',
      error.response?.status ?? 500,
      error.response?.data?.details
    );
  }
  throw error;
};
