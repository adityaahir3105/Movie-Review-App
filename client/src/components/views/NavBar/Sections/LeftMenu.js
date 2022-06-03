import React from 'react';
import { Menu } from 'antd';


function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="favorite">
        <a href="/favorite">Favorite</a>
      </Menu.Item>
      <Menu.Item key="Popular Movie">
        <a href="/">Popular Movie</a>
      </Menu.Item>
      <Menu.Item key="Top Movie">
        <a href="/toprate">Top Movies</a>
      </Menu.Item>
      <Menu.Item key="Up Coming">
        <a href="/upcoming">Latest Movies</a>
      </Menu.Item>
      <Menu.Item key="Search">
        <a href="/search">Search</a>
      </Menu.Item>    
    </Menu>
  )
}

export default LeftMenu