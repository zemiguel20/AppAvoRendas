import React from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup } from 'react-bootstrap';
import WarningBanner from './WarningBanner';
import { saveProperty } from '../backend/Database';
class AddPropertyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nomeProp: "",
            luz: false,
            agua: false,
            valid: true,
            msg: ""
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

        if (this.state.nomeProp.length <= 0) {
            this.setState({ valid: false, msg: "Nome é obrigatório." })
            return;
        }

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

        try {
            saveProperty(propriedade)
        } catch (error) {
            this.setState({ valid: false, msg: error })
            return;
        }

        // TODO - CALLBACK PARA ADICIONAR AO STATE NO BODY A PROPRIEDADE


        this.setState({ valid: true });
    }

    render() {

        let { valid } = this.state.valid;
        return (
            <div>
                <WarningBanner msg={this.state.msg} valid={this.state.valid}></WarningBanner>
                <Form onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <FormControl type='text' placeholder='Nome' onChange={this.handleOnNameChange} value={this.state.nomeProp}></FormControl>
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
            </div >
        );
    }
}

export default AddPropertyForm;