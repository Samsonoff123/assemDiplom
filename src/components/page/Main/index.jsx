import React from 'react'
import Header from '../../Header'
import Product from '../../Product'
import Empty from '../../Empty'
import { mainData } from '../../sharedConsts'
import logo from '../../../assets/icons/logo.png' 

export default function Main({isAdmin}) {

  return (
    <div className="products__main">
        <Header isAdmin={isAdmin} pageName={' '} back={false} logo={logo} />
        <div className="main">
            <div className="products">
              {
                <div className='product__main'>
                    {
                      !mainData.length ? 
                        <Empty/>
                      :
                      mainData.map((product) => 
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