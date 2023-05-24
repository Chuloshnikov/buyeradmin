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
          <h2>Email List</h2>
          <div>
            <input
              type="text"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Enter email content"
            />
          </div>
          <div>
            {currentUsers.map((user) => (
              <div key={user.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                  />
                  {user.email}
                </label>
              </div>
            ))}
          </div>
          <div>
            <button onClick={sendEmail}>Send Email</button>
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