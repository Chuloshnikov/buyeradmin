import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const BannerForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  image: existingImage,
}) => {

  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [image, setImage] = useState(existingImage || '');

  const router = useRouter();

  return (
    <div>BannerForm</div>
  )
}

export default BannerForm;