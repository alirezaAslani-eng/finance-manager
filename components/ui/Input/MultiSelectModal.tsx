import React, { useState } from "react";
import { MultipleSelectCheckmarks } from "..";
import { Button, Dialog, Stack, Typography, useTheme } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { muiTheme } from "@/utils";
import { MultipleSelectCheckmarksProps } from "./MultipleSelectCheckmarks";
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
        <Button size="medium" onClick={openSelectList}>
          {`${!!itemCount ? `${itemCount} مورد` : "انتخاب"}`}
        </Button>
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
          sx={({ palette: { mode, grey }, alpha }) => {
            return {
              borderBottom: "1px solid",
              pb: "10px",
              borderColor: muiTheme(mode, {
                dark: alpha(grey[100], 0.3),
                light: alpha(grey[800], 0.3),
              }),
            };
          }}
        >
          {/* // * Close select modal ========= > */}
          <Button
            size="small"
            onClick={closeSelectList}
            variant="text-grey"
            sx={(tm) => ({ ...tm.custom.circleButton })}
          >
            <CloseRoundedIcon />
          </Button>
        </Stack>
        {/* // * Options List ====================== > */}
        <MultipleSelectCheckmarks
          onDisable={onDisable}
          onEnable={onEnable}
          activedCheckBoxs={activedCheckBoxs}
          containerProps={{
            sx: ({ custom: { noScroll } }) => ({
              maxHeight: "300px",
              overflow: "hidden auto",
              ...(noScroll as object),
            }),
          }}
          items={items}
        />
      </Dialog>
    </>
  );
}

export default ModalSelect;
