import {
  AccountCircleRounded,
  AddCardRounded,
  AddchartRounded,
  HomeRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";
import { AppNavigator } from "./types";

const appNavigators: AppNavigator[] = [
  {
    icon: <HomeRounded color="inherit" />,
    text: "داشبورد",
    link: "/my-panel",
  },
  {
    icon: <ReceiptLongRounded color="inherit" />,
    text: "تراکنش ها",
    link: "/my-panel/transactions",
  },
  {
    icon: <AddchartRounded color="inherit" />,
    text: "تراکنش جدید",
    link: "/my-panel/transactions/add",
  },
  {
    icon: <AddCardRounded color="inherit" />,
    text: "حساب جدید",
    link: "/my-panel/account/add",
  },
  {
    icon: <AccountCircleRounded color="inherit" />,
    text: "اطلاعات من",
    link: "/my-panel/me",
  },
];

export default appNavigators;
