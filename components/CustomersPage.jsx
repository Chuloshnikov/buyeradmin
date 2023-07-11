import React, { useState, useEffect} from 'react';
import axios from 'axios';
import PageSpinner from '@/components/PageSpinner';
import UsersPagination from './UsersPagination';
import  Spinner from '../components/Spinner';
import toast, { Toaster } from 'react-hot-toast';


const notify = () => toast('Here is your toast.');

const CustomersPage = () => {
    const [users, setUsers] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [emailSendingLoading, setEmailSendingLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]); // array of selected users
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [emailContent, setEmailContent] = useState(''); // message body
 
    const usersPerPage = 10;
    console.log(users);
    console.log(selectedUsers);

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/users')
      .then(responseUsers => {
        const users = responseUsers.data;
        axios.get('/api/orders')
          .then(responseOrders => {
            const orders = responseOrders.data;

            // Порівняти email-адреси та знайти співпадіння
            const matchedCustomers = users.filter(user =>
                orders.some(order =>
                  Array.isArray(order.userInfo) &&
                  order.userInfo.some(info => info.email === user.email)
                )
              );

            // Зберегти співпадаючих користувачів у стані `customers`
            setUsers(matchedCustomers);
            setIsLoading(false);
          })
          .catch(errorOrders => {
            // Обробка помилки запиту до orders
            console.error(errorOrders);
          });
      })
      .catch(errorUsers => {
        // Обробка помилки запиту до users
        console.error(errorUsers);
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
  

  const sendEmail = () => {
    const emailData = {
      selectedUsers,
      emailContent
    };
    setEmailSendingLoading(true);
    axios.post('/api/send-email', emailData)
      .then(response => {
        console.log('Email sent:', selectedUsers, emailContent);
        setSelectedUsers([]);
        setEmailContent('');
        setEmailSendingLoading(false);
        toast.success(`відправлено ${selectedUsers.length} листів`);
      })
      .catch(error => {
        console.error('Error sending email:', error);
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

    const handleSelectAll = () => {
      if (isAllSelected) {
        setSelectedUsers([]);
        setIsAllSelected(false);
      } else {
        setSelectedUsers(users);
        setIsAllSelected(true);
      }
    };

    return (
        <div>
          <h2 className='text-gray-800 text-lg font-bold mb-2'>Users</h2>
          <h2 className='font-semibold mb-2'>Email List:</h2>
          <div>
            <textarea
            className='xs:h-[250px] xs:w-[300px] mdl:h-[400px] mdl:w-[700px] lgl:h-[500px] lgl:w-[1000px]
            text-gray-800 bg-white border-bg-gray-800  border-2 dark:bg-gray-800 focus:ring-0 focus:border-orange-400 dark:text-white dark:placeholder-gray-400'
              type="text"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Enter email content..."
            />
          </div>
          <div>
            <h2 className='font-semibold mb-2'>Users:</h2>
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
                            id="orange-checkbox"
                            className='w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 
                            rounded focus:ring-orange-500 dark:focus:ring-orange-600 
                          dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            type="checkbox"
                            checked={isAllSelected || selectedUsers.some((selectedUser) => selectedUser._id === user._id)}
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
            {emailSendingLoading ? (<div className='mt-4'><Spinner size={5}/></div>) : (
              <div className='flex gap-2'>
                <button 
                    className='bg-orange-400 text-white py-1 px-2 inline-flex 
                    rounded-sm text-sm hover:scale-105 duration-300 mt-4'
                    onClick={sendEmail}
                  >
                    Send Email
                  </button>
                  <button
                    className='bg-orange-400 text-white py-1 px-2 rounded-sm inline-flex
                    text-sm hover:scale-105 duration-300 mt-4'
                    onClick={handleSelectAll}
                  >
                  Select All
                </button>
              </div>
            )}
            
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
        <Toaster
          reverseOrder={false}
          position="top-center"
          toastOptions={{
            style:{
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
            }
          }}
        />
        </div>
      );
    };
    

export default CustomersPage;