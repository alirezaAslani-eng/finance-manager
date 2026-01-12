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
          fontSize: typography?.["xl"]?.fontSize,
          [theme.breakpoints.up("sm")]: {
            fontSize: typography?.["2xl"]?.fontSize,
          },
          [theme.breakpoints.up("md")]: {
            fontSize: typography?.["3xl"]?.fontSize,
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
          fontSize: typography?.["2xl"]?.fontSize,
          [theme.breakpoints.up("sm")]: {
            fontSize: typography?.["3xl"]?.fontSize,
          },
          [theme.breakpoints.up("md")]: {
            fontSize: typography?.["4xl"]?.fontSize,
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
          fontSize: typography?.base?.fontSize,
          [theme.breakpoints.up("xs")]: {
            fontSize: typography?.lg?.fontSize,
          },
          [theme.breakpoints.up("md")]: {
            fontSize: typography?.xl?.fontSize,
          },
        };
      },
    },
  ],
} satisfies Components<Theme>["MuiTypography"];

export default typography;
