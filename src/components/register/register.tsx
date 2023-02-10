import { SvgLoading } from '@assets/svg/index'
import Loading from '@components/utils/loading'
import { useAuthorization, useForm } from '@hooks/index'
import css from '@styles/signIn_signUp/form.module.css'
import { Link, Navigate } from 'react-router-dom'

export const Register = () => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    errorValues,
    loading,
  } = useForm('REGISTER', {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
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
          <h3>Register</h3>

          <form className={`${css.form}`} onSubmit={handleSubmit}>
            {/* ============================================================= */}
            <label className={`${css.label_username}`}>
              <input
                name='username'
                onChange={handleChange}
                placeholder='Username'
              />
              <em className={`${css.name}`}>Username</em>
            </label>
            {/* ============================================================= */}

            <label className={`${css.label_email}`}>
              <input name='email' onChange={handleChange} placeholder='Email' />
              <em className={`${css.name}`}>Email</em>
            </label>
            {/* ============================================================= */}

            <label className={`${css.label_password}`}>
              <input
                name='password'
                onChange={handleChange}
                placeholder='Password'
              />
              <em className={`${css.name}`}>Password</em>
            </label>
            {/* ============================================================= */}

            <label className={`${css.label_confirmPassword}`}>
              <input
                name='confirmPassword'
                onChange={handleChange}
                placeholder='Confirm password'
              />
              <em className={`${css.name}`}>Confirm password</em>
            </label>
            {/* ============================================================= */}

            <button
              type='submit'
              className='text-center py-1 px-6 rounded-lg bg-blue-500 hover:opacity-30'
              disabled={
                (errorValues.email && errorValues.password) !== 'success'
              }
            >
              SignUp
            </button>
            {errors.map((err, index) => {
              return <span key={index + 1}>{err.message}</span>
            })}
          </form>
          <span>
            ya estas registrado - <Link to={'/login'}>SignIn</Link>
          </span>
        </section>
      )}
    </div>
  )
}
