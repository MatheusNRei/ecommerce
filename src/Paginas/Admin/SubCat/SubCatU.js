import React, {useState, useEffect} from 'react'
import AdminNav from '../../../Componente/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {getSubCat,updateSubCat} from '../../../Funcoes/SubCat'
import CatForm from '../../../Componente/Forms/CatForm'


const SubCatU = ({match,history}) =>{
    const {user} =useSelector(state => ({...state}));
    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
    const [categorias,setCategorias] = useState= ({})
    const [parent,setParent] = useState('');

    useEffect (() => {
        loadCat();
        loadSubCat();
    },[]);

    const loadCat = () => getCatList().then(c => setCategorias(c.data));
    const loadSubCat = () => getSubCat(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        updateSubCat(match.params.slug,{name, parent},user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}"foi atualizado`);
            history.push('/admin/SubCat')
            
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

            <div className= "col">{loading? (<h4 className="text-danger">Carregando...</h4>) : (<h4>subCat U</h4>)}
            <div className = "form-group"><label>Cat</label>
            <select name ="categoria" className= "form-control" onChange={e => setParent(e.target.value)}>
                <option>Selecionar...</option>
            {categorias.length > 0 && categorias.map((c) => (<option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>))}
            </select>
            </div>
            <CatForm handleSubmit={handleSubmit} name = {name} setName={setName} />
            
            <hr />
             </div>
        </div>
    </div>
)
}
export default SubCatU;