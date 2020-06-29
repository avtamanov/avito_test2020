import React from 'react';
import './RepoItem.css'
import {Link} from "react-router-dom";

function RepoItem(props) {
    return (
        <div className="RepoItem">
            <div className="RepoName">
                <Link to={{
                    pathname: "/repo_page",
                    state: {propsLink: props}
                }}>{props.name}</Link>
            </div>
            <div className="RepoStars">{props.stars}</div>
            <div className="RepoDate">{props.date}</div>
            <div className="RepoLink">
                <a href={props.link}>{props.linkName}</a>
            </div>
        </div>
    );
}

export default RepoItem;