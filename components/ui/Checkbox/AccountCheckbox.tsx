import {
  Box,
  BoxProps,
  Checkbox,
  CheckboxProps,
} from "@mui/material";
import BankIcon from "../Img/BankIcon";
import { Account } from "@/types/account.types";
import { formatBankNumber } from "@/lib/utils";
function AccountCheckbox(props: BoxProps) {
  return (
    <Box display={"flex"} alignItems={"center"} gap={"4px"}>
      {props.children}
    </Box>
  );
}

AccountCheckbox.InfoSection = function ({
  accountName,
  bankIcon,
  bankName,
  cardNumber,
}: Partial<
  Pick<Account, "accountName" | "bankName" | "bankIcon" | "cardNumber">
>) {
  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} gap={"8px"}>
        <BankIcon src={bankIcon} alt={bankName} />
        {accountName}
      </Box>
      {formatBankNumber(cardNumber ?? "")}
    </Box>
  );
};
AccountCheckbox.CheckBox = function (props: CheckboxProps) {
  return <Checkbox size="medium" color="success" {...props} />;
};

export default AccountCheckbox;
