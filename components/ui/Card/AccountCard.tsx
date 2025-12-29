import { TextPrice } from "@/components/ui";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import React from "react";
import Link from "next/link";
import { Account_face } from "@/types/account.types";
import { useActiveAccount } from "@/hooks";

interface MyProp
  extends Partial<
    Pick<
      Account_face,
      "accountName" | "cardNumber" | "currentBalance" | "isActive"
    >
  > {
  onlyInfo?: boolean;
  _id?: string;
  // * Events ======= >
  onEnable?: (_id: string) => void;
}
function AccountCard({
  onlyInfo,
  accountName,
  cardNumber,
  currentBalance = 0,
  isActive,
  _id,
  onEnable = () => {},
}: MyProp) {
  // * Events =============== >
  const enable = () => {
    onEnable(_id || "");
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        borderRadius: "25px",
        overflow: "hidden",
      }}
    >
      {/* Body Card ============================== > */}
      <Box
        sx={({ palette }) => ({
          padding: "20px 15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: palette.primary.main,
        })}
      >
        {/* Card Number =============== > */}
        <Typography
          component={"span"}
          display={"block"}
          sx={({ palette }) => ({
            // * Responsive fontSize ====>
            fontSize: {
              xs: "24px",
              _700: "26px",
              md: "20px",
              lg: "26px",
              xl: "20px",
            },
            color: palette.grey[50],
          })}
        >
          {cardNumber}
        </Typography>

        {/* Owner name =================================> */}
        <Typography
          component={"span"}
          sx={({ palette }) => ({
            color: palette.grey[50],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px ",
            flexWrap: "wrap",
          })}
        >
          {`به نام : ${accountName}`}
          {/* // * Current balance =================== > */}
          <TextPrice price={currentBalance || 0} />
        </Typography>
      </Box>

      <Divider />
      {/* Footer =============================== > */}
      {!onlyInfo && (
        <Box
          sx={({ palette, alpha }) => ({
            p: "8px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: alpha(palette.primary.main, 0.1),
          })}
        >
          {/* Enable Button ======================== > */}
          <Button
            onClick={enable}
            variant={isActive ? "contained" : "outlined"}
            size="medium"
            sx={(tm) => {
              return {
                ...(tm.custom!.circleButton as object),
              };
            }}
          >
            {isActive ? (
              <DoneRoundedIcon />
            ) : (
              <Typography sx={{ fontSize: "14px" }}>{"فعال کردن"}</Typography>
            )}
          </Button>
          {/* Edit Button ============================== > */}
          <Link href={`/my-panel/account/add?edit=${_id}`}>
            <Button variant="outlined">
              <EditNoteRoundedIcon />
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default AccountCard;
