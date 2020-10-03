import React, { Component } from 'react';
import Body from './Body';
import Database from '../backend/Database';

class App extends Component {

    constructor(props) {
        super(props);
        this.db = new Database();
    }

    render() {
        return (
            <Body></Body>
        );
    }
}

export default App;