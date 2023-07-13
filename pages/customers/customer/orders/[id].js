import React from 'react';
import Layout from '@/components/Layout';
import CustomerOrdersPage from '@/components/CustomerOrdersPage';
import { useSession, getSession } from "next-auth/react";
import { useRouter } from 'next/router';

export default function CustomerOrders() {
  const router = useRouter();
  const {id} = router.query;
  
  return (
    <Layout>
      <CustomerOrdersPage id={id}/>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if(!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  } 
}
