import React, {useState, useEffect} from 'react'
import AdminNav from '../../../Componente/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createSubCat,getSubCatList,deleteSubCat} from '../../../Funcoes/cat'
import {Link} from "react-router-dom";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'


const SubCatC = () =>{
    const {user} =useSelector(state => ({...state}));
    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
    const [categorias,setCategorias] = useState= ({})

    useEffect (() => {
        loadCat();
    },[]);

    const loadCat = () => getSubCatList().then(c => setCategorias(c.data));
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        createSubCat({name},user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}"foi criado`);
            
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if (err.response.status === 400)
            toast.error(err.res.data);
        })
    }
    const handleDelete = async(slug) =>{
       if(window.confirm("deletar sub categoria?")) {
        setLoading(true)   
        deleteSubCat(slug,user.token)
        .then(res =>{
            setLoading(false);
            toast.error(`${res.data.name} deletada`);

        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if (err.response.status === 400)
            toast.error(err.res.data);
       })
    }
}
    const categoryForm = () =>( <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label>Name</label>
    <input type = "text" className = "form-control" onChange = {e => setName(e.target.value)} value= {name} autoFocus required/>
    <button className="btn btn-outline-primary">Salvar</button>
    </div>
    </form>
    )
    return (
    <div className ="container-fluid">
        <div className="row">
            <div className ="col-md-2">
                <AdminNav />
            </div>

            <div className= "col">{loading? (<h4 className="text-danger">Carregando...</h4>) : (<h4>cat C</h4>)}
            {categoryForm()}
            <hr />
            {categorias.map((c)=>(<div className = "alert alert-secondary" key={c._id}> {c.name} <span onClick={()=> handleDelete(c.slug)} className = "btn btn-sm float-right"><DeleteOutlined className = "text-danger"/></span> <Link to ={`/admin/categorias/${c.slug}`}><span className = "btn btn-sm float-right"><EditOutlined className = "text-warning"/></span></Link> </div>))}
            </div>
        </div>
    </div>
)
}
export default SubCatC;