import React from 'react'
import { Form, FormControl } from 'react-bootstrap';
class YearCounter extends React.Component {
    render() {
        return (
            <Form>
                <FormControl size='lg' type='number' min='0' placeholder='Ano'></FormControl>
            </Form>
        );
    }
}

export default YearCounter;