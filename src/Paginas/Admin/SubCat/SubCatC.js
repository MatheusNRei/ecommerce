import React, {useState, useEffect} from 'react'
import AdminNav from '../../../Componente/Nav/AdminNav'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'
import {CatList} from '../../../Funcoes/cat'
import {CreateSubCat,getSubCatList,deleteSubCat,getSubCat} from '../../../Funcoes/SubCat'
import {Link} from "react-router-dom";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import CatForm from '../../../Componente/Forms/CatForm'
import SearchForm from '../../../Componente/Forms/SearchForm'


const SubCatC = () =>{
    const {user} =useSelector(state => ({...state}));
    const [name,setName] = useState('');
    const [parent,setParent] = useState([]);
    const [loading,setLoading] = useState(false);
    const [categorias,setCategorias] = useState= ({})
    const [Subcategorias,setSubCategorias] = useState= ({})
    const [categoria,setCategoria] = useState("");
    const [keyword, setKeyword] = useState = ("");

    useEffect (() => {
        loadCat();
        loadSubCat();
    },[]);

    const loadCat = () => getCatList().then((c) => setCategorias(c.data));
    const loadSubCat = () => getSubCatList().then((s) => setSubCategorias(s.data));
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        createSubCat({name, parent: categoria},user.token)
        .then(res => {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}"foi criado`);
            loadSubCat();
            
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



const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    return (
    <div className ="container-fluid">
        <div className="row">
            <div className ="col-md-2">
                <AdminNav />
            </div>

            <div className= "col">{loading? (<h4 className="text-danger">Carregando...</h4>) : (<h4>subCat C</h4>)}
            <div className = "form-group"><label>Cat</label>
            <select name ="categoria" className= "form-control" onChange={e => setCategoria(e.target.value)}>
                <option>Selecionar...</option>
            {categorias.length > 0 && categorias.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))}
            </select>
            </div>
            <CatForm handleSubmit={handleSubmit} name = {name} setName={setName} />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            <hr />
            {Subcategorias.filter(searched(keyword)).map((s)=>(<div className = "alert alert-secondary" key={s._id}> {c.name} <span onClick={()=> handleDelete(s.slug)} className = "btn btn-sm float-right"><DeleteOutlined className = "text-danger"/></span> <Link to ={`/admin/SubCat/${s.slug}`}><span className = "btn btn-sm float-right"><EditOutlined className = "text-warning"/></span></Link> </div>))}
            </div>
        </div>
    </div>
)
}
export default SubCatC;