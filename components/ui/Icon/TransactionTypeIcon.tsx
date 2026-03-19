import { Transaction } from "@/types/transaction.types";
import { CallReceivedRounded } from "@mui/icons-material";
import { SvgIconProps } from "@mui/material";

function TransactionTypeIcon({
  svgIconProps = {},
  type,
}: {
  svgIconProps?: SvgIconProps;
  type: Transaction["type"];
}) {
  return (
    <>
      {type === "1" && <CallReceivedRounded color="success" {...svgIconProps} />}
      {type === "0" && (
        <CallReceivedRounded
          color="error"
          sx={{ rotate: "180deg" }}
          {...svgIconProps}
        />
      )}
    </>
  );
}

export default TransactionTypeIcon;
