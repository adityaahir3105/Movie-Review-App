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
    },[])
    const fetchDetailofPerson=(endpoint)=>{
        fetch(endpoint)
            .then(result=>result.json())
            .then(result=>{
                setPerson(result)
                // console.log(result)
            })
    }
    // const POSTER_SIZE = "w100";
    return(
        <>
        <GridCards actorinfo image={person.profile_path}></GridCards>
        {/* <img style={{ width: '100%', height: '320px' }}  src={`${IMAGE_BASE_URL}${POSTER_SIZE}${person.profile_path}`}/>  */}
        <h1 >Name: {person.name}</h1>
        <div>

        </div>
        <Descriptions bordered>
        {/* <Descriptions.Item label="Name" span={1}>{person.name}</Descriptions.Item> */}
        <Descriptions.Item label="BirthDate">{person.birthday}</Descriptions.Item>
        <Descriptions.Item label="Birth Place" >{person.place_of_birth}</Descriptions.Item>
        <Descriptions.Item label="Known For" >{person.known_for_department} </Descriptions.Item>
        <Descriptions.Item label="Biography" span={4}>
            {person.biography}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Instagarm" span={2}>{person.homepage}</Descriptions.Item> */}
        {
        person.homepage?
        <Descriptions.Item label="Instagarm" href={`person.homepage`}>{person.homepage}</Descriptions.Item> :
        null
        }
        </Descriptions>
        </>
    )
}

export default PersonDetailPage