import React from 'react';

const Count = ({ countInfo, countColor, text }) => {
  return (
    <div className={`text-2xl font-bold ${countColor}`}>
        {countInfo}
    </div>
  )
}

export default Count;