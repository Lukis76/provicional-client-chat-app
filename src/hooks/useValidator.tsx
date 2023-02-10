import React, { ChangeEvent, FocusEvent, useState } from 'react'

type initialStateForm = {
  username?: string | null
  email: string | null
  password: string | null
  confirmPassword?: string | null
}

export const useValidator = (initialState: initialStateForm) => {
  //-----------------------------------------------------------
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState(initialState)
  //-----------------------------------------------------------
  const err = (name: string, err: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: err,
    }))
  }
  //-----------------------------------------------------------
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.name
    const targetValue = e.target.value
    //=========================================================================
    if (targetName === 'username') {
      if (targetValue === '') {
        err(targetName, 'el campo username no puede estar vacio')
      } else if (targetValue.length < 6) {
        err(
          targetName,
          'el campo username de tener mas de 5 caracteres de longitud'
        )
      } else if (targetValue.length <= 20) {
        err(
          targetName,
          'el campo username no puede tener 20 caracteres o mas de longitud'
        )
      } else {
        err(targetName, 'success')
      }
    }
    //===========================================================================
    else if (targetName === 'email') {
      if (targetValue === '') {
        err(targetName, 'el campo email no puede estar vacio')
      } else if (
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(targetValue)
      ) {
        err(targetName, 'success')
      } else {
        err(targetName, 'deve proporcionar un email valido')
      }
    }
    //===========================================================================
    else if (targetName === 'password') {
      if (targetValue === '') {
        err(targetName, 'el campo password no puede estar vacio')
      } else if (
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(targetValue)
      ) {
        err(targetName, 'success')
      } else {
        err(
          targetName,
          'deve proporcionar un password valido "[A-z] [0-9] [!@#$%^&*()_+{}:"<>?]"'
        )
      }
    }
    //===========================================================================
    else if (targetName === 'confirmPassword') {
      if (targetValue === '') {
      }
      if (values.password === targetValue) {
        err(targetName, 'success')
      } else {
        err(
          targetName,
          'el campo password y el campo confirm password deven considir'
        )
      }
    }
    //===========================================================================

    setValues({ ...values, [targetName]: targetValue })
  }
  //-----------------------------------------------------------
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setErrors((prev) => ({
      ...prev,
      username: null,
    }))
  }
  return { handleChange, handleBlur, errorValues: errors, values }
}

export default useValidator
