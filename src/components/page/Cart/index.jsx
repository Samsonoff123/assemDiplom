import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../../Button'
import Header from '../../Header'
import Product from '../../Product'
import Empty from '../../Empty'
import Loader from '../../Loader'


export default function Cart({isAdmin}) {
  const { cart } = useSelector(state => state)
  return (
    <div className='cart__page'>
        <Header isAdmin={isAdmin} pageName="Себет" />
        <div className="main">
            <div className="products">
              {
                cart
                ?
                <div className="product__main">
                    {
                      cart.length !== 0 
                      ?
                        cart.map((product) =>
                          <Product product={product} />
                        )
                      : <Empty />
                    }
                </div>
                : <Loader />
              }
            </div>
        </div>
    </div>
  )
}
