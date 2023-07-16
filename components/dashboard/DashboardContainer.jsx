import React from 'react';
import TopDeals from './TopDeals';

const DashboardContainer = () => {
  return (
    <div>
        <h2 className='text-gray-800 text-lg font-bold mb-2'>Dashboard</h2>
        <div className=''>
            <TopDeals/>
        </div>
    </div>
  )
}

export default DashboardContainer;