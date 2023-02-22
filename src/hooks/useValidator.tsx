import React, { ChangeEvent, FocusEvent, useState } from 'react'

type initialStateForm = {
  username?: string | undefined
  email: string | undefined
  password: string | undefined
  confirmPassword?: string | undefined
}

interface initialStateError {
  username?: boolean | undefined
  email: boolean | undefined
  password: boolean | undefined
  confirmPassword?: boolean | undefined
}

export const useValidator = (initialState: initialStateForm) => {
  //-----------------------------------------------------------
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState<initialStateError>({
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  })
  const [errorValues, setErrorValues] = useState(initialState)

  //-----------------------------------------------------------
  const err = (name: string, errv: string, err: boolean | undefined) => {
    setErrorValues((prev) => ({
      ...prev,
      [name]: errv,
    }))

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
        err(targetName, 'el campo username no puede estar vacio', false)
      } else if (targetValue.length < 6) {
        err(
          targetName,
          'el campo username de tener mas de 5 caracteres de longitud',
          false
        )
      } else if (targetValue.length >= 20) {
        err(
          targetName,
          'el campo username no puede tener 20 caracteres o mas de longitud',
          false
        )
      } else {
        err(targetName, 'success', true)
      }
    }
    //===========================================================================
    else if (targetName === 'email') {
      if (targetValue === '') {
        err(targetName, 'el campo email no puede estar vacio', false)
      } else if (
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(targetValue)
      ) {
        err(targetName, 'success', true)
      } else {
        err(targetName, 'deve proporcionar un email valido', false)
      }
    }
    //===========================================================================
    else if (targetName === 'password') {
      if (targetValue === '') {
        err(targetName, 'el campo password no puede estar vacio', false)
      } else if (
        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/g.test(targetValue)
      ) {
        err(targetName, 'success', true)
      } else {
        err(
          targetName,
          'deve proporcionar un password valido "[A-z] [0-9] [!@#$%^&*()_+{}:"<>?]"',
          false
        )
      }
    }
    //===========================================================================
    else if (targetName === 'confirmPassword') {
      if (targetValue === '') {
        err(targetName, 'el campo password no puede estar vacio', false)
      }
      if (values.password === targetValue) {
        err(targetName, 'success', true)
      } else {
        err(
          targetName,
          'el campo password y el campo confirm password deven coinsidir',
          false
        )
      }
    }
    //===========================================================================

    setValues({ ...values, [targetName]: targetValue })
  }
  //-----------------------------------------------------------
  // const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
  //   setErrors((prev) => ({
  //     ...prev,
  //     username: null,
  //   }))
  // }
  return { handleChange, errorValues, errors, values }
}

export default useValidator
