import React, {useState, useEffect} from 'react'
import AdminNav from '../../../Componente/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {createCat,getCatList,deleteCat} from '../../../Funcoes/cat'
import {Link} from "react-router-dom";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import CatForm from '../../../Componente/Forms/CatForm'


const AdminCatC = () =>{
    const {user} =useSelector(state => ({...state}));
    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
    const [categorias,setCategorias] = useState= ({})
    const [keyword, setKeyword] = useState = ("");

    useEffect (() => {
        loadCat();
    },[]);

    const loadCat = () => getCatList().then(c => setCategorias(c.data));
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        createCat({name},user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}"foi criado`);
            loadCat();
        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if (err.response.status === 400)
            toast.error(err.res.data);
        })
    }
    const handleDelete = async(slug) =>{
       if(window.confirm("deletar categoria?")) {
        setLoading(true)   
        deleteCat(slug,user.token)
        .then(res =>{
            setLoading(false);
            toast.error(`${res.data.name} deletada`);
            loadCat();

        })
        .catch(err => {
            console.log(err)
            setLoading(false)
            if (err.response.status === 400)
            toast.error(err.res.data);
       })
    }
}
const handleSearchChange= (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
}

const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    return (
    <div className ="container-fluid">
        <div className="row">
            <div className ="col-md-2">
                <AdminNav />
            </div>

            <div className= "col">{loading? (<h4 className="text-danger">Carregando...</h4>) : (<h4>cat C</h4>)}
            <CatForm handleSubmit={handleSubmit} name = {name} setName={setName} />
            <input type= "search" placeholder= "search" value= {keyword} onChange = {handleSearchChange} className="form-control mb-4" />
            <hr />
            {categorias.map((c)=>(<div className = "alert alert-secondary" key={c._id}> {c.name} <span onClick={()=> handleDelete(c.slug)} className = "btn btn-sm float-right"><DeleteOutlined className = "text-danger"/></span> <Link to ={`/admin/categorias/${c.slug}`}><span className = "btn btn-sm float-right"><EditOutlined className = "text-warning"/></span></Link> </div>))}
            </div>
        </div>
    </div>
)
}
export default AdminCatC;