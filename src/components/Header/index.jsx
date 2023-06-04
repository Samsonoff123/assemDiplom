import React, { useState } from 'react'
import { ReactComponent as Menu } from '../../assets/menu.svg'
import { ReactComponent as Back } from '../../assets/back.svg'
import { ReactComponent as Logout } from '../../assets/logout.svg'
import { ReactComponent as Feedback } from '../../assets/feedback.svg'
import image from '../../assets/marketology.png'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

export default function Header({pageName, logo = '', back = true, isAdmin}) {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('token')
        document.location.reload()
    }

  return (
    <>
    {
        pageName &&

        <div className="header_top" >
            { back && <Back onClick={()=>navigate(-1)} /> }
            <span>
                {pageName}
            </span>
            {
            logo && (
                <img src={logo} />
            )
        }
            <div></div>
        </div>
    }

    <div className='header'>
        <Link to={"/"} className="header__element">
            <Menu />
        </Link>
        <div className="header__element">
         <Feedback onClick={() => setOpen(true)} />
        </div>
        
        <div className="header__element">
            <Logout onClick={handleLogout} />
        </div>
    </div>
    <Dialog
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Обратная связь"}
          </DialogTitle>
          <DialogContent>
          <div className="products__head">
                <div className='products__head_group'>
                    <h3>Оставьте отзыв!</h3>
                    <img src={image} />
                </div>
                <span>Помогите нам улучшить приложение! Как мы можем это сделать?</span>
            </div>
          </DialogContent>
          <DialogActions>
            <Button><a style={{color: '#fff'}} href="tel:+77477084946">Связаться с нами</a></Button>
            <Button white><a href="mailto:sioma.aslan@gmail.com">Отправить письмо</a></Button>
          </DialogActions>
        </Dialog>
    </>
  )
}
