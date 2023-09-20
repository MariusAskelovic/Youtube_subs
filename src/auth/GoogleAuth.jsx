import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleAuth() {
  const provider = new GoogleAuthProvider();

  function authGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log('Login success');
        console.log('user ===', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.warn('Login FAIL');
      });
  }
  return (
    <button onClick={authGoogle}>
      <FcGoogle size={40} />
    </button>
  );
}
