import React from 'react'
import {Link} from 'react-router-dom'

const AdminNav = () => (
    <nav>
       <ul className="nav flex-column">
        <li className="nav-item">
            <Link to = "/admin/Dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
            <Link to = "/admin/Produto" className="nav-link">Produto</Link>
        </li>
        <li className="nav-item">
            <Link to = "/admin/Produtos" className="nav-link">Produtos</Link>
        </li>
        <li className="nav-item">
            <Link to = "/admin/Categoria" className="nav-link">Categoria</Link>
        </li>
        <li className="nav-item">
            <Link to = "/admin/SubCat" className="nav-link">Sub-Categoria</Link>
        </li>
        <li className="nav-item">
            <Link to = "/admin/Coupons" className="nav-link">Coupons</Link>
        </li>
        <li className="nav-item">
            <Link to = "/user/Password" className="nav-link">Password</Link>
        </li>
        
       </ul> 
    </nav>
)

export default AdminNav;