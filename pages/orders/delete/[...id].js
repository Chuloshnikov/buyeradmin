import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const DeleteProductPage = () => {
    const [orderInfo, setOrderInfo] = useState();
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/orders?id=${id}`).then(response => {
            setOrderInfo(response.data);
        })
    }, [id])

    const goBack = () => {
        router.push('/orders')
    }

    const deleteOrder = async () => {
        await axios.delete(`/api/orders?id=${id}`);
        goBack();
    }

  return (
    <Layout>
        <h1 className='text-center font-semibold text-lg'>Do you really want to delete order &nbsp;&quot;{orderInfo?.orderId}&quot;? </h1>
        <div className='flex gap-2 justify-center mt-2'>
            <button 
            className='btn-red'
            onClick={deleteOrder}
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