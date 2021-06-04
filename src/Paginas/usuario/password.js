import React,{useState,useEffect} from 'react'
import UserNav from '../../Componente/Nav/UserNav'
import {auth} from '../../firebase';
import {toast} from 'react-toastify'

const Password = () =>{
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);

const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true)
  await auth.currentUser.updatePassword(password)
  .then(() => {
      setLoading(false)
      setPassword("")
      toast.success('senha atualizada')
  })
  .catch(err => {
      toast.error(err.message)
      setLoading(false)
  })
}
const passwordUpdate = () =>
    <form onSubmit={handleSubmit}>
<div className= "form=group">
    <label>Sua Senha</label>
    <input type= "password" onChange={e => setPassword(e.target.value) }className="form-control"
    placeHolder= "digite a nova senha:" 
    disabled={loading}
    value={password}/>
    <button className="bttn btn-primary" disabled = {!password || loading ||password.length < 6}>Submit</button>
</div>
    </form>

return (
    <div className ="container-fluid">
        <div className="row">
            <div className ="col-md-2">
                <UserNav />
            </div>

            <div className= "col">{loading ?<h4 className= "text-danger">Carregando...</h4> : <h4>Atualização de Senha</h4>}{passwordUpdate()}</div>
        </div>
    </div>
)
}
export default Password;