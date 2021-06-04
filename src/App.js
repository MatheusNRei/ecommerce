import React,{useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login    from './Paginas/auth/Login'
import Registro from './Paginas/auth/Registro'
import Homepage from './Paginas/Homepage'
import Header from './Componente/Nav/Header'
import ConcRegistro from './Paginas/auth/ConcRegistro'
import {auth} from  './firebase'
import {useDispatch} from 'react-redux'
import ForgotPassword from './Paginas/auth/ForgotPassword'
import {currentUser} from './Funcoes/auth';
import History from './Paginas/usuario/History'
import Password from './Paginas/usuario/password'
import Wishlist from './Paginas/usuario/wishlist'
import UserRoute from './Componente/Routes/UserRoute'
import AdminRoute from './Componente/Routes/AdminRoute'
import AdminDashboard from './Paginas/Admin/AdminDashboard'
import AdminCatC from './Paginas/Admin/Categorias/AdminCatC'
import AdminCatU from './Paginas/Admin/Categorias/AdminCatU'
import AdminCatC from './Paginas/Admin/SubCat/SubCatC'
const App = () => {
 const dispatch= useDispatch()
 
 useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user)=> {
    if (user) {
      const idTokenResult = await user.getIdTokenResult()
      
      currentUser(idTokenResult.token)
      .then ( (res) => { dispatch({
         type:'LOGGED_IN_USER',
         payload:{
           name: res.data.name,
           email: res.data.email,
           token: idTokenResult.token,
           role: res.data.role,
           id: res.data._id
         }
     
      })
    })
      .catch(err => console.log(err))
    }
  })
  return ()=> unsubscribe();
 },[])
  
  return (

 <>        
 <Header />
 <ToastContainer />
 <Switch>
   <Route exact path ="/" component={Homepage} />
   <Route exact path ="/Login" component={Login} />
   <Route exact path ="/Registro" component={Registro} />
   <Route exact path ="/ConcRegistro" component={ConcRegistro} />
   <Route exact path ="/forgot/password" component={ForgotPassword} />
   <UserRoute exact path ="/usuario/history" component={History} />
   <UserRoute exact path ="/usuario/password" component={Password} />
   <UserRoute exact path ="/usuario/wishlist" component={Wishlist} />
   <AdminRoute exact path ="/admin/dashboard" component={AdminDashboard} />
   <AdminRoute exact path ="/admin/categorias/" component={AdminCatC} />
   <AdminRoute exact path ="/admin/categorias/:slug" component={CatUpdate} />
   <AdminRoute exact path ="/admin/SubCat/" component={SubCatC} />
 </Switch></>
     )
}
  

export default App;
