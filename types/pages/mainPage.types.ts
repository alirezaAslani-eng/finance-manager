import type { GlobalAppProps } from "@/types/pages/Global.types";
import { RecentTransactionType } from "../transaction.types";

interface MainPageProps extends GlobalAppProps {
  recentTransactions: RecentTransactionType[];
}

export type { MainPageProps };
