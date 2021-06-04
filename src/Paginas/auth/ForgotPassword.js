import react, {useState,useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const ForgotPassword = ({history}) =>{
const[email,setEmail] = useState("")
const[loading,setLoading] = useState("")
const {user} = useSelector((state)=> ({...state}));

useEffect(() => {
    if(user&&user.token) history.push("/")
},[user]);
const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true)
const config =  {
    url: process.env.REACT_APP_FORGOT_PASSWORD_URL,
    handleCodeInApp: true,
}

await auth.sendPasswordResetEmail(email,config)
.then(() => {
 setEmail('');
 setLoading(false);
 toast.success('Link de reset de senha enviado para o seu email')
})
.catch((error) =>{
setLoading(false);
console.log(error)
toast.error(error.message)
})

}
return (
<div className = "container cold-md-6 offset-md-3 p-5"> {loading ?<h4 className= "text-danger"> Carregando...</h4> : <h4 className= "text-danger">formulario de redefinição de senha</h4> }
<form onSubmit={handleSubmit}>
    <input type="email" className="form-control" value={email} onChange= {(e) => setEmail(e.target.value)} placeholder="Digite seu Email" autoFocus ></input>
<br />
<button className="btn btn-raised" disabled ={!email} >Enviar</button>

</form>
</div>
)}
export default ForgotPassword;