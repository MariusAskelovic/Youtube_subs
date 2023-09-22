import { Link, NavLink } from 'react-router-dom';
import GoogleAuth from '../auth/GoogleAuth';

export default function Header() {
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
        <GoogleAuth />
      </nav>
    </header>
  );
}
