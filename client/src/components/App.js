import React, {Suspense} from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import MovieDetail from "./views/MovieDetail/MovieDetail"
import PersonDetail from"./views/PersonDetail/PesonDetail"
import FavoritePage from "./views/FavoritePage/FavoritePage"
import TopRated from './views/LandingPage/TopRated';
import UpComing from './views/LandingPage/UpComing';
import SearchMovie from './views/LandingPage/Search';


function App() {

  return (
    
    <Suspense fallback={(<div>Loading...</div>)}>
      
      <NavBar />
      <div style={{paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/toprate" component={Auth(TopRated, null)} />
          <Route exact path="/upcoming" component={Auth(UpComing, null)} />
          <Route exact path="/search" component={Auth(SearchMovie, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
          <Route exact path="/movie/:movieId/:characterId" component={Auth(PersonDetail,null)}/>
          <Route exact path="/favorite" component={Auth(FavoritePage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
