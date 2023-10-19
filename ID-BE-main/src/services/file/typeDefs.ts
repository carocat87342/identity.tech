export type CreateFileInput = {
  filename: string;
  size: number;
  format: string;
  userId: string;
}

export type LoginInput = {
  email: string;
  password: string;
}