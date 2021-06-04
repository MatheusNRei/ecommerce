import React, {useState} from 'react'
import { Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, DashboardOutlined,LoginOutlined,UserAddOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import firebase from 'firebase'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
const { SubMenu, Item } = Menu;

const Header = () => {
 const [current, setCurrent ] = useState("Homepage")
let dispatch= useDispatch()
let {user}= useSelector((state) => ({...state}));
let history = useHistory()
    const handleClick = (e) => {
      setCurrent(e.key);
    };
    const logout = () => {
      firebase.auth().signOut()
      dispatch({
        type:'LOGOUT',
        payload: null,
      });
      history.push('/login');
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Item key="Homepage" icon={<HomeOutlined />}>
            <link to = "/Homepage"></link>Homepage
          </Item>
          {!user && (
            <Item key="Registro" icon={<UserAddOutlined />} className= "float-right">
            <Link to ="/Registro"></Link>Registro
          </Item>
          )}
         {!user && ( <Item key="Login" icon={<LoginOutlined />} className= "float-right">
           <Link to ="/Login"></Link> Login
          </Item>)}

         {user &&( <SubMenu key="SubMenu" icon={<DashboardOutlined /> } title={user.email && user.email.split('@') [0]} className = 'float-Right'>
              
              {user && user.role === 'subscriber'}
              <Item >
                <Link to= "/usuario/history "/>Dashboard
              </Item>

              {user && user.role === 'admin'}
              <Item >
                <Link to= "/admin/dashboard "/>Dashboard
              </Item>
              
              <Item  icon ={<UserOutlined/>} onClick={logout}>logout </Item>
          </SubMenu>)}
        </Menu>
      );
    }
  

export default Header;