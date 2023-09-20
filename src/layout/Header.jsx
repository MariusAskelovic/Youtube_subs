import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='container flex justify-between items-center mx-auto p-2'>
      <Link to={'/'}>Logo</Link>
      <nav className='flex gap-2'>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/yt'}>Youtube</NavLink>
        <NavLink to={'/ytchannels'}>YT Channels</NavLink>
      </nav>
    </header>
  );
}
