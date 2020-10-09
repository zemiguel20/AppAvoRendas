import React from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup } from 'react-bootstrap';
class AddPropertyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nomeProp: "",
            luz: false,
            agua: false,
        };

        this.handleOnParamChange = this.handleOnParamChange.bind(this);
        this.handleOnNameChange = this.handleOnNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOnNameChange(event) {
        console.log(event.target.value); //TODO - for defug, remove after
        this.setState({ 'nomeProp': event.target.value })
    }

    handleOnParamChange(event) {
        console.log(event.target.checked) //TODO - for defug, remove after
        console.log(event.target.name) //TODO - for defug, remove after
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

        console.log(JSON.stringify(propriedade)); //TODO - for debug, remove after

        this.props.onPropertyListAdd(propriedade)

        this.setState({
            nomeProp: "",
            luz: false,
            agua: false
        });
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} >
                <FormGroup>
                    <FormControl type='text' placeholder='Nome propriedade' onChange={this.handleOnNameChange} value={this.state.nomeProp}></FormControl>
                    <div className='overflow-auto' style={{ height: '100px' }}>
                        <FormCheck checked disabled type='checkbox' label='Rendas'></FormCheck>
                        <FormCheck checked disabled type='checkbox' label='Div'></FormCheck>
                        <FormCheck checked disabled type='checkbox' label='Obs'></FormCheck>
                        <FormCheck type='checkbox' name='luz' label='Luz' onChange={this.handleOnParamChange}></FormCheck>
                        <FormCheck type='checkbox' name='agua' label='Agua' onChange={this.handleOnParamChange}></FormCheck>
                    </div>
                    <Button type='submit'>Adicionar Propriedade</Button>
                </FormGroup>
            </Form >
        );
    }
}

export default AddPropertyForm;