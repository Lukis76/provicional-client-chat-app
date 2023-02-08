import { useForm } from '@hooks'

enum FORM {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export const Login = () => {
  const { handleChange, handleSubmit, values, errors, loading } = useForm(
    FORM.LOGIN,
    {
      email: '',
      password: '',
    }
  )

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token')) {
    }
  }

  return (
    <div className='bg-zinc-800 flex flex-col justify-center items-center min-h-screen w-full gap-4'>
      <h3>Login</h3>
      <form
        className='flex flex-col gap-6 border-white border-2 p-8 rounded-2xl'
        onSubmit={handleSubmit}
      >
        <input name='email' onChange={handleChange} />
        <input name='password' onChange={handleChange} />
        <button
          type='submit'
          className='text-center py-1 px-6 rounded-lg bg-blue-500 hover:opacity-30'
        >
          Login
        </button>
        {errors.map((err, index) => {
          return <span key={index + 1}>{err.message}</span>
        })}
      </form>
    </div>
  )
}
