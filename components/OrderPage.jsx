import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Image from 'next/image';
import {AiOutlineUser} from "react-icons/ai";
import { useRouter } from 'next/router';
import FormatePrice from './FormatePrice';
import Spinner from './Spinner';

const OrderPage = ({ id }) => {
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState();
    const [loading, setLoading] = useState(false);
    console.log(orderDetails);

    useEffect(() => {
        if (!id) {
          return;
        }
        setLoading(true);
        axios.get(`/api/orders?id=${id}`).then(response => {
          setOrderDetails(response.data);
          setLoading(false);
        });
      }, [id]);


      const goBack = () => {
        router.push('/orders');
      }



    
  return (
    <div>
        <div>
            <div className='flex justify-between'>
                <h2 className='text-gray-800 text-lg font-bold mb-2'>Order Details</h2>
                <button 
                onClick={goBack}
                className='mb-4 px-2 py-1 text-white 
                font-semibold bg-orange-400 rounded-sm 
                hover:scale-105 duration-300'>
                    Back
                </button>
            </div>
            <div className='flex xs:flex-col mdl:flex-row gap-5'>
                <div>
                    {orderDetails?.userInfo.map(user => (
                        <div key={user.name}>
                            {user.image ? (<Image src={user.image} width={200} height={200} alt="userImage"/>) 
                            : (
                                <div className='bg bg-orange-400 text-white w-[200px] h-[200px] flex items-center justify-center'>
                                    <AiOutlineUser className='w-[180px] h-[180px]'/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div>
                    <h3 className='text-base font-semibold'>Client Information</h3>
                    <div className='flex gap-2 mt-2'>
                        <span>Name:</span>
                        <p>{orderDetails?.clientName}</p>
                    </div>
                    <div className='flex gap-2'>
                        <span>Lastname:</span>
                        <p>{orderDetails?.clientLastName}</p>
                    </div>
                    <div>
                    {orderDetails?.userInfo.map((user) => (
                        <div key={user.name}>
                            <div className='flex gap-2'>
                                <span>username:</span>
                                <p>{user.name}</p>
                            </div>
                            <div className='flex gap-2'>
                                <span>email:</span>
                                <p>{user.email}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className='flex gap-2'>
                        <span>Phone:</span>
                        <p>{orderDetails?.clientPhone}</p>
                    </div>
                    <div className='flex gap-2'>
                        <span>New Post Info:</span>
                        <p>{orderDetails?.newPost}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='border-t-2 border-gray-400 mt-5'>
            {!loading ? (
                <div>
                    <table className='basic mt-2 xs:text-xs md:text-base'>
                    <thead>
                        <tr>
                           <td className='hidden md:table-cell'>Item id</td>
                           <td>Product name</td>
                           <td>Product brand</td>
                           <td className='hidden md:table-cell'>Product size</td>
                           <td className='hidden md:table-cell'>Product category</td>
                           <td className='hidden md:table-cell'>Product quantity</td>
                           <td className='hidden md:table-cell'>Product price</td>
                        </tr>
                    </thead>
                    <tbody>
                      {orderDetails?.productData.map((item) => (
                        <tr key={item._id}>
                           <td className='hidden md:table-cell'>{item._id}</td>
                          <td>{item.title}</td>
                          <td>{item.brand}</td>
                          <td className='hidden md:table-cell'>{item.sizes ? item.sizes : "-"}</td>
                          <td className='hidden md:table-cell'>{item.category}</td>
                          <td className='hidden md:table-cell'>{item.quantity}</td>
                          <td className='hidden md:table-cell'><FormatePrice amount={item.price}/></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='flex items-end justify-end xs:text-xs md:text-base'>
                   <div className='bg-white rounded-sm shadow-md border border-gray-400 flex gap-2 px-2'>
                   <span>Order price:</span> <FormatePrice amount={orderDetails?.amount}/>
                   </div>
                  </div>
                  <div className='flex items-end justify-end xs:text-xs md:text-base'>
                   <div className='bg-white rounded-sm shadow-md border border-gray-400 flex gap-2 px-2'>
                   <span>Order id:</span> {orderDetails?.orderId}
                   </div>
                  </div>
                </div>
            ) : (
                <Spinner/>
            )}
                 
        </div>
    </div>   
  )
}

export default OrderPage;