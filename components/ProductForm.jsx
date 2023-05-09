import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ReactSortable } from "react-sortablejs";

import { BsUpload } from 'react-icons/bs';
import Spinner from './Spinner';

const ProductForm = ({
    _id,
    title: existingTitle, 
    brand: existingBrand, 
    description: existingDescription, 
    price: existingPrice, 
    oldPrice: existingOldPrice, 
    sizes: existingSizes, 
    category: existingCategory, 
    quantity: existingQuantity,
    images: existingImages,
}) => {

    const [title, setTitle] = useState(existingTitle || '');
    const [brand, setBrand] = useState(existingBrand || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || 0);
    const [oldPrice, setOldPrice] = useState(existingOldPrice || 0);
    const [images, setImages] = useState(existingImages || [])
    const [sizes, setSizes] = useState(existingSizes || '');
    const [category, setCategory] = useState(existingCategory || '');
    const [quantity, setQuantity] = useState(existingQuantity || 0);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const router = useRouter();

    const saveProduct = async (e) => {
        e.preventDefault();
        const data = {title, brand, description, price, oldPrice, sizes, category, quantity, images};
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

    const uploadImages = async (e) => {
        const files = e.target?.files;
        if (files.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    const updateImagesOrder = (images) => {
        setImages(images);
    }

  return (
        <form
        onSubmit={saveProduct}
        >
        <div className='flex gap-4'>
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
            </div>
            <div>
                        <label>Photos:</label>
                        <div className='mt-2 flex flex-wrap gap-1'>
                            <ReactSortable 
                            className='flex flex-wrap gap-1'
                            list={images} 
                            setList={updateImagesOrder}
                            >
                            {!!images?.length && images.map(link => (
                                <div key={link} 
                                    className="h-28"
                                    >
                                    <img src={link} 
                                    alt="productImg" 
                                    className='rounded-lg'
                                    />
                                </div>
                            ))}
                            </ReactSortable>
                            {isUploading && (
                                <div className='h-28 p-1 rounded-lg flex items-center'>
                                    <Spinner/>
                                </div>
                            )}
                            <label 
                            className='w-28 h-28 border text-center text-lg text-gray-500 
                            flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-200
                            cursor-pointer'
                            >
                                <BsUpload className='w-6 h-6'/>
                                <span>Upload</span>
                                <input
                                onChange={uploadImages}
                                 type="file" 
                                 className='hidden'
                                 />
                            </label>
                            {!images?.length && (
                                <div>
                                    No photos in this product
                                </div>
                            )}
                        </div>
                     </div>
        </form>
  );
}

export default ProductForm;