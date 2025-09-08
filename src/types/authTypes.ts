import type { ComponentType } from "react";

export type TRole = "SUPER_ADMIN" | "ADMIN" | "AGENT" | "USER";

 export type Status = "ACTIVE" | "InACTIVE" | "BLOCKED";

export type AgentStatus = "pending" | "approved" | "suspended";

export interface ILogin {
  email: string;
  password: string;
}

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string;
}
