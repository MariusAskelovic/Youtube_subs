import { Link, NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../store/AuthProvider';

export default function Header() {
  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('logged out');
      })
      .catch(() => {
        console.log('logout error');
      });
  }
  const ctx = useAuth();
  return (
    <header className='container flex justify-between items-center mx-auto p-2'>
      <Link to={'/'}>Logo</Link>
      <nav className='flex gap-2'>
        <NavLink className='border-2 border-white p-2' to={'/'}>
          Home
        </NavLink>
        {/* <NavLink to={'/yt'}>Youtube</NavLink>
        <NavLink to={'/ytchannels'}>YT Channels</NavLink> */}
        <NavLink className='border-2 border-white p-2' to={'/addchannel'}>
          Add new channel
        </NavLink>
        <NavLink className='border-2 border-white p-2' to={'/youtube'}>
          Youtube
        </NavLink>
        {!ctx.loginStatus && (
          <NavLink className='border-2 border-white p-2' to={'/login'}>
            Login
          </NavLink>
        )}
        {!ctx.loginStatus && (
          <NavLink className='border-2 border-white p-2' to={'/register'}>
            Register
          </NavLink>
        )}
        {ctx.loginStatus && (
          <Link className='border-2 border-white p-2' to={'/'} onClick={logout}>
            Logout
          </Link>
        )}
      </nav>
    </header>
  );
}
