import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY} from '../../Config'
import GridCards from '../../commons/GridCards';
import { Descriptions} from 'antd';

function PersonDetailPage(props) {
    const personId = props.match.params.characterId;
    const[person,setPerson] = useState([])
    useEffect(()=>{
        let personDetail=`${API_URL}person/${personId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailofPerson(personDetail)
    },[personId])
    const fetchDetailofPerson=(endpoint)=>{
        fetch(endpoint)
            .then(result=>result.json())
            .then(result=>{
                setPerson(result)
                // console.log(result)
            })
    }
    return(
        <>
        <GridCards actorinfo image={person.profile_path}></GridCards>
    
        <h1 style={{color:"white"}}>Name: {person.name}</h1>
        <div>

        </div>
        <Descriptions bordered>
        <Descriptions.Item label="BirthDate"><div style={{color:"white"}}>{person.birthday}</div></Descriptions.Item>
        <Descriptions.Item label="Birth Place" ><div style={{color:"white"}}>{person.place_of_birth}</div></Descriptions.Item>
        <Descriptions.Item label="Known For" ><div style={{color:"white"}}>{person.known_for_department} </div></Descriptions.Item>
        <Descriptions.Item contentStyle={{backgroundColor:"#39445a"}} label="Biography" span={4}>
            <div style={{color:"white"}}>{person.biography}</div>
        </Descriptions.Item>
        {
        person.homepage?
        <Descriptions.Item label="Instagarm" href={`person.homepage`}><a href={person.homepage} style={{color:"white"}}>{person.homepage}</a></Descriptions.Item> :
        null
        }
        </Descriptions>
        </>
    )
}

export default PersonDetailPage