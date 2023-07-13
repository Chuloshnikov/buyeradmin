import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {AiOutlineUser} from "react-icons/ai";
import Link from 'next/link';
import { useRouter } from 'next/router';
import FormatePrice from './FormatePrice';
import Spinner from './Spinner';
import { AiOutlineQuestionCircle } from "react-icons/ai";


const CustomerOrdersPage = ({id}) => {
    const [user, setUser] = useState();
    const [orders, setOrders] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    console.log(user);
    console.log(orders);

    useEffect(() => {
        if (!id) {
          return;
        }
        setLoading(true);
        axios.get(`/api/users?id=${id}`).then(response => {
          setUser(response.data);
          setLoading(false);
        })
      }, [id]);

      useEffect(() => {
        if (!user) {
            return;
        }
        setLoading(true);
        axios.get(`/api/orders?email=${user?.email}`).then(response => {
            setOrders(response.data);
            setLoading(false);
          })
    }, [user]);

    
    const goBack = () => {
        router.push('/customers');
      }


  return (
    <div>
        <div>
            <div className='flex justify-between'>
                <h2 className='text-gray-800 text-lg font-bold mb-2'>Customer orders</h2>
                <button 
                onClick={goBack}
                className='mb-4 px-2 py-1 text-white 
                font-semibold bg-orange-400 rounded-sm 
                hover:scale-105 duration-300'>
                    Back
                </button>
            </div>
            {!loading ? (
                <div>
                    <div className='flex xs:flex-col mdl:flex-row gap-5'>
                        <div>
                            {
                            user?.image ? (<Image src={user.image} width={200} height={200} alt="userImage"/>) 
                            : (
                                <div className='bg bg-orange-400 text-white w-[200px] h-[200px] flex items-center justify-center'>
                                <AiOutlineUser className='w-[180px] h-[180px]'/>
                                </div>
                                )
                            }
                        </div>
                    </div>
                 <div>
                     <h3 className='text-base font-semibold'>User Information</h3>
                     <div>
                         <div>
                             <div className='flex gap-2'>
                                 <span>username:</span>
                                 <p>{user?.name}</p>
                             </div>
                             <div className='flex gap-2'>
                                 <span>email:</span>
                                 <p>{user?.email}</p>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
                ) : (
                <Spinner/>
                )
            }
           
        <div className='border-t-2 border-gray-400 mt-5'>
            {!loading ? (orders?.map((order) => (
                <div>
                    <table className='basic mt-2 xs:text-xs md:text-base'>
                            <thead>
                                <tr>
                                <td className='hidden md:table-cell'>orderId</td>
                                <td>Created At</td>
                                <td>Amount</td>
                                <td className='hidden md:table-cell'>Order info</td>
                                </tr>
                            </thead>
                        <tbody>
                                <tr>
                                    <td className='hidden md:table-cell'>{order.orderId}</td>
                                    <td>{order.createdAt}</td>
                                    <td><FormatePrice amount={order.amount}/></td>
                                    <td className='hidden md:table-cell'>
                                        <Link className='flex items-center gap-1' 
                                            href={`/orders/${order._id}`}
                                            >
                                        <AiOutlineQuestionCircle/>
                                        </Link>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            ))    
            ) : (
                <div className='mt-5'>
                    <Spinner/>
                </div>
            )}
                
        </div>
    </div> 
</div> 
  )
}

export default CustomerOrdersPage;