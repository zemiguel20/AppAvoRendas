import React from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
class AddPropertyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nomeProp: "",
            luz: false,
            pessoal: false,
        };

        this.handleOnParamChange = this.handleOnParamChange.bind(this);
        this.handleOnNameChange = this.handleOnNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOnNameChange(event) {
        this.setState({ 'nomeProp': event.target.value })
    }

    handleOnParamChange(event) {
        this.setState({ [event.target.name]: event.target.checked })
    }

    handleSubmit(event) {
        event.preventDefault();

        const propriedade = {
            'nome': this.state.nomeProp,
            'params': ['rendas', 'div', 'obs']
        }
        //adiciona os params com true
        let keys = Object.keys(this.state);
        for (let index = 1; index < 3; index++) {
            let param = keys[index];
            if (this.state[param] === true) {
                propriedade.params.splice(1, 0, param);
            }
        }

        this.props.onPropertyListAdd(propriedade)

        this.setState({
            nomeProp: "",
            luz: false,
            pessoal: false
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} style={{ backgroundColor: '#fafafa', opacity: 0.93, borderStyle: 'solid', borderColor: '#828282' }}>
                <FormGroup>
                    <FormLabel>Adicionar propriedade</FormLabel>
                    <FormControl type='text' placeholder='Nome propriedade' onChange={this.handleOnNameChange} value={this.state.nomeProp}></FormControl>
                    <FormCheck checked disabled type='checkbox' label='Rendas'></FormCheck>
                    <FormCheck checked disabled type='checkbox' label='Div'></FormCheck>
                    <FormCheck checked disabled type='checkbox' label='Obs'></FormCheck>
                    <FormCheck type='checkbox' name='luz' label='Luz' onChange={this.handleOnParamChange}></FormCheck>
                    <FormCheck type='checkbox' name='pessoal' label='Pessoal' onChange={this.handleOnParamChange}></FormCheck>
                    <Button type='submit'>Adicionar Propriedade</Button>
                </FormGroup>
            </Form >
        );
    }
}

export default AddPropertyForm;