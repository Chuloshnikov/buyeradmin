import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";

import logo from '../public/images/logo.png';
import { 
  AiOutlineHome, 
  AiOutlineInbox, 
  AiOutlineUnorderedList, 
  AiOutlineSetting, 
  AiOutlineLogout, 
  } from "react-icons/ai";
  import { FiUsers } from "react-icons/fi";
import { ImArrowRight, ImArrowLeft} from "react-icons/im"

const Navbar = ({ showNav, setShowNav }) => {

  const inactiveLink = "flex items-center gap-1 p-1 pr-4";
  const activeLink = inactiveLink+" bg-white text-orange-600 rounded-l-lg pr-4";

  const router = useRouter();
  const {pathname} = router;
  
  
  return (
    <aside className={showNav ? 'pt-4 pl-4 text-white sticky duration-300' : 'offSpan ' + 'pt-4 pl-2 text-white sticky duration-300'}>
      <Link 
      href={"/"}
      className='flex flex-col items-center pr-2 lg:pr-4'>
        <div className='flex'>
          <span className='hidden lg:block text-xl lg:text-3xl font-bold text-orange-600'>B</span>
          <div className='rounded-full overflow-hidden border-4 border-orange-600'>
              <Image src={logo} alt="logo" className="w-6 h-6 lg:w-8 lg:h-8"/>
          </div>
          <span className='hidden lg:block text-xl lg:text-3xl font-bold text-orange-600'>A</span>
          </div>
        <span className='text-white'>Admin Panel</span>
      </Link>
        <nav className='flex flex-col gap-3 mt-10 font-semibold'>
          <Link 
              href={'/'}
              className={pathname === '/' ? activeLink : inactiveLink}
              >
                <AiOutlineHome/>
                <span>Dashboard</span>
          </Link>
          <Link 
            href={'/products'}
            className={pathname.includes('/products') ? activeLink : inactiveLink}
            >
                <AiOutlineInbox/>
                <span>Products</span>
            </Link>
            <Link 
            href={'/orders'}
            className={pathname.includes('/orders') ? activeLink : inactiveLink}
            >
                <AiOutlineUnorderedList/>
                <span>Orders</span>
            </Link>
            <Link 
            href={'/users'}
            className={pathname.includes('/users') ? activeLink : inactiveLink}
            >
                <FiUsers/>
                <span>Users</span>
            </Link>
            <Link 
            href={'/customers'}
            className={pathname.includes('/customers') ? activeLink : inactiveLink}
            >
                <FiUsers/>
                <span>Customers</span>
            </Link>
            <Link 
            href={'/settings'}
            className={pathname.includes('/settings') ? activeLink : inactiveLink}
            >
                <AiOutlineSetting/>
                <span>Settings</span>
            </Link>
            <button 
            className={inactiveLink}
            onClick={() => signOut()}
            
            >
                <AiOutlineLogout/>
                <span>Logout</span>
            </button>
            <button 
                onClick={() => setShowNav(!showNav)}
                className={inactiveLink}>
                    {showNav ? <ImArrowLeft/> : <ImArrowRight/>}
                    <span>Close menu</span>
            </button>
        </nav>
    </aside>
  )
}

export default Navbar;