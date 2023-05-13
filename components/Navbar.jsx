import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";

import logo from '../public/images/logo.png';
import { AiOutlineHome, AiOutlineInbox, AiOutlineUnorderedList, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {

  const inactiveLink = "flex items-center gap-1 p-1 pr-4";
  const activeLink = inactiveLink+" bg-white text-orange-600 rounded-l-lg pr-4";

  const router = useRouter();
  const {pathname} = router;
  
  
  return (
    <aside className='pt-4 pl-4 text-white'>
      <Link 
      href={"/"}
      className='flex flex-col items-center pr-4'>
        <div className='flex'>
          <span className='text-3xl font-bold text-orange-600'>B</span>
          <div className='rounded-full overflow-hidden border-4 border-orange-600'>
              <Image src={logo} alt="logo" className="w-8 h-8"/>
          </div>
          <span className='text-3xl font-bold text-orange-600'>A</span>
          </div>
        <span className='text-white'>Admin Panel</span>
      </Link>
        <nav className='flex flex-col gap-3 mt-10 font-semibold'>
          <Link 
              href={'/'}
              className={pathname === '/' ? activeLink : inactiveLink}
              >
                <AiOutlineHome/>
                Dashboard
          </Link>
          <Link 
            href={'/products'}
            className={pathname.includes('/products') ? activeLink : inactiveLink}
            >
                <AiOutlineInbox/>
                Products
            </Link>
            <Link 
            href={'/orders'}
            className={pathname.includes('/orders') ? activeLink : inactiveLink}
            >
                <AiOutlineUnorderedList/>
                Orders
            </Link>
            <Link 
            href={'/settings'}
            className={pathname.includes('/settings') ? activeLink : inactiveLink}
            >
                <AiOutlineSetting/>
                Settings
            </Link>
            <button 
            onClick={() => signOut()}
            className={inactiveLink}
            >
                <AiOutlineLogout/>
                Logout
            </button>
        </nav>
    </aside>
  )
}

export default Navbar;