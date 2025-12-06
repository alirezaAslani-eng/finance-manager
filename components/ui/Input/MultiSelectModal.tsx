import React, { useState } from "react";
import { ModalHandler, MuiButton, MultipleSelectCheckmarks } from "..";
import {
  Box,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { muiTheme } from "@/utils";
import { MultipleSelectCheckmarksProps } from "./MultipleSelectCheckmarks";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { dana_md } from "@/utils/font";
interface MyProps
  extends Pick<
    MultipleSelectCheckmarksProps,
    "activedCheckBoxs" | "items" | "onDisable" | "onEnable"
  > {
  placeholder?: string;
}

function ModalSelect({
  activedCheckBoxs,
  items,
  placeholder = "انتخاب ایتم",
  onDisable,
  onEnable,
}: MyProps) {
  // * true = opened select list of check boxes ===== >
  const [isOpen, setIsOpen] = useState(false);

  // * Count ofSelected Items ===== >
  const itemCount = activedCheckBoxs?.length;

  // * Open Modal ======= >
  const openSelectList = () => {
    setIsOpen(true);
  };
  // * Close Modal ======= >
  const closeSelectList = () => {
    setIsOpen(false);
  };

  const theme = useTheme();
  // * MUI Theme =============== >
  const {
    palette: { grey, mode },
    alpha,
  } = theme;
  const noScroll = theme.custom.noScroll;
  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* // * Right side Text ============ > */}
        <Typography
          onClick={openSelectList}
          component={"span"}
          sx={{ cursor: "pointer" }}
        >
          {placeholder}
        </Typography>
        {/* // * Chosse button ============ > */}
        <MuiButton
          reset
          buttonProps={{
            variant: "text",
            onClick: openSelectList,
            sx: { p: "5px" },
          }}
        >
          {`${!!itemCount ? `${itemCount} مورد` : "انتخاب"}`}
        </MuiButton>
      </Stack>

      {/* // * Select Modal ======================= > */}
      <Dialog
        className={dana_md.className}
        open={isOpen}
        onClose={closeSelectList}
        // maxWidth={false}
        PaperProps={{
          style: {
            width: "min(400px,100%)",
            padding: "20px",
          },
        }}
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{
            borderBottom: "1px solid",
            pb: "10px",
            borderColor: muiTheme(mode, {
              dark: alpha(grey[100], 0.3),
              light: alpha(grey[800], 0.3),
            }),
          }}
        >
          {/* // * Close select modal ========= > */}
          <MuiButton
            reset
            buttonProps={{
              variant: "text",
              onClick: closeSelectList,
              sx: {
                color: muiTheme(mode, { dark: grey[100], light: grey[700] }),
                borderRadius: "999px",
              },
            }}
          >
            <CloseRoundedIcon />
          </MuiButton>
        </Stack>
        {/* // * Options List ====================== > */}
        <MultipleSelectCheckmarks
          onDisable={onDisable}
          onEnable={onEnable}
          activedCheckBoxs={activedCheckBoxs}
          containerProps={{
            sx: { maxHeight: "300px", overflow: "hidden auto", ...noScroll },
          }}
          items={items}
        />
      </Dialog>
    </>
  );
}

export default ModalSelect;
