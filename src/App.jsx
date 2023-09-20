import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './layout/Header';
import Youtube from './pages/Youtube';
import YTChannels from './pages/YTChannels';
import AddYTChannel from './pages/AddYTChannel';

export default function App() {
  return (
    <div className='min-h-screen text-white'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/yt' element={<Youtube />} />
        <Route path='/ytchannels' element={<YTChannels />} />
        <Route path='/addchannel' element={<AddYTChannel />} />
      </Routes>
    </div>
  );
}
