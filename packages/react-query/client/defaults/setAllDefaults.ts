import {
  setUserInfoQrDefault,
  setAllTransactionsQrDefault,
} from "@/packages/react-query";
const setAllDefaults = (): void => {
  setUserInfoQrDefault();
  setAllTransactionsQrDefault();
};
export default setAllDefaults;
