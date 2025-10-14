import { GetOneTransactionServiceType } from "@/lib/services/types/services.types";

interface TransactionInfoPageProps {
  // * is content editable or readonly ================= >
  isEditable: boolean;
  transactionInfo: GetOneTransactionServiceType;
}

export type { TransactionInfoPageProps };
