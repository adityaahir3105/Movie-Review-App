import React from 'react'
import {  Col} from 'antd';
import { IMAGE_BASE_URL } from '../Config';

function GridCards(props) {
    
    let { actor,actorinfo, key, image, movieId, movieName, characterName, characterId } = props
    const POSTER_SIZE = "w154";

    if (actor) {
        return (
            <Col key={key} lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${movieId}/${characterId}`} >
                    <img style={{ width: '100%', height: '320px' }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
                    </a>
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
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${movieId}`} >
                        <img style={{ width: '100%', height: '320px' }} alt={movieName} src={image} />
                    </a>
                </div>
            </Col>
        )
    }

}

export default GridCards
