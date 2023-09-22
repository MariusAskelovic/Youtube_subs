import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './layout/Header';
// import Youtube from './pages/Youtube';
// import YTChannels from './pages/YTChannels';
import AddYTChannel from './pages/AddYTChannel';
import YoutubePage from './pages/YoutubePage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './store/AuthProvider';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  const ctx = useAuth();
  return (
    <div className='min-h-screen text-white'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/yt' element={<Youtube />} />
        <Route path='/ytchannels' element={<YTChannels />} /> */}
        <Route path='/addchannel' element={<AddYTChannel />} />
        <Route path='/youtube' element={<YoutubePage />} />
        {/* <Route path='/login' element={<LoginPage />} /> */}
        {!ctx.loginStatus && <Route path='/login' element={<LoginPage />} />}
        {!ctx.loginStatus && (
          <Route path='/register' element={<RegisterPage />} />
        )}
      </Routes>
    </div>
  );
}
