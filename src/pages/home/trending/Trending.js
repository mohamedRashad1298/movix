import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/SwitchTab/SwitchTab";
import { useState } from "react";
import useFetch from '../../../hooks/useFetch'
import Carousel from "../../../components/Carousel/Carousel";

const Trending = ()=>{

const [endPoint,setEndPoint]=useState('day')

const {data , loading} = useFetch(`/trending/all/${endPoint}`)


const onChangTab = (tab) => {
  setEndPoint(tab === "Day" ? "day" : "week");
};

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={['Day','Week']} onChangTab={onChangTab}/>
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>
    </div>
  );
}

export default Trending