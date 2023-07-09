import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";

import { BsPencilSquare, BsTrash3Fill } from 'react-icons/bs';

import axios from 'axios';
import PageSpinner from '@/components/PageSpinner';
import FormatePrice from '@/components/FormatePrice';

export default function Products() {
  const {data: session } = useSession();
  const [products, setProducts] =useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/products').then(response => {
      setProducts(response.data);
      setIsLoading(false);
    });
}, [])

  return (
    <Layout>
        <h2 className='text-gray-800 text-lg font-bold mb-2'>Products</h2>
        <Link 
          className='text-white bg-orange-400 py-1 px-2 
          rounded-sm inline-block hover:scale-105 duration-300' 
          href={'/products/new'}
          >
            Add new product
        </Link>
        <table className='basic mt-2'>
          <thead>
              <tr>
                <td>Product name</td>
                <td className='hidden md:table-cell'>Product brand</td>
                <td className='hidden md:table-cell'>Product price</td>
                <td className='hidden md:table-cell'>Product size</td>
                <td className='hidden md:table-cell'>Product category</td>
                <td className='hidden md:table-cell'>Product quantity</td>
                <td>Edit/Delete</td>
              </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td className='hidden md:table-cell'>{product.brand}</td>
                <td className='hidden md:table-cell'><FormatePrice amount={product.price}/></td>
                <td className='hidden md:table-cell'>{product.sizes ? product.sizes : "-"}</td>
                <td className='hidden md:table-cell'>{product.category}</td>
                <td className='hidden md:table-cell'>{product.quantity}</td>
                <td>  
                  <Link className='flex items-center gap-1' 
                  href={`/products/edit/${product._id}`}
                  >
                    <BsPencilSquare/>
                      Edit
                  </Link>
                  <Link className='flex items-center gap-1'
                  href={`/products/delete/${product._id}`}
                  >
                    <BsTrash3Fill/>
                      Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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