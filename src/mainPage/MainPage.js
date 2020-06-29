import React, {Component} from 'react';
import './MainPage.css';
import SearchField from "./SearchField";
import RepoList from "./RepoList";
import Paginator from "./Paginator";

const axios = require('axios').default;

class MainPage extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.state === undefined){
            this.state = {
                lastSearchURL: "",
                lastSearchString: "",
                repoList: [],
                curPage: 1
            };
        } else {
            const previousState = {...this.props.location.state};
            this.state = {
                lastSearchURL: previousState.lastSearchURL,
                lastSearchString: previousState.lastSearchString,
                repoList: [],
                curPage: previousState.curPage
            };
        }
    }

    componentDidMount = async () => {
        document.getElementById("searchField").value = this.state.lastSearchString;
        await this.gitRequest();
        this.pageSwitch(this.state.curPage);
    };

    // example
    // https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc
    async gitRequest() {
        let searchString = document.getElementById("searchField").value;
        this.setState({lastSearchString: searchString});
        searchString = searchString.trim();
        let searchIndex = searchString.indexOf(' ');
        // parsing search request
        while(searchIndex !== -1){
            searchString = searchString.slice(0, searchIndex) + "+" +
                searchString.slice(searchIndex + 1, searchString.length);
            searchIndex = searchString.indexOf(' ');
        }
        if(searchString === ""){
            // searchString = "https://api.github.com/search/repositories?q=js&sort=stars&per_page=10";
            let response1 = await axios({
                method: 'get',
                baseURL: 'https://api.github.com/search',
                url: '/repositories',
                parameters: {
                    'q': 'js',
                    'sort': 'stars'
                }
            }).then(result => {
                return result.data.items;
            });
            this.setState({repoList: response1});
            return;
        } else {
            searchString = "https://api.github.com/search/repositories?q=" + searchString + "&per_page=100";
        }
        this.setState({lastSearchURL: searchString});
        let response = await axios.get(searchString)
            .then(result => {
                return result.data.items;
            });
        this.setState({repoList: response});
    }

    async gitRequest1111111() {
        let searchString = document.getElementById("searchField").value;
        this.setState({lastSearchString: searchString});
        let response = await axios({
            method: 'get',
            baseURL: 'https://api.github.com/search',
            url: '/repositories',
            parameters: {
                'q': 'js',
                'sort': 'stars',
                'per_page': '10'
            }
        }).then(result => {
            return result.data.items;
        });
    }

    repoRequest(){
        // here
    }


    pageSwitch(args){
        this.setState({curPage: args});
    }

    gitRequest = this.gitRequest.bind(this);
    pageSwitch = this.pageSwitch.bind(this);

    render ()
    {
        return (
            <div className="MainPage">
                <SearchField/>
                <button className="buttonSearch"
                        onClick={this.gitRequest}>Search
                </button>
                <RepoList stateMain={this.state}/>
                <Paginator pages={Math.ceil(this.state.repoList.length / 10)}
                           curPage={this.state.curPage}
                           pressFunc={this.pageSwitch}/>
            </div>
        );
    }
}

export default MainPage;