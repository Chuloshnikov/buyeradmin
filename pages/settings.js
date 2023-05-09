import React from 'react'
import Layout from '@/components/Layout';
import Link from 'next/link';

const Settings = () => {
  return (
    <Layout>
      <div>
        <h2 className='text-gray-800 text-lg font-bold mb-2'>Banner info settings</h2>
        <Link className='text-white bg-orange-400 py-1 px-2 
          rounded-md inline-block hover:scale-105 duration-300' 
          href={'/banner/new'}>Add New Banner</Link>
      </div>
    </Layout>
  )
}

export default Settings;