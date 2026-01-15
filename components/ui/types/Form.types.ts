import {
  BoxProps,
  ButtonProps,
  TextFieldProps,
  TypographyProps,
} from "@mui/material";
import { LinkProps } from "next/link";
import { PropsWithChildren, ReactNode } from "react";

interface FormComponent {
  (props: PropsWithChildren<BoxProps>): ReactNode;
  Title: (props: PropsWithChildren<TypographyProps>) => ReactNode;
  RuleDescription: (props: PropsWithChildren<TypographyProps>) => ReactNode;
  FormBox: {
    (props: PropsWithChildren<TypographyProps>): ReactNode;
    FormTitle: (props: PropsWithChildren<TypographyProps>) => ReactNode;
    Input: (props: TextFieldProps) => ReactNode;
    ErrorText: (props: PropsWithChildren<TypographyProps>) => ReactNode;
    SubmitButton: (props: PropsWithChildren<ButtonProps>) => ReactNode;
    SubTitle: {
      (props: PropsWithChildren<TypographyProps>): ReactNode;
      Link: (props: PropsWithChildren<LinkProps>) => ReactNode;
    };
  };
}

export type { FormComponent };
