/**
 * Copy it 
 * 
    <Form>
        <Form.Title>{"هزینه یار"}</Form.Title>
        <Form.FormBox>
          
          <Form.FormBox.FormTitle>
            {"ورود با شماره موبایل"}
          </Form.FormBox.FormTitle>

         
          <Form.FormBox.SubTitle>
            {"ثبت نام نکردی؟"}
            <Form.FormBox.SubTitle.Link href="">
              {"ثبت نام"}
            </Form.FormBox.SubTitle.Link>
          </Form.FormBox.SubTitle>

         
          <Form.FormBox.Input placeholder="شماره موبایل" />
          <Form.FormBox.InputError>{""}</Form.FormBox.InputError>

          
          <Form.FormBox.SubmitButton>{"ورود"}</Form.FormBox.SubmitButton>
        </Form.FormBox>
        <Form.RuleDescription />
    </Form>
 */
import { muiTheme } from "@/packages/mui";
import {
  Box,
  Button,
  TextField,
  Typography,
  TypographyProps,
} from "@mui/material";
import Link from "next/link";
import React, {
  type PropsWithChildren,
  type ReactNode,
  createContext,
  useContext,
} from "react";
import { FormComponent } from "../types";
import CircleLoader from "../loader/CircleLoader";

interface FormProvidedValue {
  isError: boolean;
  isSubmiting: boolean;
}
const FormContext = createContext({} as FormProvidedValue);
const useFormContext = (): FormProvidedValue => {
  return useContext(FormContext);
};
const Form = function (props) {
  const { isError = false, isSubmiting = false, muiProps, children } = props;
  return (
    <FormContext value={{ isError, isSubmiting }}>
      <Box
        component={"form"}
        width={"min(380px,100%)"}
        textAlign={"center"}
        {...muiProps}
      >
        {children}
      </Box>
    </FormContext>
  );
} as FormComponent;

export default Form;

/**
 * Form > FormBox
 */
//@ts-ignore
Form.FormBox = function (props) {
  return (
    <Box
      mt="20px"
      borderRadius={"18px"}
      p={{xs:"20px 18px",sm:"28px 20px"}}
      bgcolor={"background.paper"}
      sx={(tm) => {
        return {
          boxShadow: `0px 0px 18px 0px ${tm.alpha(tm.palette.black, 0.1)}`,
        };
      }}
      {...props}
    />
  );
};

/**
 * Form > Title
 */
Form.Title = function (props: PropsWithChildren<TypographyProps>): ReactNode {
  const { children = "هزینه یار" } = props;
  return (
    <Typography textAlign={"center"} variant="4xl" color="primary" {...props}>
      {children}
    </Typography>
  );
};

/**
 * Form > RuleDescription
 */
Form.RuleDescription = function (props) {
  return (
    <Typography
      variant="base"
      mt={"20px"}
      textAlign={"center"}
      sx={({ palette }) => {
        return {
          color: muiTheme(palette.mode, {
            dark: palette.grey[500],
            light: palette.grey[700],
          }),
        };
      }}
      {...props}
    >
      {
        "با عضویت در سایت، تمامی قوانین و شرایط استفاده از خدمات سبزلرن را پذیرفته اید. "
      }
    </Typography>
  );
};

/**
 * Form > FormBox > Title
 */
Form.FormBox.FormTitle = function (props): ReactNode {
  return <Typography variant="xl" fontFamily={"var(--dana-md)"} {...props} />;
};

/**
 * Form > FormBox > Subtitle
 */
//@ts-ignore
Form.FormBox.SubTitle = function (props) {
  return (
    <Typography
      variant="sm"
      component={"span"}
      display={"flex"}
      gap={"4px"}
      alignItems={"center"}
      justifyContent={"center"}
      {...props}
    >
      {props.children}
    </Typography>
  );
};

/**
 * Form > FormBox > Subtitle > Link
 */
Form.FormBox.SubTitle.Link = function (props) {
  const { children = "ثبت نام" } = props;
  return (
    <Typography color="primary" fontSize={"inherit"} fontFamily={"inherit"}>
      <Link {...props}>{children}</Link>
    </Typography>
  );
};

/**
 * Form > FormBox > Input
 */
Form.FormBox.Input = function (props) {
  const { placeholder = "شماره تماس", label } = props;
  const { isError, isSubmiting } = useFormContext();
  return (
    <>
      <TextField
        label={label ?? placeholder}
        placeholder={placeholder}
        disabled={isSubmiting}
        error={isError}
        sx={{ mt: { xs: "12px", sm: "24px" } }}
        {...props}
      />
      <Typography color="error" variant="base" mt={"6px"} textAlign={"right"}>
        {props?.children}
      </Typography>
    </>
  );
};
/**
 * Form > FormBox > SubmitButton
 */
Form.FormBox.SubmitButton = function (props) {
  const { children = "ورود" } = props;
  const { isSubmiting } = useFormContext();
  return (
    <Button
      variant="contained"
      size="large"
      type="submit"
      disabled={isSubmiting}
      fullWidth
      sx={{ mt: { xs: "12px", sm: "24px" } }}
      {...props}
    >
      {!isSubmiting ? children : <CircleLoader />}
    </Button>
  );
};
