import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../store/AuthProvider';
import { useFormik } from 'formik';

export default function AddYTChannel() {
  const ctx = useAuth();
  const formik = useFormik({
    initialValues: {
      channelId: '',
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      addData();
      resetForm();
    },
  });
  async function addData() {
    try {
      const docRef = await addDoc(collection(db, ctx.userId), {
        channelId: formik.values.channelId,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  return (
    <div className='px-10'>
      <form
        className='border-2 border-white p-10 mx-auto flex flex-col max-w-sm gap-2'
        action='submit'
        onSubmit={formik.handleSubmit}
      >
        <input
          className='text-center p-2 text-sm uppercase text-slate-800'
          type='text'
          placeholder='enter Youtube channel ID'
          id='channelId'
          onChange={formik.handleChange}
          value={formik.values.channelId}
        />
        <button type='submit' className='border-white border block'>
          Submit
        </button>
      </form>
    </div>
  );
}
