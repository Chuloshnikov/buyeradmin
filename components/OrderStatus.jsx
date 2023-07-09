import React from 'react';

const OrderStatus = ({ status }) => {

    function statusState(status) {

        let statusCircle = null;
        if (status === 0) {
            statusCircle = (<span className='bg-red-500 h-4 w-4 rounded-full inline-block'></span>)
        } else if (status === 1) {
            statusCircle = (<span className='bg-yellow-400 p-1 h-4 w-4 rounded-full inline-block'></span>)
        } else if (status === 2) {
            statusCircle = (<span className='bg-green-400 p-1 h-4 w-4 rounded-full inline-block'></span>)
        } else if (status === 3) {
            statusCircle = (<span className='bg-gray-500 p-1 h-4 w-4 rounded-full inline-block'></span>)
        }
        return statusCircle;
    }


  return (
    <div className=''>
        {statusState(status)}
    </div>
  )
}

export default OrderStatus;