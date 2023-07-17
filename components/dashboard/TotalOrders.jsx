import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Count from './Count';
import { AiOutlineOrderedList } from 'react-icons/ai';
import Spinner from '../Spinner';

const TotalOrders = () => {
    const [ordersLen, setOrderslen] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`api/orders`).then(response => {
            setOrderslen(response.data.length);
            setLoading(false);
        })
    
      }, []);

  return (
    <div className='border border-orange-500 w-[200px] rounded-md shadow-md'>
        <div
        className='m-4'
        >
             <h3 className='text-gray-800 text-base font-semibold mb-1 px-1'>Total Orders</h3>
             {!loading ? (
                <div>
                    <div className='flex justify-between ml-2'>
                        <div className='flex gap-1 items-center'>
                            <Count countColor="text-orange-400" countInfo={ordersLen}/>
                            <AiOutlineOrderedList className='text-orange-400 w-5 h-5'/>
                        </div>
                        <div className='flex flex-col justify-end'>
                            <Link className='text-gray-400 text-sm justify-end' href="/orders">View All</Link>
                        </div>
                    </div>
                </div>
                 
            ) :
            (
                <div className='flex items-center justify-center mb-5'>
                    <Spinner/>
                </div>
            )}
        </div>
    </div>
  )
}

export default TotalOrders;