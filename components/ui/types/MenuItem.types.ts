import { Account } from "@/types/account.types";

// * ----- AccountMenuItem.tsx -----

interface AccountMenuItemProps extends Pick<
  Account,
  "accountName" | "cardNumber" | "bankIcon" | "bankName"
> {}

export type { AccountMenuItemProps };
