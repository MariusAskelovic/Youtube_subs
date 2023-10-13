import { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthProvider';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';

export default function YoutubePage() {
  const ctx = useAuth();
  const [playlistData, setPlaylistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const YOUTUBE_CHANNELS_API = 'https://www.googleapis.com/youtube/v3/channels';
  const apiKey = import.meta.env.VITE_GOOGLE_apiKey;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getFSData();
        setIsLoading(false);
      } catch (error) {
        console.log('useEffect fetch error: ', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ctx.userId]);

  async function getFSData() {
    try {
      const querySnapshot = await getDocs(collection(db, ctx.userId));
      let newArr = [];
      querySnapshot.forEach((doc) => {
        newArr.push({ ...doc.data() });
      });

      let promises = newArr.map((idObj) => {
        return fetch(
          `${YOUTUBE_CHANNELS_API}?part=snippet,statistics&id=${idObj.channelId}&key=${apiKey}`
        )
          .then((resp) => resp.json())
          .catch((error) => {
            console.warn('Fetch error: ', error);
          });
      });
      Promise.all(promises)
        .then((data) => {
          let allData = data.map((dObj) => dObj.items);
          console.log('allData ===', allData);
          setPlaylistData(allData);
        })
        .catch((error) => {
          console.warn('Promise.all error: ', error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  console.log('inf loop checker');

  return (
    <div className='mx-4'>
      {isLoading && (
        <h2 className='text-center text-5xl text-white font-bold'>
          Data is loading...
        </h2>
      )}
      {!isLoading && (
        <ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {playlistData.map((pObj) => {
            let subsCount = Number(pObj[0].statistics.subscriberCount);
            let subsCountShort =
              subsCount > 1000000
                ? subsCount / 1000000 + 'M'
                : subsCount / 1000 + 'K';
            let viewsCount = Number(pObj[0].statistics.viewCount);
            let viewsCountShort = 0;
            if (viewsCount > 1000000000) {
              viewsCountShort = (viewsCount / 1000000000).toFixed(2) + 'B';
            } else if (viewsCount > 1000000) {
              viewsCountShort = (viewsCount / 1000000).toFixed(2) + 'M';
            } else if (viewsCount > 1000) {
              viewsCountShort = (viewsCount / 1000).toFixed(2) + 'K';
            } else {
              viewsCountShort = viewsCount;
            }

            return (
              <li className='group' key={pObj[0].id}>
                <Link
                  to={`https://www.youtube.com/${pObj[0].snippet.customUrl}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <h3 className='group-hover:bg-cyan-200 text-center bg-white text-slate-800 font-medium uppercase py-2 rounded-t-lg border-b-4 border-neutral-800'>
                    {pObj[0].snippet.title}
                  </h3>
                  <div className='overflow-hidden'>
                    <img
                      className='object-cover w-full h-52 transition duration-200 group-hover:scale-110'
                      src={pObj[0].snippet.thumbnails.high.url}
                      alt={pObj[0].snippet.title}
                    />
                  </div>
                  <div className='flex justify-between text-center py-1 px-3 bg-white items-center gap-3 border-t-4 border-neutral-800'>
                    <div className='flex flex-col bg-slate-300 w-full justify-between pt-[3px] pb-[1px]'>
                      <p className='uppercase text-xs font-medium text-slate-600'>
                        Subs
                      </p>
                      <p className='text-sm font-bold text-slate-600'>
                        {subsCountShort}
                      </p>
                    </div>
                    <div className='flex flex-col bg-slate-300 w-full justify-between pt-[3px] pb-[1px]'>
                      <p className='uppercase text-xs font-medium text-slate-600'>
                        Videos
                      </p>
                      <p className='text-sm font-bold text-slate-600'>
                        {pObj[0].statistics.videoCount}
                      </p>
                    </div>
                    <div className='flex flex-col bg-slate-300 w-full justify-between pt-[3px] pb-[1px]'>
                      <p className='uppercase text-xs font-medium text-slate-600'>
                        Views
                      </p>
                      <p className='text-sm font-bold text-slate-600'>
                        {viewsCountShort}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
