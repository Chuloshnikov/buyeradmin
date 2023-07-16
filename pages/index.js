import Head from 'next/head';
import { Inter } from 'next/font/google';
import Layout from '../components/Layout';
import DashboardContainer from '@/components/dashboard/DashboardContainer';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>BA Admin Panel</title>
        <meta name="description" content="Welcome to Buyer Anastasiia admin dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
            <Layout>
              <DashboardContainer/>
            </Layout>
      </main>
    </>
  )
}
