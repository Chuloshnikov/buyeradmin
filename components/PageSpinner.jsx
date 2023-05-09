import React from 'react';
import {SyncLoader} from "react-spinners";

const PageSpinner = () => {
  return (
    <div className='flex text-center justify-center items-center mt-[150px] mb-[150px]'>
        <SyncLoader color={'#FB923C'} size={40} speedMultiplier={2}/>
    </div>
  )
}

export default PageSpinner;