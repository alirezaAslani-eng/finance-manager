import { SideBarButton } from "@/components/ui";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import AddchartRoundedIcon from "@mui/icons-material/AddchartRounded";
import AddCardRoundedIcon from "@mui/icons-material/AddCardRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { Box } from "@mui/material";
import React from "react";
import { useModal } from "@/context";

interface MyProp {
  onSideBarClick?: () => void;
}
function SideBarItems({ onSideBarClick = () => {} }: MyProp) {
  // * Modal Context to open category modal ===== >
  const { openAddCategoryModal } = useModal();

  return (
    <>
      <Box>
        <SideBarButton
          buttonProps={{ onClick: onSideBarClick }}
          menuItem={{
            icon: <HomeRoundedIcon />,
            text: "داشبورد",
            link: "/my-panel",
          }}
        />

        <SideBarButton
          buttonProps={{ onClick: onSideBarClick }}
          menuItem={{
            icon: <ReceiptLongRoundedIcon />,
            text: "تراکنش ها",
            link: "/my-panel/transactions",
          }}
        />

        <SideBarButton
          buttonProps={{ onClick: onSideBarClick }}
          menuItem={{
            icon: <AddchartRoundedIcon />,
            text: "تراکنش جدید",
            link: "/my-panel/transactions/add",
          }}
        />

        <SideBarButton
          buttonProps={{ onClick: onSideBarClick }}
          menuItem={{
            icon: <AddCardRoundedIcon />,
            text: "حساب جدید",
            link: "/my-panel/account/add",
          }}
        />
        {/* // *  Open Category Modal ============= >  */}
        <SideBarButton
          noLink
          buttonProps={{ onClick: openAddCategoryModal }} // * Open Modal <<<<<
          menuItem={{
            icon: <AddCircleOutlineRoundedIcon />,
            text: "دسته بندی جدید",
          }}
        />

        <SideBarButton
          buttonProps={{ onClick: onSideBarClick }}
          menuItem={{
            icon: <AccountCircleRoundedIcon />,
            text: "اطلاعات من",
            link: "",
          }}
        />
      </Box>
    </>
  );
}

export default SideBarItems;
