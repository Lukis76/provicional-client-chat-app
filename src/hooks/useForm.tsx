import { ChangeEvent, FormEvent, useState, useContext } from 'react'
import { GraphQLErrors } from '@apollo/client/errors'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { authUserContext } from '@context'
import { operations } from '@GraphQL'

enum FORM {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

type initialSatteForm = {
  username?: string
  email: string
  password: string
  confirmPassword?: string
}

export const useForm = (typeForm: string, initialState: initialSatteForm) => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState<GraphQLErrors>([])
  const { login } = useContext(authUserContext)

  //////////////>>>>>> LOGIN <<<<<</////////////////
  const [loginUser, { loading: LoginLoading }] = useMutation(
    operations.user.mutation.LOGIN_USER,
    {
      async update(_, { data: { loginUser: userData } }) {
        console.log("🚀 ~ file: useForm.tsx:31 ~ update ~ userData", userData)
        
        login(userData)
      },
      onCompleted() {
        console.log('on compplete >>>>>>>>', localStorage.getItem('user'))
        navigate('/')
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name !== 'confirmPassword') {
      setValues({ ...values, [e.target.name]: e.target.value })
    }
  }
  
  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    if (typeForm === FORM.LOGIN) {
      console.log("🚀 ~ file: useForm.tsx:60 ~ handleChange ~ values", values)
      
      await loginUser()
      navigate('/login')
    }
    if (typeForm === FORM.REGISTER) {
      await registerUser()
    }
  }

  const select = () => {
    if (typeForm === FORM.LOGIN) {
      return LoginLoading
    }
    if (typeForm === FORM.REGISTER) {
      return RegisterLoading
    }
  }

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    loading: select(),
  }
}
