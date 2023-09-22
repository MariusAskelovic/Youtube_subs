import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleAuth() {
  const provider = new GoogleAuthProvider();

  function authGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('user ===', user);
      })
      .catch((error) => {
        console.warn('Login failed: ', error);
      });
  }
  return (
    <button onClick={authGoogle}>
      <FcGoogle size={40} />
    </button>
  );
}
