type ErrorType = "database" | "dev" | "client" | "unknown";
interface BadResponse_face {
  message: string;
  devMessage?: unknown;
  statusCode: number;
  type: ErrorType;
}

export type { BadResponse_face };
