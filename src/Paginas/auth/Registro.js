import react, {useState,useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'


const Registro = ({history}) => {
const [email,setEmail] = useState("")
const {user} = useSelector((state)=> ({...state}));

useEffect(() => {
    if(user&&user.token) history.push("/")
},[user]);
const handleSubmit = async (e) => {
 e.preventDefault()
 console.log("ENV ===>",process.env.REACT_APP_REGISTER_REDIRECT_URL);
 const config =  {
     url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
     handleCodeInApp: true,
 }

await auth.sendSignInLinkToEmail(email, config);
toast.success(`email enviado para ${email}. clique no link para completar o seu registro.`)
window.localStorage.setItem('emailRegistro', email)
setEmail("");
}     
const registroForm = () => (
<form onSubmit={handleSubmit}>Formulario Registro
<input type="email" className="form-control" value = {email} onChange= {e => setEmail(e.target.value)} autoFocus placeholder = "seu email"></input>
<br />
<button type ="submit" className="btn btn-raised">Registrar</button>
</form>
)
return (
        <div className="container p-5">
           <div className="row">
               <div className=".col-md-6.offset-md-3">
                   <h4>registro</h4> 
                   {registroForm()}
               </div>
           </div>
        </div>
     );
     }





export default Registro;