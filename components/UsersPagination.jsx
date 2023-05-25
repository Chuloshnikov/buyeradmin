import React from 'react';

const UsersPagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
    
    const pageNumbers = [];
    
      for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
      }

      return (
        <div className="flex items-center justify-center">
            <ul className='flex gap-1'>
                {pageNumbers.map((number) => (
                  <li 
                  className='bg-orange-300 text-gray-800 font-semibold flex 
                  justify-center rounded-full w-6 h-6 items-center' 
                  key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={currentPage === number ? 'font-bold text-white' : ''}
                    >
                      {number}
                    </button>
                  </li>
                ))}
          </ul>
        </div>
      );
}

export default UsersPagination