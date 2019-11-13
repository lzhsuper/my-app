import React, {Component} from 'react'
import './Login.css'

function Prompt({statu}) {
    if (statu) {
        if (statu === 200) {
            return (<div className="prompt">
                <span className="correct">登陆成功</span>
            </div>)
        } else if (statu === 2) {
            return (<div className="prompt" style={{color: "red"}}>
                <span className="incorrect">该用户不存在</span>
            </div>)
        } else if (statu === 1) {
            return (<div className="prompt" style={{color: "red"}}>
                <span className="incorrect">密码错误</span>
            </div>)
        }
    } else {
        return <div/>
    }
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            reponse: null,
            enusername: null,
            enpassword: null,
            loginORregiest: 1,
            email: '',
            enemail: '',
            enpwd: '',
            enenpwd: '',
        };
        this.onchangeuser = this.onchangeuser.bind(this);
        this.onchangepwd = this.onchangepwd.bind(this);
        this.submit_u_p = this.submit_u_p.bind(this);
        this.enuser = this.enuser.bind(this);
        this.enpwd = this.enpwd.bind(this);
        this.loginselect = this.loginselect.bind(this);
        this.registelect = this.registelect.bind(this);
        this.onchangeenpwd = this.onchangeenpwd.bind(this);
        this.onchangeenemail = this.onchangeenemail.bind(this);
        this.enenpwd = this.enenpwd.bind(this);
        this.enemail = this.enemail.bind(this);
    }

    onchangeuser(event) {
        this.setState({username: event.target.value})
    }

    onchangepwd(event) {
        this.setState({password: event.target.value})
    }

    onchangeenpwd(event) {
        this.setState({enpwd: event.target.value})
    }

    onchangeenemail(event) {
        this.setState({email: event.target.value})
    }

    enuser(event) {
        if (event.target.value === '') {
            this.setState({enusername: '用户不可为空'})
        } else {
            this.setState({enusername: ''})
        }
    }

    enpwd(event) {
        if (event.target.value === '') {
            this.setState({enpassword: '密码不可为空'})
        } else {
            this.setState({enpassword: ''})
        }
    }

    enenpwd(event) {
        if (event.target.value === '') {
            this.setState({enenpwd: '请输入确认密码'})
        } else {
            this.setState({enenpwd: ''})
        }
    }

    enemail(event) {
        if (event.target.value === '') {
            this.setState({enemail: '邮箱不可为空'})
        } else {
            this.setState({enemail: ''})
        }
    }

    loginselect() {
        this.setState({loginORregiest: 1})
    }

    registelect() {
        this.setState({loginORregiest: 2})
    }

    submit_u_p() {
        if (this.state.username === '' || this.state.password === '') {
            if (this.state.username === '') {
                this.setState({
                    enusername: '用户不可为空'
                })
            }
            if (this.state.password === '') {
                this.setState({
                    enpassword: '密码不可为空'
                });
            }
            this.setState({reponse: null});
            return null
        }
        fetch('http://192.168.1.101:5000/login' + '?' + 'username=' + this.state.username + '&' + 'password=' + this.state.password, {method: 'post'})
            .then(reponse => reponse.json())
            .then(reponse => this.setState({reponse: reponse}))
            .catch(e => alert(e))
    }

    render() {
        const statu = (this.state.reponse && this.state.reponse[0].statu) || null;
        return (
            this.state.loginORregiest === 1
                ?
                <div className="LoginUi">
                    <div className='login_line'/>
                    <div className="loginORregist">
                    <h4>
                        <span style={{color: "rgba(9, 53, 5, 0.58)"}} onClick={this.loginselect}>
                            登陆
                        </span> & <span
                        onClick={this.registelect}>注册</span>
                    </h4>
                    </div>
                    <input className="userInput" placeholder="手机号码 / 用户名" onChange={this.onchangeuser}
                           onBlur={this.enuser}/>
                    <div className="en_u_p"><label>{this.state.enusername}</label></div>
                    <input className="pwdInput" placeholder="用户密码" onChange={this.onchangepwd} onBlur={this.enpwd}/>
                    <div className="en_u_p"><label>{this.state.enpassword}</label></div>
                    <div className="forgetdiv"><a href="#" className="forgetpwd">忘记密码</a></div>
                    <button className="LoingSubmit" onClick={this.submit_u_p}>登录</button>
                    <Prompt statu={statu}/>
                </div>
                :
                <div className="LoginUi_r">
                    <div className='login_line'/>
                     <div className="loginORregist">
                    <h4>
                        <span onClick={this.loginselect}>
                            登陆
                        </span> & <span style={{color: "rgba(9, 53, 5, 0.58)"}} onClick={this.registelect}>注册</span>
                    </h4>
                     </div>
                    <input className="userInput_r" placeholder="手机号码 / 用户名" onChange={this.onchangeuser}
                           onBlur={this.enuser}/>
                    <div className="en_u_p"><label>{this.state.enusername}</label></div>
                    <input className="pwdInput_r" placeholder="用户密码" onChange={this.onchangepwd} onBlur={this.enpwd}/>
                    <div className="en_u_p"><label>{this.state.enpassword}</label></div>
                    {/*<input className="pwdInput_r" placeholder="确认密码" onChange={this.onchangeenpwd}*/}
                    {/*onBlur={this.enenpwd}/>*/}
                    {/*<div className="en_u_p"><label>{this.state.enenpwd}</label></div>*/}
                    <input className="pwdInput_r" placeholder="邮箱" onChange={this.onchangeenemail}
                           onBlur={this.enemail}/>
                    <div className="en_u_p"><label>{this.state.enemail}</label></div>
                    <button className="LoingSubmit_r" onClick={this.submit_u_p}>注册</button>
                    <Prompt statu={statu}/>
                </div>
        )
    }
}