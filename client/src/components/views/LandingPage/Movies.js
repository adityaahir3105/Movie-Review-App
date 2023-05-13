import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Typography} from 'antd';
import { API_URL, API_KEY} from '../../Config'
import SingleContent from "../SingleContent/SingleContent"
import "./Trending.css";
import useGenre from "../hooks/useGenre"
import Genres from "../Genres/Genres"
import Carousel from "../HeaderCorousel/HeaderCarousel"
import CustomPagination from '../pages/CustomPageination';

const { Title } = Typography;
function Movies() {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL = useGenre(selectedGenres);

    useEffect(() => {
        fetchMovies();
      },
      // eslint-disable-next-line 
      [genreforURL, page]);

    const fetchMovies = async () => {
        const { data } = await axios.get(
          `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        setMovies(data.results);
        setMainMovieImage(MainMovieImage || data.results[0])
        setNumOfPages(data.total_pages);
      };
  
    return (
        <div style={{ width: '100%', margin: '0' }}>
                <Carousel/>
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title style={{color:"white"}} level={2} > Discover Movies </Title>
                <Genres
                    type="movie"
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    genres={genres}
                    setGenres={setGenres}
                    setPage={setPage}
                />
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
                {numOfPages > 1 && (
                    <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                )}
            </div>

        </div>
    )
}

export default Movies
