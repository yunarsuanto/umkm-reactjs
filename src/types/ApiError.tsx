export interface ApiErrorType {
  status?: number;
  data?: unknown;
  message?: string;
}

export class ApiErrorClass extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}