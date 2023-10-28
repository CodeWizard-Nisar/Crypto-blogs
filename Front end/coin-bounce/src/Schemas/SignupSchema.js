import * as yup from "yup";

const passwordPattern =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,16}$/;

const errorMessage =
  "Password must have atleast one upper case, lowercase, digits, and special character";

const signupSchema = yup.object().shape({
  name: yup.string().max(30).required(),
  username: yup.string().min(5).max(30).required("username is required"),
  email: yup
    .string()
    .email("enter a valid email")
    .required("email is required"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "password and confirm password must be same")
    .required("password is required"),
});

export default signupSchema;
