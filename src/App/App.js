import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import './App.css';
import Range from '../Range'
import {sortBy} from 'lodash';
import Clear from '../Clear';
import DelButton from '../DelButton';
import Select from '../Select';
import IsLoading from '../IsLoading';
// import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {HashRouter as Router, Link, Route} from 'react-router-dom';

const DEFAULT_QUERY = 'React';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PAGE = 'page=';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            param: DEFAULT_QUERY,
            list: null,
            page: 0,
            pagesum: 0,
            page_star: 0,
            page_end: 10,
            page_cache: null,
            listnum: 0,
            error: null,
            isloading: false,
            select_element: null,
        };
        this.deletelist = this.deletelist.bind(this);
        this.clear = this.clear.bind(this);
        this.setpage = this.setpage.bind(this);
        this.leftclick = this.leftclick.bind(this);
        this.setnewlist = this.setnewlist.bind(this);
        this.onChange = this.onChange.bind(this);
        this.sendhttp = this.sendhttp.bind(this);
        this.changeSelect = this.changeSelect.bind(this);
    }

    setnewlist(list, pcache) {
        // let newnum = this.state.listnum;
        // let cache = this.state.page_cache;
        // cache.set(pcache, list);
        // const newhits = (this.state.page_cache && this.state.page_cache[newnum]) || null;
        const newlist = (this.state.page_cache && this.state.page_cache.cache) || null;
        this.setState({
            page_cache: {cache: {...newlist, ...{[pcache]: list}}},
            listnum: pcache,
            isloading: false,
            list: list,
        });
        if (this.state.select_element !== null) {
            this.setState({list: {...list, hits: sortBy(list.hits, this.state.select_element)}})
        }
        // console.log(this.state)
    }

    sendhttp(page, pcache) {
        if (page === 0) {
            this.setState({list: null, page: 0})
        }
        this.setState({isloading: true});
        // console.log(this.state.param);
        fetch(PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + this.state.param + '&' + PAGE + page)
            .then(reponse => reponse.json())
            .then(list => this.setnewlist(list, pcache))
            .catch(e => this.setState({error: e}));
        // event.preventDefault();
    }

    setpage(item, pcache) {
        this.setState({page: item, page_star: item - 4, page_end: item + 5});
        console.log(this.state.page_cache.cache[item] && this.state.select_element === null);
        if (this.state.page_cache.cache[item] && this.state.select_element === null) {
            this.setState({list: this.state.page_cache.cache[item]})
        } else {
            this.sendhttp(item, pcache)
        }
    }

    deletelist(id) {
        const newlist = this.state.list.hits.filter(item => item.objectID !== id);
        // this.setState({list: Object.assign({}, this.state.list, {hits: newlist})});
        this.setState({list: {...this.state.list, hits: newlist}});
    }

    leftclick(forward, page, cache) {
        if (forward === 'left') {
            // console.log(page+'   '+cache);
            if (this.state.page_cache.cache[page - 1] && this.state.select_element === null) {
                this.setState({
                    list: this.state.page_cache.cache[page - 1],
                    page: this.state.page - 1,
                    page_star: page - 5,
                    page_end: page + 4
                });
            } else {
                this.setState({page: this.state.page - 1, page_star: page - 5, page_end: page + 4});
                this.sendhttp(this.state.page - 1, cache - 1);
            }
        } else {
            // console.log(page+'   '+cache);
            if (this.state.page_cache && this.state.page_cache.cache[page + 1] && this.state.select_element === null) {
                this.setState({
                    list: this.state.page_cache.cache[page + 1],
                    page: this.state.page + 1,
                    page_end: page + 6,
                    page_star: page - 3
                });
            } else {
                this.setState({page: this.state.page + 1, page_end: page + 6, page_star: page - 3});
                this.sendhttp(this.state.page + 1, cache + 1);
            }
        }
    }

    changeSelect(event) {
        if (event.target.value === 'clear') {
            this.setState({select_element: null});
            this.sendhttp(this.state.page, this.state.page)
        } else {
            // console.log(this.state.list);
            this.setState({
                list: {...this.state.list, hits: sortBy(this.state.list.hits, event.target.value)},
                select_element: event.target.value
            })
        }
    }

    onChange(event) {
        this.setState({param: event.target.value, page_cache: null})
    }

    clear() {
        this.setState({list: null})
    }

    componentDidMount() {
        this.sendhttp(0, 0);
    }

    render() {
        // console.log();
        const withisloading = (Message) => ({isloading, ...props}) =>
            !isloading
                ?
                !this.state.error
                    ?
                    list
                        ?
                        list.hits.length !== 0
                            ?
                            <Message {...props} />

                            : <div className="nodata">no data</div>
                        : null
                    : <span
                        style={{
                            position: "absolute",
                            zIndex: "1",
                            top: "50%",
                            left: "44%",
                            color: "red",
                            fontSize: "50px"
                        }}>Sever error ...</span>
                : <IsLoading className="isLoading"/>;
        const MessagewithIsloading = withisloading(DelButton);
        const {param, list} = this.state;
        // console.log(param, list, this.state.isloading);
        return (
            <div>
                <h1 className="shadow">Page List</h1>
                <Select
                    value={this.state.param}
                    sendhttp={this.sendhttp}
                    onChange={this.onChange}
                >搜索</Select>
                {
                    <MessagewithIsloading
                        isloading={this.state.isloading}
                        list={list}
                        // param={param}
                        deletelist={this.deletelist}
                        className="delbutton"
                        onChange={this.changeSelect}
                        select_element={this.state.select_element}
                    >屏蔽该信息</MessagewithIsloading>

                }
                <br/><br/>
                <div className="inbody">
                    <ul style={{fontSize: "20px"}}>
                        {list
                            ? <Range end={this.state.list.nbPages} setPage={this.setpage} page={this.state.page}
                                     page_star={this.state.page_star} page_end={this.state.page_end}
                                     leftclick={this.leftclick}/>
                            : null
                        }
                    </ul>
                    {!this.state.error ?
                        <Clear className="button" clear={this.clear}>Clear</Clear> : null
                    }</div>
                {/*<img src={process.env.PUBLIC_URL+"forward.jpg"} style={{width: "90px",height: "90px",position: "absolute",zIndex: "1",left: "44%",bottom: "-27%"}}*/}
            </div>
        );
    }
}

// export default class App extends Component {
//     constructor() {
//         super();
//         this.state = {
//             results: null,
//             searchkey: '',
//             searchTerm: DEFAULT_QUERY,
//             page: 0,
//             IsLoading: false,
//             sortKey: 'NONE',
//         };
//         this.onSearchSubmit = this.onSearchSubmit.bind(this);
//         this.setSearchTopStories = this.setSearchTopStories.bind(this);
//         this.onDismiss = this.onDismiss.bind(this);
//         this.onSort = this.onSort.bind(this);
//     }
//
//     componentDidMount() {
//         const {searchTerm} = this.state;
//         this.setState({searchKey: searchTerm});
//         this.fetchSearchTopStories(searchTerm, this.state.page);
//     }
//
//     fetchSearchTopStories(quary, page) {
//         this.setState({IsLoading: true});
//         fetch(PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + quary + '&' + PAGE + page)
//             .then(reponse => reponse.json())
//             .then(result => this.setSearchTopStories(result))
//             .catch(e => e)
//     }
//
//     onSort(sortKey) {
//         this.setState({sortKey});
//     }
//
//     needsToSearchTopStories(searchTerm) {
//         return !this.state.results[searchTerm];
//     }
//
//     onSearchSubmit(event) {
//         const {searchTerm} = this.state;
//         this.setState({searchKey: searchTerm});
//         if (this.needsToSearchTopStories(searchTerm)) {
//             this.fetchSearchTopStories(searchTerm);
//         }
//
//         event.preventDefault();
//     }
//
//
//     onDismiss(id) {
//         const {searchKey, results} = this.state;
//         const {hits, page} = results[searchKey];
//         const isNotId = item => item.objectID !== id;
//         const updatedHits = hits.filter(isNotId);
//
//         this.setState({
//             results: {
//                 ...results,
//                 [searchKey]: {hits: updatedHits, page}
//             }
//         });
//     }
//
//     setSearchTopStories(result) {
//         const {hits, page} = result;
//         // console.log(page);
//         const {searchKey, results} = this.state;
//         const oldHits = (results
//             && results[searchKey]
//             && results[searchKey].hits) || [];
//
//         const updatedHits = [
//             ...oldHits,
//             ...hits
//         ];
//         this.setState({  //{results: {react: {hits: updateeHits , page: page},redux: {hits: updateeHits , page: page}}}
//             results: {
//                 ...results,
//                 [searchKey]:
//                     {
//                         hits: updatedHits, page
//                     }
//             }, IsLoading: false
//         });
//     }
//
//     render() {
//         const {
//             searchTerm,
//             results,
//             searchKey,
//             IsLoading,
//             sortKey,
//         }
//             = this.state;
//
//         const page = (
//             results &&
//             results[searchKey] &&
//             results[searchKey].page
//         ) || 0;
//         const list = (
//             results &&
//             results[searchKey] &&
//             results[searchKey].hits
//         ) || [];
//         const Button = ({onClick, className = '', children}) =>
//             <button
//                 onClick={onClick}
//                 className={className}
//                 type="button"
//             >
//                 {children}
//             </button>;
//
//         const Loading = () =>
//             <div>Loading ...</div>;
//
//         const withLoading = (Component) => ({IsLoading, ...rest}) =>
//             IsLoading
//                 ? <Loading/>
//                 : <Component {...rest} />;
//         const ButtonWithLoading = withLoading(Button);
//
//         return (
//             <div>
//                 <Table
//                     list={list}
//                     onDismiss={this.onDismiss}
//                     pattern={this.state.searchTerm}
//                     sortKey={sortKey}
//                     onSort={this.onSort}
//                 />
//                 <div className="interactions">
//                     <div>
//                         <ButtonWithLoading
//                             IsLoading={this.state.IsLoading}
//                             onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
//                             More
//                         </ButtonWithLoading>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// export class Button extends Component {
//     render() {
//         const {
//             onClick,
//             className,
//             children,
//         } = this.props;
//
//         return (
//             <button
//                 onClick={onClick}
//                 className={className}
//                 type="button"
//             >
//                 {children}
//             </button>
//         );
//     }
// }
//
// export class Table extends Component {
//     render() {
//         const SORTS = {
//             NONE: list => list,
//             TITLE: list => sortBy(list, 'title'),
//             AUTHOR: list => sortBy(list, 'author'),
//             COMMENTS: list => sortBy(list, 'num_comments').reverse(),
//             POINTS: list => sortBy(list, 'points').reverse(),
//         };
//         const {list, pattern, onDismiss, sortKey, onSort} = this.props;
//         const isSearched = searchTerm => item =>
//             item.title.toLowerCase().includes(searchTerm.toLowerCase());
//         // console.log(list);
//         const Sort = ({sortKey, onSort, children}) =>
//             <Button onClick={() => onSort(sortKey)}>
//                 {children}
//             </Button>;
//         return (
//             <div>
//                 <span style={{width: '40%'}}>
//         <Sort
//             sortKey={'TITLE'}
//             onSort={onSort}
//         >
//           Title
//         </Sort>
//       </span>
//                 <span style={{width: '30%'}}>
//         <Sort
//             sortKey={'AUTHOR'}
//             onSort={onSort}
//         >
//           Author
//         </Sort>
//       </span>
//                 <span style={{width: '10%'}}>
//         <Sort
//             sortKey={'COMMENTS'}
//             onSort={onSort}
//         >
//           Comments
//         </Sort>
//       </span>
//                 <span style={{width: '10%'}}>
//         <Sort
//             sortKey={'POINTS'}
//             onSort={onSort}
//         >
//           Points
//         </Sort>
//       </span>
//                 <span style={{width: '10%'}}>
//         Archive
//       </span>
//
//                 {SORTS[sortKey](list).filter(isSearched(pattern)).map(item =>
//                         <div key={item.objectID}>
//             <span>
//               <a href={item.url} style={{color: "red"}}>{item.title}</a>
//             </span>
//                             <span>{item.author}</span>
//                             <span>{item.num_comments}</span>
//                             <span>{item.points}</span>
//                             <span>
//               <Button onClick={() => onDismiss(item.objectID)}>
//                 Dismiss
//               </Button>
//             </span>
//                         </div>
//                 )}
//             </div>
//         );
//     }
// }

// export default class App extends Component {
//     constructor() {
//         super();
//         this.state = {
//             text: '',
//             result: null,
//             IsLoading: false,
//         };
//         this.onChange = this.onChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }
//
//     onChange(event) {
//         this.setState({text: event.target.value})
//     }
//
//     onSubmit(event) {
//         fetch(PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + this.state.text)
//             .then(reponse => reponse.json())
//             .then(list => this.setState({result: list}))
//             .catch(e => e);
//         event.preventDefault();
//         // console.log(this.state.text);
//     }
//
//     render() {
//
//         return (
//             <div>
//                 <form onSubmit={this.onSubmit}>
//                     <input
//                         type="text"
//                         value={this.state.text}
//                         onChange={this.onChange}
//                     />
//                     <button type="submit" style={{width: "100px", height: "21px"}}>
//                         submit
//                     </button>
//                 </form>
//
//                 {this.state.result
//                     ? this.state.result.hits.map(item =>
//                         <div key={item.objectID}>
//                             <span>{item.title}</span>
//                             <a href={item.url} children={item.url}/>
//                         </div>
//                     ) : null}
//             </div>
//         )
//     }
// }
