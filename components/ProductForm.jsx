import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import axios from 'axios';

const ProductForm = ({
    _id,
    title: existingTitle, 
    brand: existingBrand, 
    description: existingDescription , 
    price: existingPrice, 
    oldPrice: existingOldPrice, 
    sizes: existingSizes, 
    category: existingCategory, 
    quantity: existingQuantity
}) => {

    const [title, setTitle] = useState(existingTitle || '');
    const [brand, setBrand] = useState(existingBrand || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || 0);
    const [oldPrice, setOldPrice] = useState(existingOldPrice || 0);
    const [sizes, setSizes] = useState(existingSizes || '');
    const [category, setCategory] = useState(existingCategory || '');
    const [quantity, setQuantity] = useState(existingQuantity || 0);
    const [goToProducts, setGoToProducts] = useState(false);

    const router = useRouter();

    const saveProduct = async (e) => {
        e.preventDefault();
        const data = {title, brand, description, price, oldPrice, sizes, category, quantity};
        if (_id) {
            //update
            await axios.put('/api/products', { ...data, _id})
        } else {
            //create
            await axios.post('/api/products', data);   
        }
        setGoToProducts(true);    
    }

    if (goToProducts) {
        router.push('/products');
    }

  return (
        <form 
            onSubmit={saveProduct}
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
  );
}

export default ProductForm;