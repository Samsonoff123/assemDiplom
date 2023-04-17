import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './App.scss';
import Login from './components/page/Login';
import PageRouter from './components/PageRouter';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      error => {
        const e = error
        e.message = error.response.statusText;
        toast.error("Сеансыңыздың мерзімі аяқталды", {
          position: "top-center",
          autoClose: 1000,
        });
  
        if (error.response.status === 401) {
          localStorage.removeItem('token')
          document.location.reload();
        }
        throw error
      }
    )
  }, [])



  function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true)
    }
  }, [])

  useEffect(() => {
    if (isAuth) {
      if (parseJwt(localStorage.getItem('token')).role === 'ADMIN') {
        setIsAdmin(true)
      }
    }
  }, [isAuth])
  

  if (!isAuth) {
    return (
      <Login setIsAuth={setIsAuth} />
    )
  }

  return (
    <div>
      <PageRouter isAdmin={isAdmin} />
      <ToastContainer />
    </div>
  );
}

export default App;
