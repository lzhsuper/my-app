import React from 'react';
import ReactDOM, {render} from 'react-dom';
import './index.css';
import App from './App';
// import Range from './Range'
import * as serviceWorker from './serviceWorker';
// import {Redirect,Route, Router,IndexLink} from 'react-router'
import {HashRouter as Router, Link, Route, Redirect, RouteComponentProps} from 'react-router-dom';
// import Head from "./Logo";
// import Subdirectories from './Subdirectories'
import Logo from './Logo'
import Guide from './Guide'
import HomePage from './Home_page'
import Login from './Login'
import Brand from './Brand'
import Decorate from './Decorate_style'
import Bottom from './Bottom'

ReactDOM.render(
    (<Router>
        <Redirect to="/home"/>
        <Route path="/home" component={Logo}/>
        <Route path="/home" component={Guide}/>
        <Route path="/home" component={HomePage}/>
        <Route path="/home" component={Login}/>
        <Route path="/home" component={Brand}/>
        <Route path="/home" component={Decorate}/>
        <Route path="/home" component={Bottom}/>
    </Router>)
    , document.getElementById('home')
);
ReactDOM.render(
    (<Router>
        <Route path="/Product_details" component={Logo}/>
        <Route path="/Product_details" component={Guide}/>
        <Route path="/Product_details" component={Bottom}/>
    </Router>), document.getElementById('Product_details')
);
ReactDOM.render(
    (<Router>
        <Route path="/chengpin" component={Logo}/>
        <Route path="/chengpin" component={Guide}/>
        <Route path="/chengpin" component={Bottom}/>
    </Router>), document.getElementById('chengpin')
);
ReactDOM.render(
    (<Router>
        <Route path="/about_product" component={Logo}/>
        <Route path="/about_product" component={Guide}/>
        <Route path="/about_product" component={Bottom}/>
    </Router>), document.getElementById('aboutproduct')
);
ReactDOM.render(
    (<Router>
        <Route path="/selled" component={Logo}/>
        <Route path="/selled" component={Guide}/>
        <Route path="/selled" component={Bottom}/>
    </Router>), document.getElementById('selled')
);

serviceWorker.unregister();