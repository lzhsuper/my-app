import React, {Component} from 'react';

class Clear extends Component {
    render() {
        const {clear, children,className} = this.props;
        return (
            <div>
                <button className={className}
                        onClick={clear}>
                    <span>{children}</span>
                </button>
            </div>
        )
    }
}

export default Clear;