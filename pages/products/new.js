import ProductForm from '@/components/ProductForm';
import Layout from '@/components/Layout';

const NewProduct = () => {

return (
    <Layout>
        <div>
            <h1 className='mb-5 text-xl font-bold'>New Product</h1>
           <ProductForm/>
        </div>
    </Layout>
  )
}

export default NewProduct;