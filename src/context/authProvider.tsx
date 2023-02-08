import { FC, useReducer } from 'react'
import {
  authUserContext,
  authReducer,
  AuthUserProviderProps,
  InitialStateProps,
  UserDataTypes,
} from '@context'
import { useNavigate } from 'react-router-dom'
//////////////////////////////////////////////////////////////////////////////////
const storage = () => {
  const user = typeof window !== 'undefined' && localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
/////////////////////////////////////////////////
const initialState: InitialStateProps = {
  user: storage(),
}
///////////////////////////////////////////////////////////////////////////////
export const AuthUserProvider: FC<AuthUserProviderProps> = ({ children }) => {
  //--------------------------------------------------------------------------
  const [state, dispatch] = useReducer(authReducer, initialState)
  //--------------------------------------------------------------
  const login = async (userData: UserDataTypes) => {
    if (typeof window !== 'undefined') {
      console.log(
        '🚀 ~ file: authProvider.tsx:25 ~ login ~ typeof window',
        typeof window
      )
      console.log('🚀 ~ file: authProvider.tsx:24 ~ login ~ userData', userData)

      localStorage.setItem('user', JSON.stringify(userData))
      console.log(
        "🚀 ~ file: authProvider.tsx:30 ~ login ~ localStorage.getItem('user')",
        localStorage.getItem('user')
      )
      localStorage.setItem('token', JSON.stringify(userData.token))
    }

    return dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }
  //---------------------------------
  const logOut = () => {
    // localStorage.removeItem('user')
    // localStorage.removeItem('token')

    return dispatch({
      type: 'LOGOUT',
    })
  }
  //-----------------------------------------------------------------------
  return (
    <authUserContext.Provider value={{ user: state.user, login, logOut }}>
      {children}
    </authUserContext.Provider>
  )
  //-----------------------------------------------------------------------
}
