import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, getSession } from "next-auth/react";

import { BsPencilSquare, BsTrash3Fill } from 'react-icons/bs';

import axios from 'axios';
import PageSpinner from '@/components/PageSpinner';

export default function Settings() {
  const {data: session } = useSession();
  const [banners, setBanners] =useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (session) {
    axios.get('/api/banner').then(response => {
      setBanners(response.data);
    })
     } else {
      return;
    }
      setIsLoading(false);
  }, [])


  return (
    <Layout>
      <div>
        <h2 className='text-gray-800 text-lg font-bold mb-2'>Banner info settings</h2>
        <Link className='text-white bg-orange-400 py-1 px-2 
          rounded-sm inline-block hover:scale-105 duration-300' 
          href={'/banner/new'}>Add new banner</Link>
          <div className='p-4 flex flex-wrap'>
              {banners.map((banner => (
                <div 
                key={banner._id}
                className='shadow-containerShadow flex flex-col text-center gap-1 p-2'>
                    <Image src={banner.imageUrl} width={220} height={100}/>
                    <h3 className='text-lg font-semibold'>{banner.title}</h3>
                    <p className='text-sm font-medium'>{banner.description}</p>
                    <div>
                      <Link className='flex items-center gap-1
                       bg-orange-400 text-white py-1 px-2 
                       inline-flex rounded-sm text-sm hover:scale-105 
                       duration-300 mr-1' 
                          href={`/banner/edit/${banner._id}`}
                        >
                      <BsPencilSquare/>
                        Edit
                      </Link>
                      <Link className='flex items-center gap-1 
                      bg-orange-400 text-white py-1 px-2 
                      inline-flex rounded-sm text-sm hover:scale-105 
                      duration-300 mr-1'
                          href={`/banner/delete/${banner._id}`}
                        >
                      <BsTrash3Fill/>
                      Delete
                      </Link>
                    </div>
                </div>
              )))}
          </div>
      </div>
      {isLoading && <PageSpinner/>}
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  } 
}