import "./style.scss";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {

  const [background,setBackground]=useState('')
  const [query,setQuery]=useState('')
const history = useHistory()
const {data,loading}=useFetch('/movie/upcoming')
const {url}= useSelector(state=> state.home)


useEffect(()=>{
const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
setBackground(bg)

},[data,url])


const searchQueryHandeler = (event)=>{
  event.preventDefault();
  if(query.length > 0){
history.push(`/search/${query}`)
  }else{
    return
  }
}


  return (
    <div className="heroBanner">
      <div className="backdrop-img">{!loading && <Img src={background} />}</div>
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="wrapper">
          <div className="heroBannerContentr">
            <span className="title">Welcome.</span>
            <span className="subTitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>

            <form onSubmit={searchQueryHandeler} className="searchInput">
              <input
                className="searchBar"
                type="text"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Search for a movie or tv show...."
              />
              <button className="btn-search">Search</button>
            </form>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );;
};

export default HeroBanner;
