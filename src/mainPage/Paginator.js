import React from 'react';
import './Paginator.css'

function Paginator(props) {

    let icons = [];
    for(let i = 0; i < props.pages; i++)
    {
        let iconFunc = props.pressFunc.bind(this, i+1)
        icons.push(<PaginatorNum
            className="paginatorNum"
            key={i+1}
            content={i+1}
            onClick={iconFunc}
            isActive={i+1 === props.curPage ? 1 : 0} />);
    }
    return (
        <div className="paginator">
            {icons}
        </div>
    );
}

function PaginatorNum(props) {
    let className = props.className;
    if(props.isActive){
        className+= " active";
    } else {
        className+= " inactive";
    }
    return (<div className={className}
                 onClick={props.onClick}
    >{props.content}</div>);
}

export default Paginator;