import React,{useState} from 'react'
import {  Col} from 'antd';
import { IMAGE_BASE_URL } from '../Config';
import { Link } from 'react-router-dom';
import { Button } from 'antd';


function GridCards(props) {

    let { actor,actorinfo, key, image, movieId, movieName, characterName, characterId } = props
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
      };
    
      const handleMouseOut = () => {
        setIsHovering(false);
      };

    const POSTER_SIZE = "w154";
    
    if (actor) {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <Link to={`/movie/${movieId}/${characterId}`} >
                    <img style={{ width: '100%', height: '320px' }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
                    </Link>
                </div>
            </Col>
        )
    }
    else if(actorinfo){
        return(
        <div style={{display:'flex' ,justifyContent:'center'}} key={key} >
                <div style={{position: 'relative' }}>
                        <img style={{ width: '100%', height: '320px' }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
                </div>
        </div>
        )
    }
     else {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <Link to={`/movie/${movieId}`}>
                        <img style={{width: '80%', height: '320px'}} alt={movieName} src={image} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}></img>
                </Link>
            </Col>
            
        )
    }

}

export default GridCards
