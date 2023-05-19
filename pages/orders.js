import React from 'react';
import Layout from '@/components/Layout';
import { useSession, getSession } from "next-auth/react";

export default function Orders() {

  const {data: session } = useSession();

  return (
    <Layout>
        <div>Orders</div>
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