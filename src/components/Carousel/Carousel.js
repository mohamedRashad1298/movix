import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import './carousel.scss';


const Carousel = (props) => {
 
  const {url}= useSelector(state=>state.home)
   const carouselContainer = useRef();
const history = useHistory()

const navigation = (dir) => {
const container = carouselContainer.current;

const scrollAmount =
  dir === "left"
    ? container.scrollLeft - (container.offsetWidth + 20)
    : container.scrollLeft + (container.offsetWidth + 20);

container.scrollTo({
  left: scrollAmount,
  behavior: "smooth",
});
};

   const skItem = () => {
     return (
       <div className="skeletonItem">
         <div className="posterBlock skeleton"></div>
         <div className="textBlock">
           <div className="title skeleton"></div>
           <div className="date skeleton"></div>
         </div>
       </div>
     );
   };


  return (
    <div className="carousel">
      <ContentWrapper>
        {props.title && <div className="carouselTitle">{props.title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!props.loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {props.data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() =>
                    history.push(
                      `/${item.media_type || props.endpoint}/${item.id}`
                    )
                  }
                >
                  <div className="posterBlock ">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_Date).format("MMM D,YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
