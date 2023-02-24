import { ChangeEvent, useState } from "react";
//-----------------------------------------------------------
type initialStateForm = {
  username?: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmPassword?: string | undefined;
};
//-----------------------------------------------------------
interface initialStateError {
  username?: boolean | undefined;
  email: boolean | undefined;
  password: boolean | undefined;
  confirmPassword?: boolean | undefined;
}
//-----------------------------------------------------------
const initialStateErr = {
  username: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
};
//-----------------------------------------------------------
export const useValidator = (initialState: initialStateForm) => {
  //-----------------------------------------------------------
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<initialStateError>(initialStateErr);
  const [errorValues, setErrorValues] = useState(initialState);
  //-----------------------------------------------------------
  const err = (name: string, errv: string, err: boolean | undefined) => {
    setErrorValues((prev) => ({
      ...prev,
      [name]: errv,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: err,
    }));
  };
  //===========================================================================
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    //------------------------------------------
    usernameValidator(targetName, targetValue);
    emailValidator(targetName, targetValue);
    passwordValidator(targetName, targetValue);
    confirmPasswordValidator(targetName, targetValue);
    //-------------------------------------------------
    setValues({ ...values, [targetName]: targetValue });
  };

  //===========================================================================
  const usernameValidator = (targetName: string, targetValue: string | undefined) => {
    if (targetName === "username" && targetValue !== undefined) {
      if (targetValue === "") {
        err(targetName, "el campo username no puede estar vacio", false);
      } else if (targetValue?.length < 6) {
        err(targetName, "el campo username de tener mas de 5 caracteres de longitud", false);
      } else if (targetValue?.length >= 20) {
        err(targetName, "el campo username no puede tener 20 caracteres o mas de longitud", false);
      } else {
        err(targetName, "success", true);
      }
    }
  };
  //===========================================================================
  const emailValidator = (targetName: string, targetValue: string | undefined) => {
    if (targetName === "email" && targetValue !== undefined) {
      if (targetValue === "") {
        err(targetName, "el campo email no puede estar vacio", false);
      } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(targetValue)) {
        err(targetName, "success", true);
      } else {
        err(targetName, "deve proporcionar un email valido", false);
      }
    }
  };
  //===========================================================================
  const passwordValidator = (targetName: string, targetValue: string | undefined) => {
    if (targetName === "password" && targetValue !== undefined) {
      if (targetValue === "") {
        err(targetName, "el campo password no puede estar vacio", false);
      } else if (/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(targetValue)) {
        err(targetName, "success", true);
      } else {
        err(
          targetName,
          'deve proporcionar un password valido "[A-z] [0-9] [!@#$%^&*()_+{}:"<>?]"',
          false
        );
      }
    }
  };
  //===========================================================================
  const confirmPasswordValidator = (targetName: string, targetValue: string | undefined) => {
    if (targetName === "confirmPassword") {
      if (targetValue === "") {
        err(targetName, "el campo password no puede estar vacio", false);
      }
      if (values.password === targetValue) {
        err(targetName, "success", true);
      } else {
        err(targetName, "el campo password y el campo confirm password deven coinsidir", false);
      }
    }
  };
  //===========================================================================
  return { handleChange, errorValues, errors, values };
};
