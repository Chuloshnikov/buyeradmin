import React from 'react';
import NBUCurrencyExchange from './NBUCurrencyExchange';
import TopDeals from './TopDeals';
import TotalOrders from './TotalOrders';
import TotalProducts from './TotalProducts';
import TotalUsers from './TotalUsers';


const DashboardContainer = () => {
  return (
    <div>
        <h2 className='text-gray-800 text-lg font-bold mb-2'>Dashboard</h2>
        <div className='flex xs:flex-col xs:items-center md:items-start md:flex-row gap-5'>
            <TopDeals/>
            <div className='flex flex-col gap-5'>
              <TotalUsers/>
              <TotalProducts/>
            </div>
            <div className='flex flex-col gap-5'>
              <TotalOrders/>
            </div>
            <div>
              <NBUCurrencyExchange/>
            </div>
        </div>
    </div>
  )
}

export default DashboardContainer;