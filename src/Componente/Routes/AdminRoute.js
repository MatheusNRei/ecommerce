import React,{useEffect,useState} from 'react'
import {Route,Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Loading from "./Cd"
import {currentAdmin} from '../../Funcoes/auth'


const AdminRoute = ({children, ...rest}) => {
   const {user} = useSelector((state)=> ({...state}));
   const [ok,setOk] = useState(false);
   useEffect(() =>{
      if(user && user.token) {
         currentAdmin(user.token)
         .then(res => {
            console.log("admin res",res)
            setOk(true);
         })
         .catch(err => {
            console.log(err)
            setOk(false);
         })
      }
   })
   return ok ? (<Route {...rest}/>) : (<Loading />)
};

export default AdminRoute;