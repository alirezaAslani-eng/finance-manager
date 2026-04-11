import { styled, Typography } from "@mui/material";

const BottomNavigationText = styled(Typography)(({ theme }) => {
  return {
    color: "inherit",
    lineHeight: 1,
    fontSize: "12px",
    [theme.breakpoints.up("_360")]: {
      fontSize: "14px",
    },
  };
});

export default BottomNavigationText;
