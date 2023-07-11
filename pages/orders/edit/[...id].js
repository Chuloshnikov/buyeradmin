import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

import axios from 'axios';
import ProductForm from '@/components/ProductForm';
import OrderForm from '@/components/OrderForm';

const EditProductPage = () => {
    const [orderInfo, setOrderInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get(`/api/orders?id=${id}`).then(response => {
        setOrderInfo(response.data);
      })
    }, [id]);

  return (
    <Layout>
        <div>
        <h1 className='mb-5 text-xl font-bold'>Edit Order</h1>
        {orderInfo && (
          <OrderForm {...orderInfo} />
        )}
        </div>
    </Layout>
  )
}

export default EditProductPage;