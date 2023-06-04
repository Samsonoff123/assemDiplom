import React from 'react'
import img from '../../assets/icons/empty-folder.png'

export default function index() {
  return (
    <div className='empty'>Нет данных
        <img src={img} />
    </div>
  )
}
