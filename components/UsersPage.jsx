import React, { useState, useEffect} from 'react';
import axios from 'axios';
import PageSpinner from '@/components/PageSpinner';
import UsersPagination from './UsersPagination';

const UsersPage = () => {
    const [users, setUsers] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    console.log(users);
    


  const [selectedUsers, setSelectedUsers] = useState([]); // Список обраних користувачів для відправки розсилки
  const [emailContent, setEmailContent] = useState(''); // Зміст розсилки
 
  const usersPerPage = 10;
  console.log(selectedUsers);
  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/users').then(response => {
      setUsers(response.data)
      setIsLoading(false);
    });
    
  }, []);
    
 
  const handleUserSelect = (userId) => {
    const isSelected = selectedUsers.some(user => user._id === userId);
    if (isSelected) {
      // Користувач уже вибраний, тому видалити його зі списку
      setSelectedUsers(selectedUsers.filter(user => user._id !== userId));
    } else {
      // Користувач ще не вибраний, додати його до списку
      const user = users.find(user => user._id === userId);
      setSelectedUsers([...selectedUsers, user]);
    }
  };
  

      // Відправка розсилки
  const sendEmail = () => {
    // Виконайте логіку відправки розсилки з вибраним списком користувачів та змістом листа
    const emailData = {
      selectedUsers,
      emailContent
    };
    axios.post('/api/send-email', emailData)
      .then(response => {
        console.log('Відправлено:', selectedUsers, emailContent);
        // Скинути форму після відправки
        setSelectedUsers([]);
        setEmailContent('');
      })
      .catch(error => {
        console.error('Помилка під час відправки розсилки:', error);
      });
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
                    <tr className="xs:text-xs mdl:text-base"key={user._id}>
                        <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.some((selectedUser) => selectedUser._id === user._id)}
                          onClick={() => handleUserSelect(user._id)}
                          readOnly
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
            {isLoading && <PageSpinner/>}
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
              <UsersPagination
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
    

export default UsersPage;