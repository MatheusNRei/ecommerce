import React from 'react'
import {Link} from 'react-router-dom'

const UserNav = () => (
    <nav>
       <ul className="nav flex-column">
        <li className="nav-item">
            <Link to = "/usuario/History" className="nav-link">History</Link>
        </li>
        <li className="nav-item">
            <Link to = "/usuario/Password" className="nav-link">Password</Link>
        </li>
        <li className="nav-item">
            <Link to = "/usuario/Wishlist" className="nav-link">Wishlist</Link>
        </li>
           
       </ul> 
    </nav>
)

export default UserNav