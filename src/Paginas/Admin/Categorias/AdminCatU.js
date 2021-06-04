import React, {useState, useEffect} from 'react'
import AdminNav from '../../../Componente/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCat,getCat,updateCat} from '../../../Funcoes/cat'
import CatForm from '../../../Componente/Forms/CatForm'


const CatUpdate = ({history, match}) =>{
    const {user} =useSelector(state => ({...state}));
    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
    

    useEffect (() => {
        loadCat();
    },[]);

    const loadCat = () => getCat(match.params.slug).then((c) => setName(c.data.name));
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        updateCat(match.params.slug,{name},user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}"foi atualizado`);
            history.push('/admin/categorias');
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if (err.response.status === 400)
            toast.error(err.res.data);
        })
    }
  
    return (
    <div className ="container-fluid">
        <div className="row">
            <div className ="col-md-2">
                <AdminNav />
            </div>
            <div className= "col">{loading? (<h4 className="text-danger">Carregando...</h4>) : (<h4>cat U</h4>)}
            <CatForm handleSubmit={handleSubmit} name = {name} setName={setName} />

            <hr />
             </div>
        </div>
    </div>
)
}
export default CatUpdate;