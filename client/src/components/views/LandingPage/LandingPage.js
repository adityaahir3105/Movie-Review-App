import React, { useEffect, useState, useRef } from 'react'
import { Typography} from 'antd';
import { API_URL, API_KEY} from '../../Config'
import SingleContent from "../SingleContent/SingleContent"
import "./Trending.css";
import Carousel from "../HeaderCorousel/HeaderCarousel"


const { Title } = Typography;
function Landing() {
    const buttonRef = useRef(null);

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [Loading, setLoading] = useState(true)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    },
    // eslint-disable-next-line 
    [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, 
    // eslint-disable-next-line
    [])


    const fetchMovies = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json() ) 
            .then(result => {
                setMovies([...Movies, ...result.results])
                setMainMovieImage(MainMovieImage || result.results[0])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

    const loadMoreItems = () => {
        let endpoint = '';
        setLoading(true)
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);

    }

    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {
            buttonRef.current.click();

        }
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            <Carousel/>
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title style={{color:"white"}} level={2} > Latest Movies </Title>
                <hr />
                <div className="trending">
                    {Movies &&
                        Movies.map((c) => (
                        <SingleContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        vote_average={c.vote_average}
                        />
                        ))}
                </div>
                {Loading &&
                    <div>Loading...</div>}

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={{backgroundColor:"black",color:"white"}} ref={buttonRef} className="loadMore" onClick={loadMoreItems}>Load More</button>
                </div>
            </div>

        </div>
    )
}

export default Landing
