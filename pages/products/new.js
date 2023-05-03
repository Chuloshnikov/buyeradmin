import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import axios from 'axios';

const NewProduct = () => {
    const [title, setTitle] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [sizes, setSizes] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [goToProducts, setGoToProducts] = useState(false);

    const router = useRouter();

    const createProduct = async (e) => {
        e.preventDefault();
        const data = {title, brand, description, price, oldPrice, sizes, category, quantity};
        await axios.post('/api/products', data);
        setGoToProducts(true);
    }

    if (goToProducts) {
        router.push('/products');
    }

  return (
    <Layout>
        <div >
            <h1 className='mb-5 text-xl font-bold'>New Product</h1>
            <form 
            onSubmit={createProduct}
             className='flex gap-4'>
                <div className='flex flex-col gap-1'>
                    <label>Title:</label>
                    <input 
                    onChange={e => setTitle(e.target.value)}
                    value={title} 
                    type="text" 
                    placeholder='product title...' 
                    required
                    />
                    <label>Brand:</label>
                    <input
                    onChange={e => setBrand(e.target.value)}
                    value={brand}
                     type="text" 
                     placeholder='product brand...' 
                     required
                     />
                    <label>Description:</label>
                    <textarea
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                     placeholder='product description'
                     />
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Price (in UAH)</label>
                    <input
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                     type="number" 
                     placeholder='product price' 
                     required
                     />
                    <label>Old price (in UAH)</label>
                    <input
                    onChange={e => setOldPrice(e.target.value)}
                    value={oldPrice}
                     type="number" 
                     placeholder='old price'
                     />
                    <label>Sizes:</label>
                    <input
                    onChange={e => setSizes(e.target.value)}
                    value={sizes}
                     type="text" 
                     placeholder='product sizes'
                     />
                </div>
                <div className='flex flex-col gap-1'>
                    <label>Category</label>

                    <input 
                    onChange={e => setCategory(e.target.value)}
                    value={category}
                    type="text" 
                    placeholder='product category'
                    />
                    <label>Quantity</label>
                    <input
                    onChange={e => setQuantity(e.target.value)}
                    value={quantity}
                     type="number" 
                     placeholder='product quantity'
                     />
                    <label>Images:</label>
                    <button type="submit" className='btn-primary'>Save</button>
                </div>
                

                
            </form>
        </div>
        
    </Layout>
  )
}

export default NewProduct;