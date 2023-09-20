import { useEffect, useState } from 'react';

export default function Youtube() {
  const channelsList = [
    'UCMrvLMUITAImCHMOhX88PYQ',
    'UCMADmrBg2mMall8bpC4anQQ',
    'UCUhFaUpnq31m6TNX2VKVSVA',
    'UC80PWRj_ZU8Zu0HSMNVwKWw',
    'UCW5YeuERMmlnqo4oq8vwUpg',
    'UCZ2eIJY0phalm_MG38kE26A',
    'UC4FiN46mPTtkJxzRXJY21lQ',
    'UCsBjURrPoezykLs9EqgamOA',
    'UCImXkTVk9fLXAuPciWBOiXA',
  ];

  const apiKey = 'AIzaSyD8a38JCJAdkCTIv0lW-iJaPA2A9rj-FLk'; // Replace with your API key
  const partCase = 'snippet,contentDetails,statistics';
  //   const url = `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${apiKey}&part=${partCase}`;
  const urls = channelsList.map(
    (channelId) =>
      `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${apiKey}&part=${partCase}`
  );
  const [channelData, setChannelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((resp) => resp.json()));
        setChannelData(data);
        console.log(data);
      } catch (error) {
        console.warn(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='p-4'>
      {channelData.length > 0 && (
        <ul>
          {channelData.map((cObj) => (
            <li key={cObj.items[0].snippet.title}>
              <h1>{cObj.items[0].snippet.title}</h1>
              <p>{cObj.items[0].snippet.description}</p>
              <img
                src={cObj.items[0].snippet.thumbnails.medium.url}
                alt={cObj.items[0].snippet.title}
              />
            </li>
          ))}
          {/* You can access other channel data properties here */}
        </ul>
      )}
    </div>
  );
}
