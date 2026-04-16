import { EditTransactionSchemaType } from "@/lib/validations/types";
import { StackProps } from "@mui/material";

interface EditTransactionFormProps {
  transaction: EditTransactionSchemaType;
}
interface EditTransactionFormContainerProps {
  stackProps?: StackProps;
  isLatestTransaction: boolean;
}

export type { EditTransactionFormProps, EditTransactionFormContainerProps };
