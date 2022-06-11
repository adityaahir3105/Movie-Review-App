import React from 'react'
import { Col, Row,Typography,Statistic} from 'antd';
import {CalendarOutlined,StarOutlined,PlayCircleOutlined,RiseOutlined } from '@ant-design/icons';
// import Title from 'antd/lib/skeleton/Title';

const {Text, Title } = Typography;
function MovieInfo(props) {

    const { movie } = props;
    var hours = Math.floor(movie.runtime / 60);          
    var minutes = movie.runtime % 60;
  
    return (
      <>
      
      <Title style={{color:"white"}}>Movie Info</Title>
      <Row gutter={20}>
      <Col span={10}>
      <Text strong style={{color:"white"}}>Title : {movie.original_title}</Text>
      </Col>
      <Col style={{marginTop:"20px"}} span={20}>
      <Text style={{color:"white"}} strong>Overview:  </Text>
      <Text style={{color:"white"}} strong>{movie.overview}</Text>
      </Col>
      <Col style={{marginTop:"20px"}} span={10}>
      <Text style={{color:"white",marginRight:"5px"} } strong>Release Date</Text>
      <Statistic valueStyle={{color:"white"}} value={movie.release_date} prefix={<CalendarOutlined />} />
      </Col>
      <Col style={{marginTop:"20px"}} span={10}>
      <Text style={{color:"white"}} strong> Revenue</Text>
      <Statistic valueStyle={{color:"white"}} value={movie.revenue} prefix={<RiseOutlined />} />
      </Col>
      <Col style={{marginTop:"20px"}} span={10}>
      <Text style={{color:"white"}} strong>Run Time</Text>
      <Statistic valueStyle={{color:"white"}} value={hours+"h"+minutes+"m"} prefix={<PlayCircleOutlined />}></Statistic>
      </Col>
      <Col style={{marginTop:"20px"}} span={10}>
      <Text style={{color:"white"}} strong>Imdb Rating</Text>
      <Statistic valueStyle={{color:"white"}} value={movie.vote_average} prefix={<StarOutlined />}></Statistic>
      </Col>
      
      </Row>
      </>
    )
}

export default MovieInfo
