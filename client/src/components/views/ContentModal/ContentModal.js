import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import Youtube from "react-youtube";
import {Link} from "react-router-dom"
import {
  img_500,
  unavailable,
  unavailableLandscape,
  API_KEY,
  API_URL
} from "../../Config";
import "./ContentModal.css";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";
// import { Button } from 'antd';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({ children, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [playing, setPlaying] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `${API_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `${API_URL}movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    );

    setVideo(data.results[0]);
  };
  // console.log(video);
  // console.log(video.key);
  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);
  // console.log(content);
  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              {playing ? (
                video ? (
                  <>
                    <Youtube
                      videoId={video.key}
                      className={"ContentModal"}
                      containerClassName={"youtube-container amru"}
                      opts={{
                        width: "100%",
                        height: "100%",
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
                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      className="ContentModal__closebutton"
                      onClick={() => {
                        setPlaying(false);
                      }}
                    >
                      close
                    </Button>
                  </>
                ) : (
                  "Sorry no Trailer"
                )
              ) : (
                <div className="ContentModal">
                  <img
                    src={
                      content.poster_path
                        ? `${img_500}/${content.poster_path}`
                        : unavailable
                    }
                    alt={content.name || content.title}
                    className="ContentModal__portrait"
                  />
                  <img
                    src={
                      content.backdrop_path
                        ? `${img_500}/${content.backdrop_path}`
                        : unavailableLandscape
                    }
                    alt={content.name || content.title}
                    className="ContentModal__landscape"
                  />
                  <div className="ContentModal__about">
                    <span className="ContentModal__title">
                      {content.name || content.title} (
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                      ).substring(0, 4)}
                      )
                    </span>
                    {content.tagline && (
                      <i className="tagline">{content.tagline}</i>
                    )}

                    <span className="ContentModal__description">
                      {content.overview}
                    </span>

                    <div>
                      <Carousel id={id} />
                    </div>

                    <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="secondary"
                      onClick={() => {
                        setPlaying(true);
                      }}
                    >
                      Watch the Trailer
                    </Button>
                    <Link to={`/movie/${content.id}`}>
                      <Button
                        className="ContentModal__viewbutton"
                        variant="contained"
                        color="primary"
                      >
                        {" "}
                        View More
                      </Button>
                    </Link>
                    <Button
                      className="close_btn"
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
