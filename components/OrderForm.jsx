import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import FormatePrice from './FormatePrice';

const OrderForm = ({ 
  _id,
  amount: existingAmount,
  clientLastName: existingClientLastName,
  clientName: existingClientName,
  clientPhone: existingClientPhone,
  invoice: existingInvoice,
  newPost: existingNewPost,
  orderId: existingOrderId,
  paymentMethod: existingPaymentMethod,
  productData: existingProductData,
  status: existingStatus,
  userInfo: existingUserInfo
 }) => {
  const [amount, setAmount] = useState(existingAmount || 0);
  const [clientName, setClientName] = useState(existingClientName || '');
  const [clientLastName, setClientLastName] = useState(existingClientLastName || '');
  const [clientPhone, setClientPhone] = useState(existingClientPhone || '');
  const [newPost, setNewPost] = useState(existingNewPost || '');
  const [invoice, setInvoice] = useState(existingInvoice || '');
  const [orderId, setOrderId] = useState(existingOrderId || '');
  const [paymentMethod, setPaymentMethod] = useState(existingPaymentMethod || '');
  const [productData, setProductData] = useState(existingProductData || []);
  const [status, setStatus] = useState(existingStatus || 0);
  const [userInfo, setUserInfo] =useState(existingUserInfo || []);
  const [goToOrders, setGoToOrders] = useState(false);

  const router = useRouter();

  const saveOrderChange = async (e) => {
    e.preventDefault();
        const data = {amount, clientName, clientLastName, clientPhone, newPost, invoice, orderId, paymentMethod, productData, status, userInfo};
        if (_id) {
            //update
            await axios.put('/api/orders', { ...data, _id})
        } else {
            //create
            await axios.post('/api/orders', data);   
        }
        setGoToOrders(true);    
    }

    if (goToOrders) {
      router.push('/orders');
    }
  

  return (
    <div>
        <div className='flex gap-2'>
            <span>Order ID:</span>
            <p>{orderId}</p>
        </div>
        <div>
          {userInfo?.map(user => (
            <div key={user.name}>
              <div className='flex gap-2'>
                <span>Name:</span>
                <p>{user.name}</p>
              </div>
              <div className='flex gap-2'>
                <span>Email:</span>
                <p>{user.email}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='flex gap-2'>
            <span>Payment method:</span>
            <p>{paymentMethod}</p>
        </div>
        <div className='flex gap-2'>
            <span>Order amount:</span>
            <p><FormatePrice amount={amount}/></p>
        </div>
        <form
          onSubmit={saveOrderChange}
        >
          <div className='flex xs:flex-col mdl:flex-row gap-4 mt-5'>
            <div className='flex flex-col gap-1'>
                <div className='flex flex-col gap-1'>
                  <label>Customer name:</label>
                  <input
                  className='focus:border-orange-400 focus:border-1 focus:ring-0'
                  onChange={e => setClientName(e.target.value)}
                  value={clientName} 
                  type="text" 
                  placeholder='Customer name...' 
                  required
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label>Customer last name:</label>
                  <input
                  className='focus:border-orange-400 focus:border-1 focus:ring-0'
                  onChange={e => setClientLastName(e.target.value)}
                  value={clientLastName} 
                  type="text" 
                  placeholder='Customer last name...' 
                  required
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label>Customer phone:</label>
                  <input
                  className='focus:border-orange-400 focus:border-1 focus:ring-0'
                  onChange={e => setClientPhone(e.target.value)}
                  value={clientPhone} 
                  type="tel" 
                  placeholder='+380977777777' 
                  required
                  />
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='flex flex-col gap-1'>
                  <label>New post departament:</label>
                  <input
                  className='focus:border-orange-400 focus:border-1 focus:ring-0'
                  onChange={e => setNewPost(e.target.value)}
                  value={newPost} 
                  type="text" 
                  placeholder='New post departament' 
                  required
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label>New post invoice:</label>
                  <input
                  className='focus:border-orange-400 focus:border-1 focus:ring-0'
                  onChange={e => setInvoice(e.target.value)}
                  value={invoice} 
                  type="text" 
                  placeholder='New post invoice' 
                  required
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label>Status:</label>
                  <select
                    className="focus:border-yellow-600 focus:border-1 focus:ring-0"
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                  >
                    <option value={0}>accepted</option>
                    <option value={1}>on delivery</option>
                    <option value={2}>done</option>
                    <option value={3}>canceled</option>
                  </select>
                </div>
            </div>
            </div>
            <div className='mdl:pl-14'>
              <button type="submit" className='btn-primary w-full mdl:w-[300px]'>Save</button>
            </div>
        </form>
    </div>
  )
}

export default OrderForm;