import { SvgLoading } from '@svgs'
import { useForm } from '@hooks'

enum FORM {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
}

export const Register = () => {
  const { handleChange, handleSubmit, values, errors, loading } = useForm(
    FORM.REGISTER,
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  )


  if (loading) {
    return (
      <div className="bg-zinc-800 flex flex-col justify-center items-center min-h-screen w-full">
        <SvgLoading size={28} className="text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" />
      </div>
    );
  }

  return (
    <div className='bg-zinc-800 flex flex-col justify-center items-center min-h-screen w-full gap-4'>
      <h3>Register</h3>
      <form
        className='flex flex-col gap-6 border-white border-2 p-8 rounded-2xl'
        onSubmit={handleSubmit}
      >
        <input name='username' onChange={handleChange} />
        <input name='email' onChange={handleChange} />
        <input name='password' onChange={handleChange} />
        <input name='confirmPassword' onChange={handleChange} />
        <button
          type='submit'
          className='text-center py-1 px-6 rounded-lg bg-blue-500 hover:opacity-30'
        >
          Registrarse
        </button>
        {errors.map((err, index) => {
          return <span key={index}>{err.message}</span>
        })}
      </form>
    </div>
  )
}
