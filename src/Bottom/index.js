import React from 'react'
import './Bottom.css'
export default function Bottom(props) {
    return (<div className='locathon' style={props.location.pathname === '/home' ? {top: '300%'} : {bottom: '0'}}>
            <div className='bottom_top'>
                <table className='finall_table'>
                    <tbody>
                    <tr>
                        <td>关于我们</td>
                        <td>法律声明</td>
                        <td>媒体报道</td>
                    </tr>
                    <tr>
                        <td>家装指南</td>
                        <td>高薪聘请</td>
                        <td>商务合作</td>
                    </tr>
                    <tr>
                        <td>装修案例</td>
                        <td>意见反馈</td>
                        <td>联系我们</td>
                    </tr>
                    </tbody>
                </table>
                <div className='erweima1'>
                    <img src={require('./images/二维码.png')}/>
                    <label>微信公众号</label>
                </div>
                <div className='erweima2'>
                    <img src={require('./images/二维码.png')}/>
                    <label>联系我们</label>
                </div>
                <div className='telephone'>
                    <img className='phoneicon' src={require('./images/电话.png')}/>
                    <div className='phonecontent'>
                        <span className='content1'>0532-66668888</span>
                        <span className='content2'>每周一至周日 8：00-18：00</span>
                    </div>
                </div>
            </div>
            <div className='bottom_bot'>
                <div className='banquan'>
                    <span>版权所有：山东super家装设计有限公司 鲁 ICP 备 100111号</span>
                </div>
                <div className='banquan'>
                    <span>@ super.com super家装设计网保留所有权</span>
                </div>
            </div>
        </div>
    )

}