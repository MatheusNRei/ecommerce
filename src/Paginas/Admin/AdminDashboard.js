import React from 'react'
import AdminNav from '../../Componente/Nav/AdminNav'

const AdminDashboard = () =>(

    <div className ="container-fluid">
        <div className="row">
            <div className ="col-md-2">
                <AdminNav />
            </div>

            <div className= "col">Dashboard Admin</div>
        </div>
    </div>
)
export default AdminDashboard;