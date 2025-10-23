import { SideBarButton } from "@/components/ui";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AddchartRoundedIcon from '@mui/icons-material/AddchartRounded';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Box } from "@mui/material";
import React from "react";

interface MyProp {
  onSideBarClick?: () => void;
}
function SideBarItems({ onSideBarClick = () => {} }: MyProp) {
  return (
    <>
      <Box onClick={onSideBarClick}>
        <SideBarButton
          menuItem={{
            id: crypto.randomUUID(),
            icon: <HomeRoundedIcon />,
            text: "داشبورد",
            link: "/my-panel",
          }}
        />

        <SideBarButton
          menuItem={{
            id: crypto.randomUUID(),
            icon: <ReceiptLongRoundedIcon />,
            text: "تراکنش ها",
            link: "/my-panel/transactions",
          }}
        />

        <SideBarButton
          menuItem={{
            id: crypto.randomUUID(),
            icon: <AddchartRoundedIcon />,
            text: "تراکنش جدید",
            link: "/my-panel/transactions/add",
          }}
        />

        <SideBarButton
          menuItem={{
            id: crypto.randomUUID(),
            icon: <AddCardRoundedIcon />,
            text: "حساب جدید",
            link: "/my-panel/account/add",
          }}
        />

        <SideBarButton
          menuItem={{
            id: crypto.randomUUID(),
            icon: <AddCircleOutlineRoundedIcon />,
            text: "دسته بندی جدید",
            link: "",
          }}
        />

        <SideBarButton
          menuItem={{
            id: crypto.randomUUID(),
            icon: <AccountCircleRoundedIcon />,
            text: "اطلاعات من",
            link: "/my-panel/me",
          }}
        />
      </Box>                                                                                                                                                                                                                                                                                                                        
    </>
  );
}

export default SideBarItems;

