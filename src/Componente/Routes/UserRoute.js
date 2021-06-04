import React from 'react'
import {Route,Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Loading from "./Cd"

const UserRoute = ({children, ...rest}) => {
   const {user} = useSelector((state)=> ({...state}));

   return user && user.token ? (<Route {...rest} />) : (<Loading />)
};

export default UserRoute;