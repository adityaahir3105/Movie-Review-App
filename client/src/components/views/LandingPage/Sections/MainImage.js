import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import Youtube from "react-youtube";
import { API_URL, API_KEY } from "../../../Config";
const { Title } = Typography;

function MainImage(props) {
  const [playing, setPlaying] = useState(false)
//   console.log(props.id)  
  const [MainMovieTrailer, setMainMovieTrailer] = useState(null);
  useEffect(() => {
    const endpoint = `${API_URL}movie/${props.id}/videos?api_key=${API_KEY}&langauage=en-US`;
    fetechTrailer(endpoint);
  }, [props.id]);
  
  const fetechTrailer = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        const trailer=result.results.find(vid=>vid.name==="Official Trailer")
        setMainMovieTrailer(trailer? trailer:result.results[0])
        })

  };
  
  // console.log(MainMovieTrailer);
  return (
    <>
      <div
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0)
          39%,rgba(0,0,0,0)
          41%,rgba(0,0,0,0.65)
          100%),
          url('${props.image}'), #1c1c1c`,
          height: "500px",
          backgroundSize: "100%, cover",
          backgroundPosition: "center, center",
          width: "100%",
          position: "relative",
        }}
      >
        {MainMovieTrailer && playing ? (
          <>
          <Youtube
            videoId={MainMovieTrailer.key}
            className={"youtube amru"}
            containerClassName={"youtube-container amru"}
            opts={{
              width: "100%",
              height: "500px",
              playerVars: {
                autoplay: 1,
                controls: 0,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 0,
              },
            }}
          />
          <button style={{
                position: "absolute",
                maxWidth: "500px",
                bottom: "2rem",
                marginLeft: "2rem",
              }} onClick={() => setPlaying(false)} className={"button close-video"}>Close
          </button>
          </>
        ) : (
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
                {props.title}{" "}
              </Title>
              <p style={{ color: "white", fontSize: "1rem" }}>{props.text} </p>
              {
                  MainMovieTrailer?  <button style={{ color:"Black", fontSize: "1rem" }}  onClick={()=>{setPlaying(true)}}>View Trailer</button> : <p style={{color:"white"}}>Sorry, no trailer available</p>
              }
             
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MainImage;
