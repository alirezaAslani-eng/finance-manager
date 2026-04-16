import {
  Divider,
  Stack,
  ToggleButton,
  Box,
  Button,
  ToggleButtonGroup,
  FormLabel,
} from "@mui/material";
import {
  AccountCheckbox,
  InputMultipleSelectCheckBox,
  ModalToolBar,
} from "@/components/ui";
import Datefilter from "../Input/Datefilter";
import PriceFilter from "../Input/PriceFilter";
import { useAuth, useFilterTrsState } from "@/context";
import { FilterCheckBoxsModal } from "./Modal";

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
    setCategories,
    clearCategories,
    resetFilter,
    setToDate,
    setFromDate,
    cancelFromDate,
    cancelToDate,
    setAccounts,
    clearAccounts,
    setMaxAmount,
    setMinAmount,
    apply,
  } = useFilterTrsState();

  // * Auth Context to access user's accounts and categories ======= >
  const {
    userInfo: { categories, accounts },
  } = useAuth();

  // * Apply Filter ===== >
  const applyFilters = () => {
    apply();
    onClose && onClose();
  };

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
      <FilterCheckBoxsModal
        placeholder="انتخاب دسته بندی"
        selectedCheckBoxs={selectedCategories}
        onClear={clearCategories}
      >
        <InputMultipleSelectCheckBox
          onChange={setCategories}
          activeValues={selectedCategories}
        >
          {categories.map(({ _id, name }) => {
            return (
              <Box display={"flex"} alignItems={"center"} gap={"8px"}>
                <InputMultipleSelectCheckBox.CheckBox
                  key={_id}
                  value={_id}
                  id={_id}
                />
                <FormLabel htmlFor={_id}>{name}</FormLabel>
              </Box>
            );
          })}
        </InputMultipleSelectCheckBox>
      </FilterCheckBoxsModal>

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

      <FilterCheckBoxsModal
        placeholder="انتخاب کارت"
        selectedCheckBoxs={selectedAccounts}
        onClear={clearAccounts}
      >
        <InputMultipleSelectCheckBox
          onChange={setAccounts}
          activeValues={selectedAccounts}
        >
          {accounts.map((account) => {
            return (
              <AccountCheckbox mb={"12px"}>
                <InputMultipleSelectCheckBox.CheckBox
                  value={account._id}
                  id={account._id}
                />
                <FormLabel htmlFor={account._id}>
                  <AccountCheckbox.InfoSection
                    accountName={account.accountName}
                    bankIcon={account.bankIcon}
                    bankName={account.bankName}
                    cardNumber={account.cardNumber}
                  />
                </FormLabel>
              </AccountCheckbox>
            );
          })}
        </InputMultipleSelectCheckBox>
      </FilterCheckBoxsModal>

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
