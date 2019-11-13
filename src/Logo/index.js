import React from 'react'
import './Head.css'
export default function Head() {
    return(
        <div className="head">
            <span className="location">
                欢迎用户 **** 到来！
            </span>
            <div className="inhead">
                <span>
                    <a href="">注册</a>
                    <a href="">登陆</a>
                    <a href="">疑问解答</a>
                    <a href="">取得联系</a>
                </span>
            </div>
        </div>
    )
}