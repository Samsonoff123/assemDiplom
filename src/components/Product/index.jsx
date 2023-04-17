import { Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ReactComponent as Cart } from '../../assets/cart.svg'
import { ReactComponent as Like } from '../../assets/like.svg'
import { useActions } from '../../hooks/useActions';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../../components/Button'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom';

export default function Product({product}) {
    const { addToCart, removeCart, addToLike, removeLike } = useActions()
    const [open, setOpen] = useState();
    const [isAdmin, setIsAdmin] = useState(false);

    const { cart, like } = useSelector(state => state)

    const isExistInCart = cart.some(p => p.id === product.id)
    const isExistInLike = like.some(p => p.id === product.id)

    const handleCart = (e) => {
      e.preventDefault();
      if (!isExistInCart) {
        addToCart(product)
      } else {
        removeCart(product)
      }
    }

    const handleLike = (e) => {
      e.preventDefault();
      if (!isExistInLike) {
        addToLike(product)
      } else {
        removeLike(product)
      }
    }

    const handleRemove = (id) => {
      axios.delete(`https://asem-backend.vercel.app/api/product/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(() => {
        document.location.reload()
      }).catch(() => {
        toast.error("Тауар жойылған жоқ!", {
          position: "top-center",
          autoClose: 1000,
        });
      })
      setOpen(false)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
       if (JSON.parse(jsonPayload).role === 'ADMIN') {
        setIsAdmin(true)
       }
    }, [])
    

  return (
    <div className='product__element' key={product.id}>
        { isAdmin && <DeleteOutlineIcon className='removeButton' onClick={()=>setOpen(true)} /> }
        <Link to={`/product/${product.id}`}>
        <img src={product.img} alt="productImg" />
        <span className='price'>{product.price} KZT</span>
        <div className='product__info'>
            <div className="product__title">{product.name}</div>
            <div className="product__description">{product.shortDescription.text}</div>
            <Rating style={{marginTop: 'auto'}} name="half-rating" precision={0.5} defaultValue={product.rating} readOnly />
            <div className='icons'>
                <Cart className={isExistInCart && 'cart__active'} onClick={(e)=>handleCart(e)} />
                <Like className={isExistInLike && 'cart__active'} onClick={(e)=>handleLike(e)} />
            </div>
        </div>
        </Link>
        <Dialog
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Remove modal"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              "{product.name}" жойғыңыз келетініне сенімдісіз бе?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button white onClick={()=>setOpen(false)}>Жоқ</Button>
            <Button onClick={()=>handleRemove(product.id)} autoFocus>
              Иә
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
    </div>
    
  )
}