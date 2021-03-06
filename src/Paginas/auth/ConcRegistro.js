import react, {useState,useEffect} from 'react'
import {auth} from '../../firebase'
import {toast} from 'react-toastify'
import {useDispatch,useSelector} from 'react-redux'
import {createOrUpdateUser} from "../../Funcoes/auth"


const ConcRegistro = ({history}) => {
const [password,setPassword] = useState("");
const [email,setEmail] = useState("");
const {user} = useSelector((state)=> ({...state}));
let dispatch= useDispatch()

useEffect(()=>{setEmail(window.localStorage.getItem("emailRegistro"))},[])
const handleSubmit = async (e) => {
 e.preventDefault()
 if (!email || !password){
     toast.error('Email e senha são necessarios!')
     return;
 }
 if(password.length <6){
     toast.error("a senha precisa conter ao menos 6 caracteres")
    return;
    }
 try{
const result = await auth.signInWithEmailLink(email,window.location.href)
if (result.user.emailVerified){
    window.localStorage.removeItem('emailRegistro');
    let user= auth.currentUser
    await user.updatePassword(password);
    const idTokenResult = await user.getIdTokenResult()
    toast.info("Registro Concluido!")
    createOrUpdateUser(idTokenResult.token)
    .then ( res =>  dispatch({
       type:'LOGGED_IN_USER',
       payload:{
         name: res.data.name,
         email: res.data.email,
         token: idTokenResult.token,
         role: res.data.role,
         id: res.data._id
       }
   
    })
   )
    .catch()
   
   
    history.push('/')
   }  
}

 catch(error){
     console.log(error);
     toast.error(error.message)
 }
} ;
const concregistroForm = () => (
<form onSubmit={handleSubmit}>Formulario Registro
<input type="email" className="form-control" value = {email} disabled autoFocus></input>
<input type="password" className="form-control" value = {password} onChange={(e) => setPassword(e.target.value)} autoFocus placeholder="Senha"></input>

<button type ="submit" className="btn btn-raised">Registrar</button>
</form>
)
return (
        <div className="container p-5">
           <div className="row">
               <div className=".col-md-6.offset-md-3">
                   <h4>Conclusão de registro</h4> 
                   {concregistroForm()}
               </div>
           </div>
        </div>
     );
     






    }

    export default ConcRegistro;