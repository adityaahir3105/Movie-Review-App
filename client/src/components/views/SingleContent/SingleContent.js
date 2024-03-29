import React from "react";
import { Badge } from "@material-ui/core";
import { img_300, unavailable } from "../../Config";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  vote_average,
}) => {
  return (  

    <ContentModal id={id} >
      <Badge
        overlap="rectangular"
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
    </ContentModal>
  );
};

export default SingleContent;
