import { SvgEmail } from '@assets/svg/@'
import { SvgPass } from '@assets/svg/Pass'
import { SvgLoading } from '@assets/svg/index'
import { SvgOffView } from '@assets/svg/offView'
import { SvgUser } from '@assets/svg/user'
import { SvgView } from '@assets/svg/view'
import Loading from '@components/utils/loading'
import { useAuthorization, useForm } from '@hooks/index'
import css from '@styles/signIn_signUp/form.module.css'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

export const Register = () => {
  const [viewPass, setViewPass] = useState<boolean>(false)

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
                value={values?.username || ''}
                onChange={handleChange}
                placeholder='Username'
              />
              <em className={`${css.name}`}>Username</em>
              <i aria-checked={true}>
                <SvgUser />
              </i>
            </label>
            {/* ============================================================= */}

            <label className={`${css.label_email}`}>
              <input
                type='email'
                name='email'
                value={values?.email || ''}
                onChange={handleChange}
                placeholder='Email'
              />
              <em className={`${css.name}`}>Email</em>
              <i aria-checked={true}>
                <SvgEmail />
              </i>
            </label>
            {/* ============================================================= */}

            <label className={`${css.label_password}`}>
              <input
                type={viewPass ? 'text' : 'password'}
                name='password'
                onChange={handleChange}
                placeholder='Password'
              />
              <em className={`${css.name}`}>Password</em>
              <i aria-checked={true}>
                <SvgPass />
              </i>
              <span aria-checked={true} onClick={() => setViewPass((p) => !p)}>
                {viewPass ? <SvgOffView /> : <SvgView />}
              </span>
            </label>
            {/* ============================================================= */}

            <label className={`${css.label_confirmPassword}`}>
              <input
                type={viewPass ? 'text' : 'password'}
                name='confirmPassword'
                onChange={handleChange}
                placeholder='Confirm password'
              />
              <em className={`${css.name}`}>Confirm password</em>
              <i aria-checked={true}>
                <SvgPass />
              </i>
              <span onClick={() => setViewPass((p) => !p)}>
                {viewPass ? <SvgOffView /> : <SvgView />}
              </span>
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
            <em>ya estas registrado?</em>
            <Link to={'/login'}>SignIn</Link>
          </span>
        </section>
      )}
    </div>
  )
}
