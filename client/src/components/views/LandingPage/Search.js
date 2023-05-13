import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../Config'
import MainImage from './Sections/MainImage'
import { Input} from 'antd';
import "./search.css";
import SingleContent from '../SingleContent/SingleContent';


const { Search } = Input;
function SearchMovie() {
    const [Movies, setMovies] = useState([])
    const [MoviesName, setMoviesNames] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [Loading, setLoading] = useState(true)
    // eslint-disable-next-line
    const [CurrentPage, setCurrentPage] = useState(0)
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMoviesNames(endpoint)
    }, [])
    const fetchMoviesNames = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setMoviesNames(result.results)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }

    const searchMovie=()=>{
        setFilteredData([]);
        let endpoint = '';
        endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchText}`;
        fetchMovies(endpoint)
    }
    
    const fetchMovies = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                console.log(result)
                // console.log('Movies',...Movies)
                // console.log('result',...result.results)
                setMovies(result.results)
                setMainMovieImage(result.results[0])
                setCurrentPage(result.page)
            }, setLoading(false))
            .catch(error => console.error('Error:', error)
            )
    }
   
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
    // console.log(filteredData)
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
        <div className="dataResult" >
          {filteredData.slice(0,5).map((value, key) => {
            return (
              <div key={key}>
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
                <div className="searchmovie">
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
                    <div style={{color:"#39445a"}}>Loading...</div>}

                {/* <br style={}/> */}
                {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div ref={buttonRef} className="loadMore" onClick={loadMoreItems}>Load</div>
                </div> */}
            </div>

        </div>
        </>
    )
}

export default SearchMovie
