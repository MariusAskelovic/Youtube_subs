import { useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
      handleRegister(formik.values.email, formik.values.password);
    },
  });
  // async function loginEmail() {
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(
  //     auth,
  //     formik.values.email,
  //     formik.values.password
  //   )
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       console.log('user ===', user);
  //       navigate('/', { replace: true });
  //     })
  //     .catch(console.warn);
  // }

  function handleRegister(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.email;
        navigate('/', { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
      });
  }

  return (
    <div className='container py-20'>
      <h3 className='text-black text-xl text-center mb-3'>
        Create New Account
      </h3>
      <form className='text-center text-black ' onSubmit={formik.handleSubmit}>
        <div className='flex flex-col justify-center md:w-96 items-center ml-auto mr-auto'>
          <input
            className='w-full py-1 px-2 mb-3'
            type='email'
            placeholder='email'
            id='email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <input
            className='w-full py-1 px-2 mb-3'
            type='password'
            placeholder='password'
            id='password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <button
          type='submit'
          className='border border-white px-3 py-[1px] rounded-sm text-black bg-white'
        >
          Register
        </button>
      </form>
    </div>
  );
}
