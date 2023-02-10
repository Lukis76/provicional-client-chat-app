import { useAuthorization, useForm } from '@hooks/index'
import { SvgLoading } from '@assets/svg/index'
import { Link, Navigate } from 'react-router-dom'
import css from '@styles/signIn_signUp/form.module.css'
import Loading from '@components/utils/loading'

export const Login = () => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    errorValues,
    loading,
  } = useForm('LOGIN', {
    email: null,
    password: null,
  })
  const { check } = useAuthorization()

  return (
    <div className={`container ${css.container}`}>
      {check === true ? (
        <Navigate to={'/chat'} />
      ) : check === undefined || loading ? (
        <Loading />
      ) : (
        <section className={`${css.form_container}`}>
          <h3>Login</h3>
          <form className={`${css.form}`} onSubmit={handleSubmit}>
            <label className={`${css.label_email}`}>
              <input name='email' onChange={handleChange} placeholder='Email' />
              <em className={`${css.name}`}>Email</em>
            </label>
            <label className={`${css.label_password}`}>
              <input
                name='password'
                onChange={handleChange}
                placeholder='Password'
              />
              <em className={`${css.name}`}>Password</em>
            </label>
            <button
              type='submit'
              className='text-center py-1 px-6 rounded-lg bg-blue-500 hover:opacity-30'
              disabled={
                (errorValues.email && errorValues.password) !== 'success'
              }
            >
              SignIn
            </button>
            {errors.map((err, index) => {
              return <span key={index + 1}>{err.message}</span>
            })}
          </form>
          <span>
            todavia no estas registrado - <Link to={'/register'}>SignUp</Link>
          </span>
        </section>
      )}
    </div>
  )
}
