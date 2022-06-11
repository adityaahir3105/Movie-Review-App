import React from 'react';
import { Menu } from 'antd';
import {NavLink} from 'react-router-dom'
import "./LeftMenu.css";

function LeftMenu(props) {

  return (
    <Menu style={{backgroundColor:"#39445a"}} mode={props.mode}>
      <Menu.Item  key="favorite">
        <NavLink style={{color:"white"}} activeClassName="isActive" to="/favorite">Favorite</NavLink>
      </Menu.Item> 
      <Menu.Item key="Latest Movie">
        <NavLink exact style={{color:"white"}} activeClassName="isActive" to="/">Latest Movies</NavLink>
      </Menu.Item>
      <Menu.Item key="Movies">
        <NavLink exact style={{color:"white"}} activeClassName="isActive" to="/movies">Movies</NavLink>
      </Menu.Item>
      <Menu.Item key="Search">
        <NavLink style={{color:"white"}} activeClassName="isActive" to="/search">Search</NavLink>
      </Menu.Item>    
    </Menu>
  )
}

export default LeftMenu