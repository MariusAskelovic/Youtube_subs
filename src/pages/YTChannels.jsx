import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';

export default function YTChannels() {
  const [dbData, setDbData] = useState([]);
  const [channelData, setChannelData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const querySnapshot = await getDocs(collection(db, 'marius@yt.com'));
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
              <div className='flex gap-2'>
                <img
                  className='object-cover w-1/3'
                  src={cObj.items[0].snippet.thumbnails.medium.url}
                  alt={cObj.items[0].snippet.title}
                />
                <div>
                  <h1>{cObj.items[0].snippet.title}</h1>
                  <p>Subscribers: {subsCountShort}</p>
                  <p>
                    Videos on channel: {cObj.items[0].statistics.videoCount}
                  </p>
                </div>
              </div>
              <p className='text-ellipsis text-sm px-1 py-2'>
                {cObj.items[0].snippet.description.slice(0, 200)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
