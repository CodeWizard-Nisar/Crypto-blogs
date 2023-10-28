import { useState } from "react";
import styles from "./signup.module.css";
import TextInput from "../../Components/TextInput/TextInput";
import { useFormik } from "formik";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import signupSchema from "../../Schemas/SignupSchema";
import { signup } from "../../api/internal";
//sign up
function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleSignup = async () => {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    const response = await signup(data);
    if (response.status === 201) {
      //set user
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };
      dispatch(setUser(user));

      //redirect homepage
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // Display error message
      setError(response.response.data.errormessage);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
  });

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupHeader}>signup</div>
      <TextInput
        type="text"
        value={values.name}
        name="name"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />

      <TextInput
        type="text"
        value={values.username}
        name="username"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="username"
        error={errors.username && touched.username ? 1 : undefined}
        errormessage={errors.username}
      />
      <TextInput
        type="text"
        name="email"
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="email"
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />
      <TextInput
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessag={errors.password}
      />
      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="confirmPassword"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessag={errors.confirmPassword}
      />
      <button className={styles.signupButton} onClick={handleSignup}>
        Sign Up
      </button>
      <span>
        Already have an accout ?{" "}
        <button
          className={styles.login}
          onClick={() => navigate("/login")}
        ></button>
      </span>
      {error != "" ? <p className={styles.errorMessage}>{error}</p> : ""}
    </div>
  );
}
export default Signup;
