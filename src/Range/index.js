import React from 'react'
export default function Range({end, setPage, page, page_star, page_end, leftclick}) {
    // console.log(page);
    let arr = [];
    let li = [];
    for (let i = 0; i < end; i++) {
        arr.push(i)
    }
    // console.log(page);
    if (page < 4) {
        page_star = 0;
        page_end = 9;
    } else if (page > end - 5) {
        page_star = 41;
        page_end = end;
    }
    // console.log(page_star + ' ' + page_end);
    if (page === 0) {
        li.push(<li key="left" style={{color: "#7f7f7f", cursor: "not-allowed"}}>{'<'}</li>);
    } else {
        li.push(<li key="left" onClick={() => leftclick('left', page, page)}>{'<'}</li>);
    }
    for (let pg in arr.slice(page_star, page_end)) {
        pg = parseInt(pg);
        // console.log(arr.slice(page_star, page_end)[pg]);
        if (arr.slice(page_star, page_end)[pg] === page) {
            // if (pg % 20 === 0) {
            //     li.push(<br/>)
            // }
            li.push(
                <li key={arr.slice(page_star, page_end)[pg]}
                    onClick={() => setPage(arr.slice(page_star, page_end)[pg], arr.slice(page_star, page_end)[pg])}
                    style={{color: "blue", fontSize: "28px"}}>
                    {arr.slice(page_star, page_end)[pg] + 1}
                </li>);
        } else {
            li.push(
                <li key={arr.slice(page_star, page_end)[pg]}
                    onClick={() => setPage(arr.slice(page_star, page_end)[pg], arr.slice(page_star, page_end)[pg])}>
                    {arr.slice(page_star, page_end)[pg] + 1}
                </li>);
        }
    }
    if (arr.length - 1 < 0) {
        arr.length = 1
    }
    if (page === arr.length - 1) {
        li.push(<li style={{color: "#7f7f7f", cursor: "not-allowed"}} key="right">{'>'}</li>);
    } else {
        li.push(<li onClick={() => leftclick('right', page, page)} key="right">{'>'}</li>);
    }
    return li.map(item => item)
}