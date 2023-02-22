import { FormEvent, useState, useContext } from 'react'
import { GraphQLErrors } from '@apollo/client/errors'
import { authUserContext } from '@context/index'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { operations } from '@GraphQL/index'
import useValidator from './useValidator'
import { toast } from 'react-hot-toast'

type LOGIN = 'LOGIN'
type REGISTER = 'REGISTER'

type initialStateForm = {
  username?: string | undefined
  email: string | undefined
  password: string | undefined
  confirmPassword?: string | undefined
}

export const useForm = (
  typeForm: LOGIN | REGISTER,
  initialState: initialStateForm
) => {
  const navigate = useNavigate()
  // const [errors, setErrors] = useState<GraphQLErrors>([])
  const { login } = useContext(authUserContext)
  //------------------------------------------------------------
  const { handleChange, errorValues, errors, values } =
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
        toast.error(
          'el logeo a fallado porfavor revisa tu conecciona a internet'
        )
      },
      variables: { loginInput: values },
    }
  )
  //////////////>>>>>> REGISTER <<<<<</////////////////
  const [registerUser, { loading: RegisterLoading }] = useMutation(
    operations.user.mutation.REGISTER_USER,
    {
      onError({ graphQLErrors }) {
        toast.error(
          'el registro a fallado porfavor revisa tu conecciona a internet'
        )
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
    // handleBlur,
    errors,
    errorValues,
    handleSubmit,
    values,
    // errors: errorValues,
    loading: select(),
  }
}
