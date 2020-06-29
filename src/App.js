import React, {Component} from 'react';
import CardPage from "./CardPage";
import MainPage from "./mainPage/MainPage";
import {BrowserRouter, Route} from "react-router-dom";


const axios = require('axios').default;


class App extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <BrowserRouter>
                <p>Avito shock content</p>
                <Route exact path="/" component={MainPage}/>
                <Route path="/repo_page" component={CardPage}/>
            </BrowserRouter>
    );
    }

}

export default App;
