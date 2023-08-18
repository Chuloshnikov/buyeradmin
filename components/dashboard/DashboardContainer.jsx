import React from 'react';
import NBUCurrencyExchange from './NBUCurrencyExchange';
import PrivatBankCurrencyExchange from './PrivatBankCurrencyExchange';
import TopDeals from './TopDeals';
import TotalOrders from './TotalOrders';
import TotalProducts from './TotalProducts';
import TotalUsers from './TotalUsers';
import DashboardChart from './WeeklyVisitsChart';
import Link from 'next/link';


const WeeklyVisitsChart = () => {

  
    const data = [
      { name: 'Project 1', visits: 150 },
      { name: 'Project 2', visits: 200 },
      { name: 'Project 1', visits: 150 },
      { name: 'Project 2', visits: 200 },
      { name: 'Project 1', visits: 150 },
      { name: 'Project 2', visits: 200 },

    ]

  return (
    <div >
        <h2 className='text-gray-800 text-lg font-bold mb-2'>Dashboard</h2>
        <div className='flex gap-5'>
            <div>
                <div className='flex xs:flex-col xs:items-center md:items-start md:flex-row gap-5'>
                    <TopDeals/>
                    <div className='flex flex-col gap-5'>
                      <TotalUsers/>
                      <TotalProducts/>
                    </div>
                    <div className='flex flex-col gap-5'>
                      <TotalOrders/>
                      <div>
                        <div 
                        className='border border-orange-500 w-[200px] rounded-md shadow-md'
                        >
                              <div className='flex justify-between ml-2'>
                                  <div className='items-center text-center py-9'>
                                      <Link 
                                      className='ml-2 text-2xl font-bold underline text-gray-800 hover:text-orange-400 duration-300'
                                      href="https://buyeranastasiia.vercel.app/">Go to website</Link>
                                  </div>
                              </div>
                          </div>
                      </div>
                </div>
            
                  
                </div>
                <div className='max-w-[680px] mt-5'>
                      <DashboardChart data={data}/>
                  </div>
            </div>
            <div className='flex flex-col gap-5'>
                  <PrivatBankCurrencyExchange/>
                  <NBUCurrencyExchange/>
            </div>
        </div>
    </div>
  )
}

export default WeeklyVisitsChart;