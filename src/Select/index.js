import React, {Component} from 'react'
import './Select.css'

export default class Select extends Component {
    render() {
        const {sendhttp, onChange, children, value} = this.props;
        return (
            <div className="Select">
                <input className="find" type="text" onChange={onChange} value={value} />
                <button type="button" className="selection" onClick={() => sendhttp(0, 0)}>{children}</button>
            </div>
        )
    }
}