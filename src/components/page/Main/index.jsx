import React from 'react'
import { useGetProductsQuery } from '../../../redux/slice/productService'
import Header from '../../Header'
import Product from '../../Product'
import Empty from '../../Empty'
import Loader from '../../Loader'

export default function Main({isAdmin}) {
  const { data, isFetching } = useGetProductsQuery()

  if (isFetching) {
    return (
    <div className="products__main">
      <Header isAdmin={isAdmin} />
      <Loader/>
    </div>)
  }

  return (
    <div className="products__main">
        <Header isAdmin={isAdmin} back={false} />
        <div className="main">
            <div className="products">
              {
                <div className='product__main'>
                    {
                      !data?.rows.length ? 
                        <Empty/>
                      :
                      data?.rows.map((product) => 
                        <Product product={product} />
                      )
                    }
                </div>
              }
            </div>
        </div>
    </div>
  )
}