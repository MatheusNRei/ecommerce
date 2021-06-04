import react, {useState,useEffect} from 'react'
import {auth, googleAuthProvider} from '../../firebase'
import {toast} from 'react-toastify'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import {createOrUpdateUser} from "../../Funcoes/auth"



const Login = ({history}) => {
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading,setLoading] = useState(false)
const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin'){
        history.push("/admin/dashboard");
    }else{
        history.push("/usuario/History")
    }
}
let dispatch= useDispatch()
const {user} = useSelector((state)=> ({...state}));

useEffect(() => {
    if(user&&user.token) history.push("/")
},[user]);
const handleSubmit = async (e) => {
 e.preventDefault()
setLoading (true)
 try{
     
 const result=await auth.signInWithEmailAndPassword(email,password)
 const {user} = result
 const idTokenResult = await user.getIdTokenResult();
 createOrUpdateUser(idTokenResult.token)
 .then ( (res) =>  {
     dispatch({
    type:'LOGGED_IN_USER',
    payload:{
      name: res.data.name,
      email: res.data.email,
      token: idTokenResult.token,
      role: res.data.role,
      id: res.data._id
      
    },
 })
 roleBasedRedirect(res);
 });
 




}
 catch (error){
console.log(error)
toast.error(error.message)
setLoading(false)
 }
 console.log("ENV ===>",process.env.REACT_APP_REGISTER_REDIRECT_URL);
 const config =  {
     url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
     handleCodeInApp: true,
 }
}
const handleGLogin = async () => {
 auth.signInWithPopup(googleAuthProvider)
 .then(async (result) =>{
     const {user} = result
     const idTokenResult = await user.getIdTokenResult()
     createOrUpdateUser(idTokenResult.token)
     .then ( (res) =>  {
         dispatch({
        type:'LOGGED_IN_USER',
        payload:{
          name: res.data.name,
          email: res.data.email,
          token: idTokenResult.token,
          role: res.data.role,
          id: res.data._id
        }
    
     })
     roleBasedRedirect(res);
     })
    
 })
}

     
const loginForm = () => (
<form onSubmit={handleSubmit}>Area de Login
<input type="email" className="form-control" value = {email} onChange= {e => setEmail(e.target.value)}  placeholder = "seu email"></input>
<input type="password" className="form-control" value = {password} onChange= {e => setPassword(e.target.value)}  placeholder = "sua senha"></input>


<br />
<button onClick = {handleSubmit} type ="submit" className="btn btn-raised" disabled={!email || password.length < 6}>Logar</button>
</form>
)
return (
        <div className="container p-5">
           <div className="row">
               <div className=".col-md-6.offset-md-3">
                   {loading ? <h4>Carregando...</h4> : <h4>login</h4>} 
                   {loginForm()}

                   <button onClick = {handleGLogin} type ="danger" className="btn btn-raised" >Logar com google</button>
                   
                   <div><Link to ="/forgot/password"className= "float-left text-danger" >Esqueci minha senha</Link>
    </div>
               </div>
           </div>
        </div>
     );
     }





export default Login;