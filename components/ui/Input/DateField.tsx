import { Menu, TextField, TextFieldProps } from "@mui/material";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {  useState } from "react";
import DateObject from "react-date-object";
import { useDate } from "@/hooks";

interface myProps {
  onChange?: (date: Date) => any;
  value?: Date;
  placeholder?: string;
  inputProps?: TextFieldProps;
}
const DateField = ({ onChange, placeholder, inputProps, value }: myProps) => {
  // * Drop down state ======================== >
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  // * Instance of Dropdown menu ================ >
  const [textFieldCurrentTarget, setTextFieldCurrentTarget] =
    useState<null | Element>(null);

  // * Data Picker event =================== >
  const changeHandler = (date: DateObject | null) => {
    const main_date = date?.toDate() as Date;
    // * set Date to parent or internal state ===================== >
    onChange && onChange(main_date);
  };

  // * Drop down Event ======================== >
  const closeMenu = () => {
    setIsOpenMenu(false);
    setTextFieldCurrentTarget(null);
  };

  const openeMenu = (e: React.MouseEvent) => {
    setIsOpenMenu(true);
    setTextFieldCurrentTarget(e.currentTarget);
  };

  const { date: fa_date } = useDate(value);
  return (
    <>
      <TextField
        placeholder={value ? `${placeholder}${fa_date}` : "انتخاب تاریخ"}
        inputProps={{ readOnly: true }}
        onClick={openeMenu}
        fullWidth
        sx={{ "& ::placeholder": { opacity: `${value?"1":"0.5"} !important` } }}
        {...inputProps}
      />
      <Menu
        anchorEl={textFieldCurrentTarget}
        open={isOpenMenu}
        onClose={closeMenu}
      >
        <Calendar
          // * Value Handling ================= >
          value={value}
          onChange={changeHandler}
          // * Language ================== >
          calendar={persian}
          locale={persian_fa}
        />
      </Menu>
    </>
  );
};

export default DateField;
