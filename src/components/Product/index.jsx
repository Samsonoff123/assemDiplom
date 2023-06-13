import React from 'react'
import { toast, ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom';

export default function Product({product}) {


  return (
    <div className='product__element' key={product.id}>
        <Link to={`/product/${product.id}`}>
        <div className='product__info'>
            <h3>{product.id} - сабақ</h3>
            <div className="product__title">{product.name}</div>
            <div className="product__description">{product.description}</div>
        </div>
        </Link>
        <ToastContainer />
    </div>
    
  )
}
