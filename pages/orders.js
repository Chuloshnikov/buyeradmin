import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useSession, getSession } from "next-auth/react";
import axios from 'axios';
import PageSpinner from '@/components/PageSpinner';
import Link from 'next/link';
import { BsPencilSquare, BsTrash3Fill } from 'react-icons/bs';
import OrderStatus from '@/components/OrderStatus';
import FormatePrice from '@/components/FormatePrice';
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function Orders() {

  const {data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(orders);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setIsLoading(false);
    });
}, [])

  return (
    <Layout>
      <h2 className='text-gray-800 text-lg font-bold mb-2'>Orders</h2>
      <table className='basic mt-2'>
          <thead>
              <tr>
                <td className='hidden md:table-cell'>Order status</td>
                <td className='hidden md:table-cell'>Order amount</td>
                <td className=''>Order Info</td>
                <td>Edit/Delete</td>
              </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td><OrderStatus status={order.status}/></td>
                <td className='hidden md:table-cell'><FormatePrice amount={order.amount}/></td>
                <td>  
                  <Link className='flex items-center gap-1' 
                  href={`/orders/${order._id}`}
                  >
                    <AiOutlineQuestionCircle/>
                  </Link>
                </td>
                <td>  
                  <Link className='flex items-center gap-1' 
                  href={`/products/edit/${order._id}`}
                  >
                    <BsPencilSquare/>
                      Edit
                  </Link>
                  <Link className='flex items-center gap-1'
                  href={`/products/delete/${order._id}`}
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


export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  } 
}