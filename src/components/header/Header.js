import "./header.scss";
import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useHistory, useLocation,Link } from "react-router-dom";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {

    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const history = useHistory();
    const location = useLocation();

    const openSearch = ()=>{
      setShowSearch(true);
      setMobileMenu(false);
    }

useEffect(()=>{
window.scrollTo(0 , 0)
},[location])

const openMobileMenu = ()=>{
  setShowSearch(false);
  setMobileMenu(true);
}

 const searchQueryHandler = (event) => {
   if (event.key === "Enter" && query.length > 0) {
     history.push(`/search/${query}`);
     setTimeout(()=>{
      setShowSearch(false)
     },1000)
   }
 };

 const navigator = (type)=>{
if (type === 'moives'){
  history.push('/explore/movie')
}
if (type === 'tv'){
  history.push('/explore/tv')
}
setMobileMenu(false)
 }

const controlNavBar = ()=>{
  if(window.scrollY > 200){
      if(window.scrollY > lastScrollY && !mobileMenu){
         setShow('hide')
      }else{
        setShow("show");
      }
    }else{
      setShow('top')
    }
    setLastScrollY(window.scrollY)
}

useEffect(()=>{
window.addEventListener('scroll',controlNavBar)
return ()=>{
  window.removeEventListener('scroll',controlNavBar)
}
},)




  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigator("moives")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigator("tv")}>
            TV Show
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                onKeyUp={searchQueryHandler}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Search for a movie or tv show...."
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
