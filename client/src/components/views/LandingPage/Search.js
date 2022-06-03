import React, { useEffect, useState, useRef } from 'react'
import { Row} from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config'
import MainImage from './Sections/MainImage'
import GridCard from '../../commons/GridCards'
// import Search from 'antd/lib/input/Search';
import { Input} from 'antd';
// const { Title } = Typography;
const { Search } = Input;
function SearchMovie() {
    const buttonRef = useRef(null);
    const [Movies, setMovies] = useState([])
    const [MoviesName, setMoviesNames] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [Loading, setLoading] = useState(true)
    const [CurrentPage, setCurrentPage] = useState(0)
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    // console.log(searchText)
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMoviesNames(endpoint)
    }, [])
    const fetchMoviesNames = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                // console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
                setMoviesNames(result.results)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }
    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    // }, [])

    const searchMovie=()=>{
        // setMovies([]);
        // console.log(...Movies)
        // setSearchText(wordEntered);
        // console.log(searchText);
        setFilteredData([]);
        let endpoint = '';
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}`;
        fetchMovies(endpoint)
    }
    
    const fetchMovies = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                // console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
                setMovies(result.results)
                setMainMovieImage(result.results[0])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

    const loadMoreItems = () => {
        let endpoint = '';
        setLoading(true)
        // console.log('CurrentPage', CurrentPage)
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }

    // const handleScroll = () => {
    //     const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    //     const body = document.body;
    //     const html = document.documentElement;
    //     const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    //     const windowBottom = windowHeight + window.pageYOffset;
    //     if (windowBottom >= docHeight - 1) {

    //         // loadMoreItems()
    //         console.log('clicked')
    //         buttonRef.current.click();

    //     }
    // }
   
    const handleFilter = (event) => {
        setSearchText(event.target.value)
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = MoviesName.filter((value) => {
          return value.original_title.toLowerCase().includes(searchWord.toLowerCase());
        });
    
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      };
    //   const clearInput = () => {
    //     setFilteredData([]);
    //     setWordEntered("");
    //   };
    return (
        <>
        <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
        <div >
        <Search placeholder="Search" enterButton style={{width: 304}}
        value={wordEntered}
        onChange={handleFilter}
        onSearch={searchMovie}  
        />
        {filteredData.length !== 0 && (
        <div className="dataResult" style={{marginTop:"5px",boxShadow:"black",overflow:"hidden",overflowY:'auto'}}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div className="dataItem" key={key}>
                <p onClick={()=>{setWordEntered(value.title)
                                setSearchText(value.title)}}>{value.title}</p>
              </div>
            );
          })}
        </div>
        )}
        </div>
        </div>
        <div style={{ width: '100%', margin: '0' }}>
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                    id={MainMovieImage.id}
                />

            }

            <div style={{ width: '85%', margin: '1rem auto' }}>
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
                    <div ref={buttonRef} className="loadMore" onClick={loadMoreItems}></div>
                </div>
            </div>

        </div>
        </>
    )
}

export default SearchMovie
