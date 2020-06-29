import React from 'react';
import {BrowserRouter, Link, Route} from "react-router-dom";
import './CardPage.css';

const axios = require('axios').default;

class CardPage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            propsLink: props.location.state.propsLink,
            gitResponse: {},
            lastFullInfo: {},
            imgURL: "",
            authorLink: "",
            arrayLanguages: [],
            arrayContributors: [],
            shortDescription: ""
        };
    }

    componentDidMount = async () => {
        // assignment value from props
        let searchString = this.state.propsLink.url;
        this.setState({lastFullInfo: searchString});
        // request main data
        let response = await axios.get(searchString)
            .then(result => {
                return result;
            });
        this.setState({
            gitResponse: response,
            authorImg: response.data.owner.avatar_url,
            authorLink: response.data.owner.html_url,
            shortDescription: response.data.description
        });

        // request languages data
        let responseLang = await axios.get(this.state.lastFullInfo + "/languages")
            .then(result => {
                return result.data;
            });
        this.setState({
            arrayLanguages: responseLang
        });

        // request contributors data
        let responseContributors = await axios.get(this.state.lastFullInfo + "/contributors")
            .then(result => {
                return result.data;
            });
        this.setState({
            arrayContributors: responseContributors
        });
    };
    componentWillMount = this.componentDidMount.bind(this);

    langFunc() {
        let arr = this.state.arrayLanguages;
        arr = Object.keys(arr).map(ins => { return [ins, arr[ins]]; });
        let sum = arr.reduce((sum, current) => sum + current[1], 0);
        let r_arr = [];
        for(let i = 0; i < arr.length; i++){
            // unite a lot of less valued languages
            if(arr[i][1] / sum < 0.01){
                let other_arr = arr.splice(i);
                let other_sum = other_arr.reduce((sum, current) => sum + current[1], 0);
                r_arr.push(<li className="langItem" key={i}>
                    <div className="langName">Other:</div>
                    <div className="langUsers">{(100 * other_sum / sum).toFixed(2)}%</div>
                </li>);
                break;
            }
            r_arr.push(<li className="langItem" key={i}>
                <div className="langName">{arr[i][0]}:</div>
                <div className="langUsers">{(100 * arr[i][1] / sum).toFixed(2)}%</div>
            </li>);
        }
        return r_arr;
    }
    langFunc = this.langFunc.bind(this);

    contributorsFunction(){
        let arr = this.state.arrayContributors;
        let return_arr = [];

        for(let i = 0; i < 10 && i < arr.length; i++){
            return_arr.push(<li className="contrItem" key={i}>
                <div className="contrName">{arr[i].login}</div>
                <div className="contrNumber">{arr[i].contributions}</div>
                <a className="contrLink" href={arr[i].html_url}>{arr[i].html_url}</a>
            </li>)
        }

        return return_arr;
    }
    contributorsFunction = this.contributorsFunction.bind(this);

    render()
    {
        return (
            <div className="cardPage">
                <Link className="backLink"
                    to={{
                    pathname: "/",
                    state: {
                        lastSearchURL: this.state.propsLink.stateMain.lastSearchURL,
                        lastSearchString: this.state.propsLink.stateMain.lastSearchString,
                        curPage: this.state.propsLink.stateMain.curPage
                    }
                }}>go back</Link>
                <div className="mainInfo">
                    <h3 className="customHeader">Shortcut</h3>
                    <h2 className="infoName">{this.state.propsLink.name}</h2>
                    <div className="infoStars">Stars: {this.state.propsLink.stars}</div>
                    <div className="infoCommit">Last commit: {this.state.propsLink.date}</div>
                    <div className="shortInfo">{this.state.shortDescription}</div>
                </div>
                <div className="authorInfo">
                    <h3 className="customHeader">Owner Information</h3>
                    <img className="authorImg" src={this.state.authorImg} />
                    <a className="authorLink" href={this.state.authorLink}>{this.state.authorLink}</a>
                </div>
                <div className="contrListDiv">
                    <h3 className="customHeader">Top Contributors</h3>
                    <ui className="contrList">{this.contributorsFunction()}</ui>
                </div>
                <div className="langListDiv">
                    <h3 className="customHeader">Languages</h3>
                    <ui className="langList">{this.langFunc()}</ui>
                </div>
            </div>
        );
    }
}

export default CardPage;