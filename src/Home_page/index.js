import React, {Component} from 'react'
import './home_page.css'

const img = [
    {
        a: 'https://jtljia.oss-cn-hangzhou.aliyuncs.com/jia-web/2018/09/07/e9b05e997f3548aaad4a6e5c68404f5f.jpg'
    },
    {
        a: 'https://jtljia.oss-cn-hangzhou.aliyuncs.com/jia-web/2018/09/29/a7e1c09f41ab429585265654d81d931b.jpg'
    },
    {
        a: 'https://jtljia.oss-cn-hangzhou.aliyuncs.com/jia-web/2018/07/11/5134a8baf6df4ee0bbeb71a114881cad.jpg'
    },
    {
        a: 'https://jtljia.oss-cn-hangzhou.aliyuncs.com/jia-web/2018/07/11/23e481903c3a41aeb3eca0140395cdbd.jpg'
    }
];

function Banner_range({Onclick, Banner_time}) {
    // let arr = [];
    let li = [];
    for (let a = 0; a < img.length; a++) {
        li.push(
            <li key={a}>
                {a === Banner_time
                    ?
                    <div className="icon_full" key={a} onClick={() => Onclick(a)}/>
                    : <div className="icon" key={a} onClick={() => Onclick(a)}/>
                }
            </li>
        )
    }
    return li

}

export default class Home_page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner_time: 0,
            list: img
        };
        this.Click_banner = this.Click_banner.bind(this);
    }

    Click_banner(Banner_time) {
        this.setState({banner_time: Banner_time})
    }

    componentDidMount() {
        setInterval(() =>
                this.setState(() => {
                        if (this.state.banner_time === this.state.list.length - 1) {
                            return {banner_time: 0}
                        } else {
                            return {banner_time: this.state.banner_time + 1}
                        }
                    }
                ),
            3000);
    }

    render() {

        return (
            <div className='bannerlocation'>
                <div className="banner">
                    <img src={img[this.state.banner_time].a}/>
                    <div className="shadow_little"/>
                </div>

                <ul className="num">
                    <Banner_range Onclick={this.Click_banner} Banner_time={this.state.banner_time}/>
                </ul>
            </div>
        )
    }

}