import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';


import axios from 'axios';
import BannerForm from '@/components/BannerForm';

const EditBanner = () => {
    const [bannerInfo, setBannerInfo] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    console.log(bannerInfo);

    useEffect(() => {
        if (!id) {
          return;
        }
        axios.get(`/api/banner?id=${id}`).then(response => {
          setBannerInfo(response.data);
        })
      }, [id]);

      return (
        <Layout>
            <div>
            <h1 className='mb-5 text-xl font-bold'>Edit Banner</h1>
            {bannerInfo && (
              <BannerForm {...bannerInfo} />
            )}
            </div>
        </Layout>
      )
}

export default EditBanner;