import React from 'react';
import Layout from '@/components/Layout';
import BannerForm from '@/components/BannerForm';

const NewBanner = () => {
  return (
    <Layout>
      <h2 className='text-gray-800 text-lg font-bold mb-2'>New Banner</h2>
        <BannerForm/>
    </Layout>
  )
}

export default NewBanner;