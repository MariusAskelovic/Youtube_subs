import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
export default function HomePage() {
  const [dbData, setDbData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const querySnapshot = await getDocs(collection(db, 'marius@email.com'));
    let tempArr = [];
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id);
      //   console.log(doc.data().tags);
      const tags = doc.data().tags || [];
      tempArr.push({ id: doc.id, ...doc.data(), tags: [...tags] });
    });
    setDbData(tempArr);
  }
  //   console.log('dbData ===', dbData);
  return (
    <div className='mx-5'>
      <h2 className='text-5xl text-center text-lime-300'>
        MA Youtube channels recommendations
      </h2>
      <ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-7'>
        {dbData.map((cObj) => (
          <li key={cObj.id}>
            <h2>{cObj.channel}</h2>
            <img
              className='w-full h-64 object-cover object-center'
              src={cObj.coverImg}
              alt={cObj.channel}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
