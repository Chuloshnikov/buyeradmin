import React, { useState, useEffect} from 'react';
import axios from 'axios';

const UsersPage = () => {
    const [users, setUsers] = useState([]); // Список користувачів (емейлів) з бази даних
  const [selectedUsers, setSelectedUsers] = useState([]); // Список обраних користувачів для відправки розсилки
  const [emailContent, setEmailContent] = useState(''); // Зміст розсилки
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

    useEffect(() => {
        axios.get('/api/users').then(response => setUsers(response.data));
    });
    

    const handleUserSelect = (userId) => {
        const index = selectedUsers.indexOf(userId);
        if (index > -1) {
          // Користувач уже вибраний, тому видалити його зі списку
          setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
          // Користувач ще не вибраний, додати його до списку
          setSelectedUsers([...selectedUsers, userId]);
        }
      };

        // Відправка розсилки
    const sendEmail = () => {
    // Виконайте логіку відправки розсилки з вибраним списком користувачів та змістом листа
    console.log('Відправлено:', selectedUsers, emailContent);
    // Скинути форму після відправки
    setSelectedUsers([]);
    setEmailContent('');
  };
    

    // Обчислення індексу першого та останнього користувача для пагінації
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  
    // Зміна сторінки
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
        <div>
          <h2 className='text-gray-800 text-lg font-bold mb-2'>Users</h2>
          <h2 className='font-semibold mb-2'>Email List:</h2>
          <div>
            <textarea
            className='xs:h-[250px] xs:w-[300px] mdl:h-[400px] mdl:w-[700px] lgl:h-[500px] lgl:w-[1000px]'
              type="text"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Enter email content..."
            />
          </div>
          <div>
            <h2 className='font-semibold mb-2'>Customers:</h2>
              <table className='basic'>
                  <thead>
                      <tr >
                        <td>select:</td>
                        <td>name:</td>
                        <td>email:</td>
                      </tr>
                  </thead>
                  <tbody>
                  {currentUsers.map((user) => (
                    <tr className="xs:text-xs mdl:text-base"key={user.id}>
                        <td>
                          <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleUserSelect(user.id)}
                          />
                        </td>
                        <td>
                          <span>{user.name}</span>
                        </td>
                        <td>
                          <span>{user.email}</span>
                        </td>
                    </tr>
                    ))}
                  </tbody>
            </table>
          <div>
            <button 
            className='bg-orange-400 text-white py-1 px-2 inline-flex rounded-sm text-sm hover:scale-105 duration-300 mt-4'
            onClick={sendEmail}
            >
              Send Email
            </button>
          </div>
          <div>
            {/* Пагінація */}
            {users.length > usersPerPage && (
              <Pagination
                usersPerPage={usersPerPage}
                totalUsers={users.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            )}
          </div>
        </div>
        </div>
      );
    };
    
    // Компонент пагінації
    const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
      const pageNumbers = [];
    
      for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
      }
    
      return (
        <ul>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      );
}

export default UsersPage;