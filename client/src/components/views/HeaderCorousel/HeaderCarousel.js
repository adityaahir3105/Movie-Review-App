import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../Config'
import { Typography } from "antd";
const { Title } = Typography;

const handleDragStart = (e) => e.preventDefault();

const Gallery = () => {
  const [Movie, setMovie] = useState([]);

  const items = Movie.map((c) => (
    <Link to={`/movie/${c.id}`}>
    <div
        var image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${c.backdrop_path}`}
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0)
          39%,rgba(0,0,0,0)
          41%,rgba(0,0,0,0.65)
          100%),
          url('${IMAGE_BASE_URL}${IMAGE_SIZE}${c.backdrop_path}'), #1c1c1c`,
          height: "500px",
          backgroundSize: "100%, cover",
          backgroundPosition: "center, center",
          width: "100%",
          position: "relative",
        }}
        onDragStart={handleDragStart}
      >
          <div>
            <div
              style={{
                position: "absolute",
                maxWidth: "500px",
                bottom: "2rem",
                marginLeft: "2rem",
              }}
            >
              <Title style={{ color: "white" }} level={2}>
                {" "}
                {c.title}{" "}
              </Title>
              <p style={{ color: "white", fontSize: "1rem" }}>{c.overview} </p>         
            </div>
          </div>
      </div>
      </Link>
  ));

  const fetchMovie = async () => {
    const { data } = await axios.get(
      `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    setMovie(data.results);
  };

  useEffect(() => {
    fetchMovie();
    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
      mouseTracking="true"
      infinite="true"
      disableDotsControls
      disableButtonsControls
    //   responsive={responsive}
      items={items}
      animationDuration={"2000".toString()}
      autoPlay
    />
  );
};

export default Gallery;
