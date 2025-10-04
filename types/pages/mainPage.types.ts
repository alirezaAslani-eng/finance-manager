import { GlobalAppProps } from "@/pages/_app";
import { RecentTransactionType } from "../transaction.types";

interface MainPageProps extends GlobalAppProps {
  recentTransactions: RecentTransactionType[];
}

export type { MainPageProps };
