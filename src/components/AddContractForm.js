import React from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup } from 'react-bootstrap';

class AddContractForm extends React.Component {
    render() {
        return (
            <Form>
                <FormGroup>
                    <FormControl type='text' placeholder='Nome'></FormControl>
                    <FormControl type='number' min='0' placeholder='Valor da renda'></FormControl>
                    <FormControl as='select'>
                        {
                            this.props.propertiesList.map((value) => {
                                return <option>{value.nome}</option>
                            })
                        }
                    </FormControl>
                    <FormCheck type='checkbox' label='Contrato renovável'></FormCheck>
                </FormGroup>
                <Button>Adicionar Contrato</Button>
            </Form>
        );
    }
}

export default AddContractForm