import type { MenuList } from "./types/menuList.types";
// * icons >>
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AddchartRoundedIcon from '@mui/icons-material/AddchartRounded';
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
const menuList: MenuList = [
  { id: crypto.randomUUID(), icon: <HomeRoundedIcon/> , text: "داشبورد", link: "" },
  { id: crypto.randomUUID(), icon: <ReceiptLongRoundedIcon/> , text: "تراکنش ها", link: "" },
  { id: crypto.randomUUID(), icon: <AddchartRoundedIcon/> , text: "تراکنش جدید", link: "" },
  { id: crypto.randomUUID(), icon: <AddCardRoundedIcon/> , text: "حساب جدید", link: "" },
  { id: crypto.randomUUID(), icon: <AccountCircleRoundedIcon/> , text: "اطلاعات من", link: "" },
];
export default menuList;
