import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from "next/link";

import { BsPencilSquare, BsTrash3Fill } from 'react-icons/bs';

import axios from 'axios';
import PageSpinner from '@/components/PageSpinner';

const Products = () => {

  const [products, setProducts] =useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/products').then(response => {
      setProducts(response.data);
      setIsLoading(false);
    })
    
}, [])

  return (
    <Layout>
        <h2 className='text-gray-800 text-lg font-bold mb-2'>Products</h2>
        <Link 
          className='text-white bg-orange-400 py-1 px-2 
          rounded-md inline-block hover:scale-105 duration-300' 
          href={'/products/new'}
          >
            Add new product
        </Link>
        <table className='basic mt-2'>
          <thead>
              <tr>
                <td>Product name</td>
                <td>Product brand</td>
                <td>Product price</td>
                <td>Product size</td>
                <td>Product category</td>
                <td>Product quantity</td>
                <td>Edit/Delete</td>
              </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td>{product.sizes ? product.sizes : "-"}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
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

export default Products;