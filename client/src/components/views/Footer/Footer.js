import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem',backgroundColor:"#2d313a"
        }}>
           <p style={{color:"white"}}> Crated By: Aditya Ahir <Icon type="smile" /></p>
        </div>
    )
}

export default Footer
