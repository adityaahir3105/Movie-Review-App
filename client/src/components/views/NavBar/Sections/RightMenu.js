/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
// import { Switch } from 'antd';
// const Upload = require('../../../../assets/images/upload.png');

function RightMenu(props) {
  const user = useSelector(state => state.user)
  // const [theme, settheme] = useState("white")
  // const [themetext, setthemetext] = useState("Dark") 
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };
  // const onChange = () => {

  //   if(theme==="white"){
  //     settheme("#111d2c");
  //     setthemetext("Light");
  //     localStorage.setItem("themetext", "Light");
  //     localStorage.setItem("theme", "#111d2c");
      
  //   }
  //   else{
  //     settheme("white");
  //     setthemetext("Dark");
  //     localStorage.setItem("themetext", "Dark");  
  //     localStorage.setItem("theme", "white");
  //   }
  // };
  if (user.userData && !user.userData.isAuth) {
    return (
      
      <Menu style={{backgroundColor:"#39445a"}} mode={props.mode}>
  
        <Menu.Item key="mail">
          <Link style={{color:"white"}} to="/login">Signin</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link style={{color:"white"}} to="/register">Signup</Link>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu  mode={props.mode}>
        {/* <Menu.Item key="theme">
        <Switch onClick={onChange}>SetTheme</Switch>
        </Menu.Item> */}
        <Menu.Item key="logout" style={{backgroundColor:"#39445a"}}>
          <a style={{color:"white"}} onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

