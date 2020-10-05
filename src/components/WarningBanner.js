import React, { Component } from 'react';

class WarningBanner extends Component {
    render() {
        if (this.props.valid) {
            return null;
        }
        return (
            <div className="alert alert-danger" role="alert">
                {"Erro:" + this.props.msg}
            </div>
        );
    }
}

export default WarningBanner;