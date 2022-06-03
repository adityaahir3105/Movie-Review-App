import React, { useEffect, useState, useRef } from 'react'
import { Typography, Row} from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
import MainImage from './Sections/MainImage'
import GridCard from '../../commons/GridCards'
const { Title } = Typography;
function LandingPage() {
    const buttonRef = useRef(null);
    // const [theme, settheme] = useState("white")
    // const [themetext, setthemetext] = useState("Dark") 
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
 
    const [Loading, setLoading] = useState(true)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    }, [])
    
    
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])
    
    
    
    // console.log(MainMovieTrailer)
    const fetchMovies = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                // console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
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
        // console.log('CurrentPage', CurrentPage)
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

            // loadMoreItems()
            // console.log('clicked')
            buttonRef.current.click();

        }
    }
    // const onChange = () => {

    //     if(theme==="white"){
    //       settheme("#111d2c");
    //       setthemetext("Light");
    //       localStorage.setItem("themetext", "Light");
    //       localStorage.setItem("theme", "#111d2c");
          
    //     }
    //     else{
    //       settheme("white");
    //       setthemetext("Dark");
    //     localStorage.setItem("themetext", "Dark");  
    //     localStorage.setItem("theme", "white");
    //     }
    //   };
    // const storedThemeText=localStorage.getItem("themetext");
    // const storedTheme = localStorage.getItem("theme");
    return (
        <div style={{backgroundColor:"black" ,width: '100%', margin: '0' }}>
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                    id={MainMovieImage.id}
                    // trailer={MainMovieImage.}
                />

            }
            <div style={{ width: '85%', margin: 'auto' }}>
                <div style={{display: 'flex'}}>
                <Title style={{flex: 1, margin: "10px", color:"#146262"}} level={2}> Popular Movies </Title>
                {/* <h3 style={{marginRight: '20px',marginTop:"20px",color:'#177ddc',border:"1px solid"}} onClick={onChange}>SetTheme {storedThemeText}</h3>         */}
                {/* <Switch style={{marginRight: '30px',marginTop:"20px"}} defaultChecked  onChange={onChange}></Switch> */}
                </div>
                <hr />
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />
                        </React.Fragment>
                    ))}
                </Row>

                {Loading &&
                    <div>Loading...</div>}

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>Load More</button>
                </div>
            </div>
        </div>
        
    )
}

export default LandingPage
