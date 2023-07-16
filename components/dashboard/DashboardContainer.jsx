import React from 'react';
import TopDeals from './TopDeals';
import TotalUsers from './TotalUsers';

const DashboardContainer = () => {
  return (
    <div>
        <h2 className='text-gray-800 text-lg font-bold mb-2'>Dashboard</h2>
        <div className='flex gap-5'>
            <TopDeals/>
            <div>
              <TotalUsers/>
            </div>
        </div>
    </div>
  )
}

export default DashboardContainer;