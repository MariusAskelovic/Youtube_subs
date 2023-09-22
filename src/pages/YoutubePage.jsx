import { useEffect, useState } from 'react';
import { useAuth } from '../store/AuthProvider';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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
  }, []);

  async function getFSData() {
    try {
      const querySnapshot = await getDocs(collection(db, ctx.userId));
      let newArr = [];
      querySnapshot.forEach((doc) => {
        newArr.push({ ...doc.data() });
      });

      let promises = newArr.map((idObj) => {
        return fetch(
          `${YOUTUBE_CHANNELS_API}?part=snippet&id=${idObj.channelId}&key=${apiKey}`
        )
          .then((resp) => resp.json())
          .catch((error) => {
            console.warn('Fetch klaida: ', error);
          });
      });
      Promise.all(promises)
        .then((data) => {
          let allData = data.map((dObj) => dObj.items);
          setPlaylistData(allData);
        })
        .catch((error) => {
          console.warn('Promise.all klaida: ', error);
        });
    } catch (error) {
      console.log(error);
    }
  }
  console.log('inf loop checker');
  return (
    <div className='mx-4'>
      {isLoading && <h2>Data is loading...</h2>}
      {!isLoading && (
        <ul className='grid lg:grid-cols-3 gap-5'>
          {playlistData.map((pObj) => (
            <li className='group' key={pObj[0].id}>
              <h3 className='text-center bg-white text-slate-800 font-medium uppercase py-2 rounded-t-lg border-b-4 border-neutral-800'>
                {pObj[0].snippet.title}
              </h3>
              <div className='overflow-hidden'>
                <img
                  className='object-cover w-full h-52 transition duration-200 group-hover:scale-110'
                  src={pObj[0].snippet.thumbnails.high.url}
                  alt={pObj[0].snippet.title}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
