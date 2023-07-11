import React, { useState, useEffect} from 'react';
import axios from 'axios';
import PageSpinner from '@/components/PageSpinner';
import UsersPagination from './UsersPagination';
import  Spinner from '../components/Spinner';
import toast, { Toaster } from 'react-hot-toast';


const notify = () => toast('Here is your toast.');

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [emailSendingLoading, setEmailSendingLoading] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState([]); // array of selected customers
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [emailContent, setEmailContent] = useState(''); // message body
 
  const customersPerPage = 10;
  console.log(customers);
  console.log(selectedCustomers);

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
            setCustomers(matchedCustomers);
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
    
 
  const handleCustomerSelect = (customerId) => {
    const isSelected = selectedCustomers.some(customer => customer._id === customerId);
    if (isSelected) {
      // Користувач уже вибраний, тому видалити його зі списку
      setSelectedCustomers(selectedCustomers.filter(customer => customer._id !== customerId));
    } else {
      // Користувач ще не вибраний, додати його до списку
      const customer = customers.find(customer => customer._id === customerId);
      setSelectedCustomers([...selectedCustomers, customer]);
    }
  };
  

  const sendEmail = () => {
    const emailData = {
      selectedCustomers,
      emailContent
    };
    setEmailSendingLoading(true);
    axios.post('/api/send-email', emailData)
      .then(response => {
        console.log('Email sent:', selectedCustomers, emailContent);
        setSelectedCustomers([]);
        setEmailContent('');
        setEmailSendingLoading(false);
        toast.success(`відправлено ${selectedCustomers.length} листів`);
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
      
  };

    

    // Обчислення індексу першого та останнього користувача для пагінації
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  
    // Зміна сторінки
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const handleSelectAll = () => {
      if (isAllSelected) {
        setSelectedCustomers([]);
        setIsAllSelected(false);
      } else {
        setSelectedCustomers(customers);
        setIsAllSelected(true);
      }
    };

    return (
        <div>
          <h2 className='text-gray-800 text-lg font-bold mb-2'>Customers</h2>
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
                  {currentCustomers.map((customer) => (
                    <tr className="xs:text-xs mdl:text-base"key={customer._id}>
                        <td>
                          <input
                            id="orange-checkbox"
                            className='w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 
                            rounded focus:ring-orange-500 dark:focus:ring-orange-600 
                          dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            type="checkbox"
                            checked={isAllSelected || selectedCustomers.some((selectedCustomer) => selectedCustomer._id === customer._id)}
                            onClick={() => handleCustomerSelect(customers._id)}
                            readOnly
                          />
                        </td>
                        <td>
                          <span>{customer.name}</span>
                        </td>
                        <td>
                          <span>{customer.email}</span>
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
            {customers.length > customersPerPage && (
              <UsersPagination
                usersPerPage={customersPerPage}
                totalUsers={customers.length}
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