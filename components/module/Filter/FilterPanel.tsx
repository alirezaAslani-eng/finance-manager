import {
  Divider,
  Stack,
  ToggleButton,
  Typography,
  useTheme,
  Box,
  Button,
  ToggleButtonGroup,
} from "@mui/material";
import {
  ModalToolBar,
} from "@/components/ui";
import Datefilter from "../Input/Datefilter";
import PriceFilter from "../Input/PriceFilter";
import { useAuth, useFilterTrsState } from "@/context";
import { useMemo } from "react";
import { muiTheme } from "@/packages/mui";

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
  } = useAuth();

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
      <ModalToolBar>
        <ModalToolBar.CloseButton
          onClick={onClose}
          sx={(tm) => tm.custom!.circleButton as object}
        />
        <ModalToolBar.Title>{"فیلتر ها"}</ModalToolBar.Title>
        <ModalToolBar.Button onClick={resetFilter}>
          {"حذف فیلتر ها"}
        </ModalToolBar.Button>
      </ModalToolBar>
      <Divider sx={{ m: "10px 0px 20px 0px" }} />
      {/* // * ------------------------------ Filter Elements -------------------------------- >*/}
      <Stack gap={"20px"}>
        {/* // * Sort Button =========================== > */}
        <ToggleButtonGroup
          fullWidth
          value={old ? "oldest" : "latest"}
          onChange={toggleSort}
        >
          <ToggleButton color="warning" value={"oldest"}>
            {"قدیم"}
          </ToggleButton>
          <ToggleButton color="primary" value={"latest"}>
            {"جدید"}
          </ToggleButton>
        </ToggleButtonGroup>

        {/* // * Transaction Type ========================= > */}
        <ToggleButtonGroup
          fullWidth
          value={type ?? "all"}
          onChange={(e, v) => {
            setType(v);
          }}
        >
          <ToggleButton color="error" value={"0"}>
            {"برداشت"}
          </ToggleButton>
          <ToggleButton color="success" value={"1"}>
            {"واریزی"}
          </ToggleButton>
          <ToggleButton color="primary" value={"all"}>
            {"همه"}
          </ToggleButton>
        </ToggleButtonGroup>
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
      <Button
        onClick={applyFilters}
        size="large"
        variant="contained"
        sx={{
          width: {
            xs: "100%",
            sm: "fit-content",
          },
        }}
      >
        {"اعمال فیلتر"}
      </Button>
    </Box>
  );
};

export default FilterPanel;
