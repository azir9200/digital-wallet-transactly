export type TransactionStatus = "PENDING" | "COMPLETED" | "REVERSED" | "CANCEL";

export interface TUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  _id?: string; // if backend uses Mongo IDs
}

export interface TTransfer {
  id: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
  receiver?: TUser;
}
