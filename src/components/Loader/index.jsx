import { CircularProgress } from '@mui/material'
import React from 'react'

export default function index() {
  return (
    <div className='loader'>Данные грузятся
        <CircularProgress />
    </div>
  )
}
