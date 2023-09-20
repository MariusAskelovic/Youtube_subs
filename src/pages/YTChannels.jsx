import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { useAuth } from '../store/AuthProvider';
import { Link } from 'react-router-dom';

export default function YTChannels() {
  const [dbData, setDbData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const ctx = useAuth();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const querySnapshot = await getDocs(collection(db, ctx.userId));
    let tempArr = [];
    querySnapshot.forEach((doc) => {
      tempArr.push({ id: doc.id, ...doc.data() });
    });
    setDbData(tempArr);
  }

  const apiKey = 'AIzaSyD8a38JCJAdkCTIv0lW-iJaPA2A9rj-FLk';
  const partCase = 'snippet,contentDetails,statistics';
  const urls = dbData.map(
    ({ channelId }) =>
      `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${apiKey}&part=${partCase}`
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((resp) => resp.json()));
        setChannelData(data);
        console.log(data);
      } catch (error) {
        console.warn(error);
      }
    }
    fetchData();
  }, [dbData]);

  return (
    <div className='p-4'>
      <ul className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {channelData.map((cObj) => {
          let subsCount = Number(cObj.items[0].statistics.subscriberCount);
          let subsCountShort =
            subsCount > 1000000
              ? subsCount / 1000000 + 'M'
              : subsCount / 1000 + 'K';
          //   console.log('subsCountShort ===', subsCountShort);
          return (
            <li
              className='border-2 border-white p-2 flex flex-col gap-2 min-h-fit'
              key={cObj.items[0].snippet.title}
            >
              <Link to={`https://www.youtube.com/channel/${cObj.items[0].id}`}>
                <div className='flex gap-2'>
                  <img
                    className='object-cover h-full'
                    src={cObj.items[0].snippet.thumbnails.medium.url}
                    alt={cObj.items[0].snippet.title}
                  />
                  <div className='flex flex-col justify-between'>
                    <div>
                      <h1 className='text-sky-400 font-bold text-2xl'>
                        {cObj.items[0].snippet.title}
                      </h1>
                      <p className='text-sm text-slate-400'>
                        Subscribers:{' '}
                        <span className='text-white text-xl'>
                          {subsCountShort}
                        </span>
                      </p>
                      <p className='text-sm text-slate-400'>
                        Videos on channel:{' '}
                        <span className='text-white text-xl'>
                          {cObj.items[0].statistics.videoCount}
                        </span>
                      </p>
                    </div>
                    <p className='text-ellipsis text-sm px-1 py-2 bg-slate-400 text-white'>
                      {cObj.items[0].snippet.description
                        .split(' ', 20)
                        .join(' ')}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
