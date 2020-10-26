import React, { Component } from 'react';

class WarningBanner extends Component {
    render() {
        return (
            <div className="alert alert-danger" role="alert" style={{ borderStyle: 'solid', borderColor: '#828282' }}>
                {"Erro:" + this.props.msg}
            </div>
        );
    }
}

export default WarningBanner;