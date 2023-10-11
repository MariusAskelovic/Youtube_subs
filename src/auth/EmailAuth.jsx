import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function EmailAuth() {
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      emailLogin(formik.values.email, formik.values.password);
    },
  });
  function emailLogin(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.warn('Login error: ', error);
      });
  }
  return (
    <form className='text-center md:w-96' onSubmit={formik.handleSubmit}>
      <div>
        <div className='mb-3'>
          <input
            className='w-full py-1 px-2 text-black'
            type='string'
            placeholder='email'
            id='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className='text-amber-400'>{formik.errors.email}</p>
          )}
          <p className='text-xs text-left text-emerald-500'>james@bond.com</p>
        </div>
        <div className='mb-3'>
          <input
            className='w-full py-1 px-2  text-black'
            type='password'
            placeholder='password'
            id='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className='text-amber-400'>{formik.errors.password}</p>
          )}
          <p className='text-xs text-left text-emerald-500'>123456</p>
        </div>
      </div>
      <button
        type='submit'
        className='border border-white px-3 py-[1px] rounded-sm text-black bg-white'
      >
        Login
      </button>
    </form>
  );
}
