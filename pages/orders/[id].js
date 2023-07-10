import Layout from '@/components/Layout';
import OrderPage from '@/components/OrderPage';
import { useRouter } from 'next/router';




export default function Order() {
    const router = useRouter();
    const {id} = router.query;
    
    return (
        <Layout>
            <OrderPage id={id}/>
        </Layout>
    )
}