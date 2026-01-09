import { Components, Theme } from "@mui/material/styles";

const typography = {
  defaultProps: {
    fontWeight: "normal",
    component: "p",
  },
  variants: [
    {
      props: { variant: "xl-title" },
      style: ({ theme }) => {
        const { typography } = theme;
        return {
          fontFamily: "var(--peyda-md)",
          fontSize: typography?.fontSizes?.["xl"],
          [theme.breakpoints.up("sm")]: {
            fontSize: typography?.fontSizes?.["2xl"],
          },
          [theme.breakpoints.up("md")]: {
            fontSize: typography?.fontSizes?.["3xl"],
          },
        };
      },
    },
    {
      props: { variant: "2xl-title" },
      style: ({ theme }) => {
        const { typography } = theme;
        return {
          fontFamily: "var(--peyda-md)",
          fontSize: typography?.fontSizes?.["2xl"],
          [theme.breakpoints.up("sm")]: {
            fontSize: typography?.fontSizes?.["3xl"],
          },
          [theme.breakpoints.up("md")]: {
            fontSize: typography?.fontSizes?.["4xl"],
          },
        };
      },
    },
    {
      props: { variant: "md-paragraph" },
      style: ({ theme }) => {
        const { typography } = theme;
        return {
          fontFamily: "var(--dana-md)",
          fontSize: typography?.fontSizes?.base,
          [theme.breakpoints.up("xs")]: {
            fontSize: typography?.fontSizes?.lg,
          },
          [theme.breakpoints.up("md")]: {
            fontSize: typography?.fontSizes?.xl,
          },
        };
      },
    },
  ],
} satisfies Components<Theme>["MuiTypography"];

export default typography;
