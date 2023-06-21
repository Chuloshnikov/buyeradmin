import Layout from '@/components/Layout';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

const DeleteBanner = () => {
    const [bannerInfo, setBannerInfo] = useState();
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/api/banner?id=${id}`).then(response => {
            setBannerInfo(response.data);
        })
    }, [id])

    const goBack = () => {
        router.push('/settings')
    }

    const deleteBanner = async () => {
        await axios.delete(`/api/banner?id=${id}`);
        goBack();
    }


    return (
        <Layout>
                <div className='flex flex-col items-center gap-4'>
                    <h1 className='text-center font-semibold text-lg'>Do you really want to delete&nbsp;&quot;{bannerInfo?.title}&quot;?</h1>
                    <Image src={bannerInfo?.imageUrl} width={350} height={250} className="shadow-containerShadow"/>
                        <div className='flex gap-2 justify-center mt-2'>
                            <button 
                                className='btn-red'
                                onClick={deleteBanner}
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
                </div>
        </Layout>
    )
}

export default DeleteBanner;