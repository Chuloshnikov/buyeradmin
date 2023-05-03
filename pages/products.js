import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from "next/link";

import axios from 'axios';

const Products = () => {
  useEffect(() => {
    axios.get('/api/products').then(response => {
      console.log(response.data);
    })
}, [])

  return (
    <Layout>
        <Link 
        className='text-white bg-orange-400 py-1 px-2 rounded-md inline-block hover:scale-105 duration-300' href={'/products/new'}>Add new product</Link>
    </Layout>
    
  )
}

export default Products;