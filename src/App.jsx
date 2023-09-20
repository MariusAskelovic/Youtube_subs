import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './layout/Header';
import Youtube from './pages/Youtube';
import YTChannels from './pages/YTChannels';

export default function App() {
  return (
    <div className='min-h-screen text-white'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/yt' element={<Youtube />} />
        <Route path='/ytchannels' element={<YTChannels />} />
      </Routes>
    </div>
  );
}
