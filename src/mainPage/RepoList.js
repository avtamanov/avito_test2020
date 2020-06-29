import React from 'react';
import RepoItem from './RepoItem';
import './RepoList.css'

function RepoList(props){
    // fill shown repos
    let arr = [];
    for (let i = (props.stateMain.curPage - 1) * 10; i < props.stateMain.repoList.length && i < props.stateMain.curPage * 10; i++)
    {
        // 2020-06-02T16:42:06Z
        let dateString = props.stateMain.repoList[i].pushed_at;
        dateString = dateString.slice(0, dateString.indexOf('T')) + ' ' +
            dateString.slice(dateString.indexOf('T') + 1, dateString.indexOf('Z'));
        arr.push(<RepoItem
            key={props.stateMain.repoList[i].id}
            name={props.stateMain.repoList[i].name}
            stars={props.stateMain.repoList[i].stargazers_count}
            date={dateString}
            link={props.stateMain.repoList[i].html_url}
            linkName={props.stateMain.repoList[i].html_url}
            url={props.stateMain.repoList[i].url}
            stateMain={props.stateMain}
        />)
    }

    return (
        <div className="repoList">
            <RepoItem className="repoList header" name="Name" stars="Stars" date="Last Commit" linkName="Link" link=""/>
            {arr}
        </div>
    );
}

export default RepoList;