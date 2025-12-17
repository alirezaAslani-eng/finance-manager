import setUserInfoQrDefault from "./setUserInfoQrDefault";
import setAllTransactionsQrDefault from "./setAllTransactionsQrDefault";
const setAllDefaults = (): void => {
  setUserInfoQrDefault();
  setAllTransactionsQrDefault();
};
export default setAllDefaults;
