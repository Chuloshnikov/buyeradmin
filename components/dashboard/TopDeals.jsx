import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';
import { AiOutlineUser } from "react-icons/ai";
import Image from 'next/image';
import FormatePrice from '../FormatePrice';

const TopDeals = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [topOrders, setTopOrders] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get('api/orders').then(response => {
            setOrders(response.data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        // Функція для обробки даних та вибору топ-3 ордерів за значенням amount
        const processOrdersData = () => {
            if (!orders || orders.length === 0) return;

            // Копіюємо масив orders, щоб не змінювати оригінальний масив
            const ordersCopy = [...orders];

            // Сортуємо масив ordersCopy за спаданням значення amount
            ordersCopy.sort((a, b) => b.amount - a.amount);

            // Вибираємо топ-3 ордери
            const topThreeOrders = ordersCopy.slice(0, 5);

            // Оновлюємо стан знайденими даними
            setTopOrders(topThreeOrders);
        };

        processOrdersData();
    }, [orders]);

    return (
        <div className='border border-orange-500 w-[250px] rounded-md'>
            <div 
            className='m-2'
            >
                <h3 className='text-gray-800 text-xl font-bold mb-1 px-1'>Top Deals</h3>
                {loading ? (
                    <div className='items-center flex justify-center mx-auto'>
                        <Spinner/>
                    </div>
                    
                ) : (
                    <>
                        <ul
                        className="flex flex-col p-[2px] gap-1"
                        >
                        {topOrders.map((order, index) => (
                            <li 
                            key={index}
                            >
                                {order.userInfo.map((user) =>
                                user.image ? (
                                    <div className='flex justify-between'>
                                        <div className='flex'>
                                            <Image key={user.name} src={user.image} width={30} height={30} className="rounded-full" alt="userImage" />
                                            <div className='text-[10px] font-semibold ml-2'>
                                                <p>{user.name}</p> 
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className='text-xs font-semibold flex flex-col justify-end ml-1'>
                                            <FormatePrice amount={order.amount}/>
                                        </div>
                                    </div>
                                   
                                ) : (
                                    <div className='flex justify-between'>
                                        <div className='flex'>
                                            <div className='bg-orange-400 text-white w-[30px] h-[30px] flex items-center justify-center rounded-full' key={user.name}>
                                                <AiOutlineUser className='w-[20px] h-[320px]' />
                                            </div>
                                            <div className='text-[10px] font-semibold ml-2'>
                                                <p>{user.name}</p> 
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                         
                                        <div className='text-xs font-semibold flex flex-col justify-end ml-1'>
                                            <FormatePrice amount={order.amount}/>
                                        </div>
                                    </div>
                                   
                                )
                                )}
                            </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default TopDeals;