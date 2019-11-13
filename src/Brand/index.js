import React from 'react'
import './brand.css'

export default function Brand() {
    return (
        <div className='Brand'>
            <div className='box1' onClick={() => {}}>
                <span className='spansrc'><img src={require('./images/brand1.jpg')} width='20%' height='50%'/></span>
                <span className='box-title'><h3>免费设计 </h3></span>
                <span className='box-message'><h5>为您提供三种设计方案</h5></span>
            </div>
            <div className='box2' onClick={() => {}}>
                <span className='spansrc'><img src={require('./images/yugu.png')} width='20%' height='50%'/></span>
                <span className='box-title'><h3>价格预估 </h3></span>
                <span className='box-message'><h5>让您预先掌握一切</h5></span>
            </div>
            <div className='box3' onClick={() => {}}>
                <span className='spansrc'><img src={require('./images/engineer.png')} width='25%' height='50%'/></span>
                <span className='box-title'><h3>工程上门 </h3></span>
                <span className='box-message'><h5>帮您做实际测量评估</h5></span>
            </div>
            <div className='box4' onClick={() => {}}>
                <span className='spansrc'><img src={require('./images/542289.png')} width='20%' height='50%'/></span>
                <span className='box-title'><h3>材料咨询</h3></span>
                <span className='box-message'><h5>助您由内而外，成竹在胸</h5></span>
            </div>
        </div>
    )

}