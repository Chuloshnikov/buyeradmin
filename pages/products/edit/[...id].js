import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

import axios from 'axios';
import ProductForm from '@/components/ProductForm';

const EditProductPage = () => {
    const [productInfo, setProductInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
      if (!id) {
        return;
      }
      axios.get(`/api/products?id=${id}`).then(response => {
        setProductInfo(response.data);
      })
    }, [id]);

  return (
    <Layout>
        <div>
        <h1 className='mb-5 text-xl font-bold'>Edit Product</h1>
        {productInfo && (
          <ProductForm {...productInfo} />
        )}
        </div>
    </Layout>
  )
}

export default EditProductPage;