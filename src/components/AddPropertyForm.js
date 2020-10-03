import React from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup } from 'react-bootstrap';

class AddPropertyForm extends React.Component {
    render() {
        return (
            <Form>
                <FormGroup>
                    <FormControl type='text' placeholder='Nome'></FormControl>
                    <div className='overflow-auto' style={{ height: '100px' }}>
                        <FormCheck checked disabled type='checkbox' label='Rendas'></FormCheck>
                        <FormCheck checked disabled type='checkbox' label='Div'></FormCheck>
                        <FormCheck checked disabled type='checkbox' label='Obs'></FormCheck>
                        <FormCheck type='checkbox' label='Luz'></FormCheck>
                        <FormCheck type='checkbox' label='Agua'></FormCheck>
                    </div>
                    <Button>Adicionar Propriedade</Button>
                </FormGroup>
            </Form>
        );
    }
}

export default AddPropertyForm;