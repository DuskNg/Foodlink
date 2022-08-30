export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  status?: string;
  token?: string;

  createdAt?: number;
  updatedAt?: number;
}
