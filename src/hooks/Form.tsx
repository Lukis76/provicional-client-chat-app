import { ChangeEvent, FormEvent, useState, useContext } from 'react'
import { GraphQLErrors } from '@apollo/client/errors'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { authUserContext } from '@context/index'
import { operations } from '@GraphQL/index'
import useValidator from './useValidator'

type LOGIN = 'LOGIN'
type REGISTER = 'REGISTER'

type initialStateForm = {
  username?: string | null
  email: string | null
  password: string | null
  confirmPassword?: string | null
}

export const useForm = (
  typeForm: LOGIN | REGISTER,
  initialState: initialStateForm
) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<GraphQLErrors>([])
  const { login } = useContext(authUserContext)
  //------------------------------------------------------------
  const { handleChange, handleBlur, errorValues, values } =
    useValidator(initialState)
  //------------------------------------------------------------

  //////////////>>>>>> LOGIN <<<<<</////////////////
  const [loginUser, { loading: LoginLoading }] = useMutation(
    operations.user.mutation.LOGIN_USER,
    {
      async update(_, { data: { loginUser: userData } }) {
        login(userData)
      },
      onError({ graphQLErrors }) {
        setErrors(graphQLErrors)
      },
      variables: { loginInput: values },
    }
  )
  //////////////>>>>>> REGISTER <<<<<</////////////////
  const [registerUser, { loading: RegisterLoading }] = useMutation(
    operations.user.mutation.REGISTER_USER,
    {
      onError({ graphQLErrors }) {
        setErrors(graphQLErrors)
      },
      onCompleted() {
        navigate('/login')
      },
      variables: { registerInput: values },
    }
  )

  ///////////////////////////////////////////////////////

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    if (typeForm === 'LOGIN') {
      console.log('🚀 ~ file: useForm.tsx:60 ~ handleChange ~ values', values)

      await loginUser()
      navigate('/chat')
    }
    if (typeForm === 'REGISTER') {
      await registerUser()
    }
  }

  const select = () => {
    if (typeForm === 'LOGIN') {
      return LoginLoading
    }
    if (typeForm === 'REGISTER') {
      return RegisterLoading
    }
  }

  return {
    handleChange,
    handleBlur,
    errorValues,
    handleSubmit,
    values,
    errors,
    loading: select(),
  }
}
