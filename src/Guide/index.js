import './Guide.css'
import React, {Component} from 'react'
import {Link,} from 'react-router-dom'


function Pagesvg({width, height, pageselect, pageselectlength}) {
    if (pageselect === 0) {
        width = width / 100 * 55.8;
        height = height / 100 * 7;
    } else if (pageselect === 1) {
        width = width / 100 * 62.4;
        height = height / 100 * 7;
    } else if (pageselect === 2) {
        width = width / 100 * 70.1;
        height = height / 100 * 7;
    } else if (pageselect === 3) {
        width = width / 100 * 77.7;
        height = height / 100 * 7;
    } else if (pageselect === 4) {
        width = width / 100 * 85.4;
        height = height / 100 * 7;
    }
    return (
        <div>
            <svg style={{height: "5px", position: "absolute", zIndex: "999", left: width, top: height, width: "150px"}}>
                <line x1={0} y1={0}
                      x2={pageselect === 1 || pageselect === 2 || pageselect === 3 || pageselect === 4 ? pageselectlength >= 95 ? 95 : pageselectlength : pageselectlength >= 50 ? 50 : pageselectlength}
                      y2={0}
                      style={{stroke: "hsl(86, 36%, 26%)", strokeWidth: 5}}/>
            </svg>
        </div>
    )

}

export default class Guide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectpage: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            pageselectlength: 0,
            ifclick: true,
            scrollY: 0,
        };
        // this.setselectpage = this.setselectpage.bind(this);
        this.listenpagesize = this.listenpagesize.bind(this);
        this.settimelength = this.settimelength.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    // setselectpage(select) {
    //     this.setState({selectpage: select, ifclick: false, width: window.innerWidth, pageselectlength: 0});
    //     this.starttime = setInterval(() => {
    //         if (window.innerWidth - this.state.width > 90) {
    //             clearInterval(this.starttime)
    //         }
    //         this.settimelength(select)
    //     }, 1);
    // }

    handleScroll(event) {
        this.setState({scrollY: event.target.scrollingElement.scrollTop});
    }


    settimelength(select) {
        if (select === 1) {
            if (window.innerWidth - this.state.width > 90) {
                clearInterval(this.starttime);
                this.setState({ifclick: true});
                return
            }
        } else if (select === 2) {
            if (window.innerWidth - this.state.width > 90) {
                clearInterval(this.starttime);
                this.setState({ifclick: true});
                return
            }
        } else if (select === 3) {
            if (window.innerWidth - this.state.width > 90) {
                clearInterval(this.starttime);
                this.setState({ifclick: true});
                return
            }
        } else if (select === 4) {
            if (window.innerWidth - this.state.width > 90) {
                clearInterval(this.starttime);
                this.setState({ifclick: true});
                return
            }
        } else if (select === 0) {
            if (window.innerWidth - this.state.width > 45) {
                clearInterval(this.starttime);
                this.setState({ifclick: true});
                return
            }
        } else {
            clearInterval(this.starttime);
            this.setState({ifclick: true});
            return
        }
        this.setState({pageselectlength: this.state.pageselectlength + 1, width: this.state.width - 1});
    }

    componentDidMount() {
        window.addEventListener('resize', this.listenpagesize);
        window.addEventListener('scroll', this.handleScroll);
        this.starttime = setInterval(() => this.settimelength(this.state.selectpage), 1);
        setTimeout(() => window.scrollTo(0, 0), 90);
        this.setState({
            selectpage: this.props.location.pathname === '/home' ? 0
                : this.props.location.pathname === '/Product_details' ? 1
                    : this.props.location.pathname === '/chengpin' ? 2
                        : this.props.location.pathname === '/about_product' ? 3
                            : this.props.location.pathname === '/selled' ? 4
                                : 0
        });
    }

    listenpagesize(event) {
        this.setState({height: event.target.innerHeight, width: event.target.innerWidth})
    }

    render() {
        return (
            <div className={this.state.scrollY < 37 ? "guide" : "guide_change"}>
            <span className="logo">
                <h2>Logo</h2>
                {/*<svg>*/}
            </span>
                <ul className="location">
                    <li><Link to='/home'><b>首页</b></Link></li>
                    <li><Link to='/Product_details'><b>产品详情</b></Link></li>
                    <li><Link to='/chengpin'><b>成品精装</b></Link></li>
                    <li><Link to='/about_product'><b>相关套件</b></Link></li>
                    <li><Link to='/selled'><b>售后服务</b></Link></li>
                </ul>
                <Pagesvg width={this.state.width} height={this.state.height} pageselect={this.state.selectpage}
                         pageselectlength={this.state.pageselectlength}/>
            </div>
        )
    }
}