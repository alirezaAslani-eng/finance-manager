interface ClientError {
  type: "client"; // * client error types usually show for user as an alert or a text
  message: string;
}
interface DevError {
  // * This type of error won't show for user it's only for development side
  type: "validation" | "database" | "database-network" | "unknown";
  message: unknown;
}
export type { ClientError, DevError };
