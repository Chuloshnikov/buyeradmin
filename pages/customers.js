import Layout from '@/components/Layout';
import CustomersPage from '@/components/CustomersPage';
import { useSession, getSession } from "next-auth/react";
import { useRouter } from 'next/router';


export default function Customers() {
  const {data: session } = useSession();

  return (
    <Layout>
        <CustomersPage/>
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