import { Box, Menu, TextField, TextFieldProps, useTheme } from "@mui/material";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ReactElement, useState } from "react";
import DateObject, { DateType } from "react-date-object";

interface myProps {
  onChange?: ({ date }: { date: Date }) => any;
  defaultValue?: Date;
  placeholder?: string;
  inputProps?: TextFieldProps;
}
const DateField = ({
  onChange = () => {},
  placeholder = "",
  inputProps,
}: myProps) => {
  const _Date = new Date();
  const now = _Date.toLocaleDateString("fa-IR");
  // * Main Date value ========================== >
  const [date, setDate] = useState<DateType | undefined>(_Date);

  // * Undestandable Date format ================== >
  const [faDate, setFaDate] = useState<`${string} ${string} ${string}`>(
    `${placeholder} ${now} `
  );

  // * Drop down state ======================== >
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  // * Instance of Dropdown menu ================ >
  const [menuInstance, setMenuInstance] = useState<null | Element>(null);

  // * Drop down Event ======================== >
  const closeMenu = () => {
    setIsOpenMenu(false);
    setMenuInstance(null);
  };
  const openeMenu = (e: React.MouseEvent) => {
    setIsOpenMenu(true);
    setMenuInstance(e.currentTarget);
  };
  // * Data Picker event =================== >
  const changeHandler = (date: DateObject | null) => {
    const main_date = date?.toDate() as Date;
    // * set Date ===================== >
    setDate(main_date);
    // * set Persian Date ===================== >
    const local_date = date?.toDate().toLocaleDateString("fa-IR");
    setFaDate(
      `${placeholder} ${local_date as string} ${
        now == local_date ? "(امروز)" : ""
      }`
    );
    onChange({ date: main_date });
  };

  return (
    <>
      <TextField
        value={faDate}
        onClick={openeMenu}
        sx={{ width: "100%" }}
        {...inputProps}
      />
      <Menu anchorEl={menuInstance} open={isOpenMenu} onClose={closeMenu}>
        <Calendar
          // * Value Handling ================= >
          value={date}
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

//   const button_sx: SxProps = {
//     ...theme.custom.resetButton,
//     width: "100%",
//     padding: "5px",
//     borderRadius: "0px",
//   };
