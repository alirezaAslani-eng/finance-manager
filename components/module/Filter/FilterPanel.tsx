import {
  Divider,
  Stack,
  ToggleButton,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import { MultiSelectModal, MuiButton, MuiToggleButton } from "@/components/ui";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Datefilter from "../Input/Datefilter";
import PriceFilter from "../Input/PriceFilter";
import { useFilterTrsState } from "@/context/transactions";
import { useContext, useMemo } from "react";
import { AuthContex } from "@/context";
import { muiTheme } from "@/utils";

interface Myprops {
  onClose?: () => any;
}
const FilterPanel = ({ onClose }: Myprops) => {
  // * Filter's parameters and dispatchers ======================= >
  const {
    filterState: {
      old,
      type,
      categories: selectedCategories,
      accounts: selectedAccounts,
      fromDate,
      toDate,
      minAmount,
      maxAmount,
    },
    toggleSort,
    setType,
    setCategory,
    cancelCategory,
    cancelAccount,
    setAccount,
    resetFilter,
    setToDate,
    setFromDate,
    cancelFromDate,
    cancelToDate,
    setMaxAmount,
    setMinAmount,
    apply,
  } = useFilterTrsState();

  // * Auth Context to access user's accounts and categories ======= >
  const {
    userInfo: { categories, accounts },
  } = useContext(AuthContex)!;

  // * User's categories for Checkboxes ===== >
  const categoriesCheckBoxs = useMemo(() => {
    return categories.map((item) => {
      return { text: item.name, value: item._id };
    });
  }, [categories]);

  // * User's accounts for Checkboxes ===== >
  const accountsCheckBoxs = useMemo(() => {
    return accounts.map((item) => {
      return { text: item.accountName, value: item._id };
    });
  }, [accounts]);

  // * Apply Filter ===== >
  const applyFilters = () => {
    apply();
    onClose && onClose();
  };

  const {
    palette: { mode, grey },
  } = useTheme();

  return (
    <Box>
      {/* // * Heading-> Close Button And Reset Filter Button */}
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {/* // * Close Icon =============== > */}
        <CloseRoundedIcon
          onClick={onClose}
          sx={{
            cursor: "pointer",
            color: muiTheme(mode, {
              dark: grey[100],
              light: grey[700],
            }),
          }}
        />

        {/* // * Title ============== > */}
        <Typography>{"فیلتر ها"}</Typography>

        {/* // * Reset Filter Button ============ > */}
        <MuiButton
          reset
          buttonProps={{
            variant: "text",
            onClick: resetFilter,
            sx: {
              p: "5px",
              ":hover": {
                backgroundColor: "transparent",
              },
              color: muiTheme(mode, {
                dark: grey[100],
                light: grey[700],
              }),
            },
          }}
        >
          {"حذف فیلتر ها"}
        </MuiButton>
      </Stack>
      <Divider sx={{ m: "10px 0px 20px 0px" }} />
      {/* // * ------------------------------ Filter Elements -------------------------------- >*/}
      <Stack gap={"20px"}>
        {/* // * Sort Button =========================== > */}
        <MuiToggleButton
          inputProps={{
            fullWidth: true,
            value: old ? "oldest" : "latest",
          }}
          onChange={toggleSort}
        >
          <ToggleButton color="warning" value={"oldest"}>
            {"قدیمی ترین ها"}
          </ToggleButton>
          <ToggleButton color="primary" value={"latest"}>
            {"تراکنش های جدید"}
          </ToggleButton>
        </MuiToggleButton>

        {/* // * Transaction Type ========================= > */}
        <MuiToggleButton<"0" | "1" | "all">
          inputProps={{
            fullWidth: true,
            value: type ?? "all",
          }}
          onChange={setType}
        >
          <ToggleButton color="error" value={"0"}>
            {"برداشت از حساب"}
          </ToggleButton>
          <ToggleButton color="success" value={"1"}>
            {"واریزی ها"}
          </ToggleButton>
          <ToggleButton color="primary" value={"all"}>
            {"همه"}
          </ToggleButton>
        </MuiToggleButton>
      </Stack>

      {/* // * Category Filter =============== > */}
      <Divider sx={{ my: "30px" }} />
      <MultiSelectModal
        placeholder="انتخاب دسته بندی"
        onDisable={cancelCategory}
        onEnable={setCategory}
        items={categoriesCheckBoxs}
        activedCheckBoxs={selectedCategories}
      />

      {/* // * Date filter ================== >  */}
      <Divider sx={{ my: "30px" }} />
      <Datefilter
        fromDateVal={fromDate}
        toDateVal={toDate}
        fromOnchange={setFromDate}
        toOnchange={setToDate}
        onCancelFromDate={cancelFromDate}
        onCancelToDate={cancelToDate}
      />

      {/* // * Price Filter ============ >  */}
      <Box mt={"10px"}>
        <PriceFilter
          fromOnChange={setMinAmount}
          toOnChange={setMaxAmount}
          fromValue={minAmount ?? undefined}
          toValue={maxAmount ?? undefined}
        />
      </Box>

      {/* // * Account Filter ==================== > */}
      <Divider sx={{ my: "30px" }} />
      <MultiSelectModal
        placeholder="انتخاب کارت بانکی"
        onDisable={cancelAccount}
        onEnable={setAccount}
        items={accountsCheckBoxs}
        activedCheckBoxs={selectedAccounts}
      />

      {/* // * Apply Button ============================== > */}
      <Divider sx={{ my: "30px" }} />
      <MuiButton
        buttonProps={{
          onClick: applyFilters,
          sx: {
            width: {
              xs: "100%",
              sm: "fit-content",
            },
          },
        }}
      >
        {"اعمال فیلتر"}
      </MuiButton>
    </Box>
  );
};

export default FilterPanel;
