import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const DeleteProductPage = () => {
    const [productInfo, setProductInfo] = useState();
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/products?id=${id}`).then(response => {
            setProductInfo(response.data);
        })
    }, [id])

    const goBack = () => {
        router.push('/products')
    }

    const deleteProduct = async () => {
        await axios.delete(`/api/products?id=${id}`);
        goBack();
    }

  return (
    <Layout>
        <h1 className='text-center font-semibold text-lg'>Do you really want to delete&nbsp;"{productInfo?.title}"? </h1>
        <div className='flex gap-2 justify-center mt-2'>
            <button 
            className='btn-red'
            onClick={deleteProduct}
            >
                Yes
            </button>
            <button 
            className='btn-default' 
            onClick={goBack}
            >
                NO
            </button>
        </div>
    </Layout>
  )
}

export default DeleteProductPage;