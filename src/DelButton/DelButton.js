import React, {Component} from 'react'
import "../App/App.css"

export default class DelButton extends Component {
    render() {
        const {list, deletelist, children, className, onChange, select_element} = this.props;
        // console.log(select_element);
        // const onChange = (event) => console.log(event.target.value);
        return (
            <div>{select_element === null
                ?
                <select onChange={onChange} defaultValue='all'>
                    <option value="choose">Please choose...</option>
                    <option value="title">sortBy title</option>
                    <option value='author'>sortBy author</option>
                    <option value='points'>sortBy points</option>
                    <option value='num_comments'>sortBynum_comments</option>
                </select>
                : <select onChange={onChange} value={select_element}>
                    <option value="title">sortBy title</option>
                    <option value='author'>sortBy author</option>
                    <option value='points'>sortBy points</option>
                    <option value='num_comments'>sortBynum_comments</option>
                    <option value="clear"> Clear choose</option>
                </select>}

                {
                    list.hits/*.filter(item => item.url !== null)*/.map(item =>
                        <div key={item.objectID} className="page_message">
                            {'title' === select_element ?
                                <span style={{color: "red"}}>{item.title} </span>
                                : <span>{item.title} </span>
                            }
                            {'author' === select_element ?
                                <span style={{color: "red"}}> {item.author} </span> : <span> {item.author} </span>}
                            <span><a href={item.url}> {item.url}</a></span>
                            {'points' === select_element ?
                                <span style={{color: "red"}}> {item.points} </span> : <span> {item.points} </span>}
                            {'num_comments' === select_element ?
                                <span style={{color: "red"}}> {item.num_comments} </span> :
                                <span> {item.num_comments} </span>}
                            <br/>
                            {/*<span style={{position: "relative",zIndex: "1"}}>1</span>*/}
                            <span
                                className="space">{new Array(100/*Math.floor((380 - (item.url.length+item.title.length+item.author.length))/4)-10*/).join('-')}</span>
                            <button onClick={() => deletelist(item.objectID)} className={className}>
                                {children}
                            </button>
                        </div>
                    )
                }
            </div>
        )
    }
}