import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const BannerForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  imageUrl: existingImage,
}) => {

  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [imageUrl, setImageUrl] = useState(existingImage || '');
  const [goToSettings, setGoToSettings] = useState(false);

  const router = useRouter();

  const saveBanner = async (e) => {
    e.preventDefault();
    const data = {title, description, imageUrl};
    if (_id) {
        //update
        await axios.put('/api/banner', { ...data, _id})
    } else {
        //create
        await axios.post('/api/banner', data);   
    }
    setGoToSettings(true);    
}

if (goToSettings) {
    router.push('/settings');
}

  return (
    <div>
      <form 
      onSubmit={saveBanner}
      className=' flex flex-col gap-2'>
        <label>Banner Title:</label>
        <input 
        onChange={e => setTitle(e.target.value)}
        value={title} 
        type="text" 
        placeholder='banner title...'
        required
        />
        <label>Banner Description:</label>
        <textarea 
        onChange={e => setDescription(e.target.value)}
        value={description}
         placeholder='product description'
        type="text" 
        placeholder='banner description...'
        required
        />
        <label>Banner Image URL:</label>
        <input 
        onChange={e => setImageUrl(e.target.value)}
        value={imageUrl}
        type="text" 
        placeholder='banner image URL...'
        required
        />
        <div className='flex justify-center'>
          <button type="submit" className='bg-orange-400 text-white text-lg py-2 px-8 hover:scale-105 duration-300'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default BannerForm;