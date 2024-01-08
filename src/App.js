
import './App.css';
import { fetchDataFromApi } from './utils/api';
import{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { homeActions } from './store/homeSlice';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Header from "./components/header/Header";
import Footer from './components/footer/footer';
import Home from './pages/home/Home';
import PageNotFound from './pages/404/pageNotFound';
import Details from './pages/details/Details';
import Explore from './pages/explore/Explore';
import SearchResult from './pages/searchResult/searchResult';


function App() {

const dispatch = useDispatch()



  useEffect(()=>{
    fetchApiConfig();
    genresCall();
  },[])



const fetchApiConfig = () => {
  fetchDataFromApi("/configuration").then((res) => {

const url = {
  backdrop: res.images.secure_base_url + "original",
  poster: res.images.secure_base_url + "original",
  profile: res.images.secure_base_url + "original",
};


    dispatch(homeActions.getApiConfiguration(url));
  });
};


   const genresCall = async () => {
     let promises = [];
     let endPoints = ["tv", "movie"];
     let allGenres = {};

     endPoints.forEach((url) => {
       promises.push(fetchDataFromApi(`/genre/${url}/list`));
     });

     const data = await Promise.all(promises);
     data.map(({ genres }) => {
       return genres.map((item) => (allGenres[item.id] = item));
     });

     dispatch(homeActions.getGenres(allGenres));
   };

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/search/:query" exact>
          <SearchResult />
        </Route>
        <Route path="/explore/:mediaType" exact>
          <Explore />
        </Route>
        <Route path="/:mediaType/:id">
          <Details />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
