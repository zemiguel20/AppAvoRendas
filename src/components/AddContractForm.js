import React from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import WarningBanner from './WarningBanner';
import { saveContract } from '../backend/Database';

class AddContractForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nomeInquilino: '',
            valorRenda: '',
            renovavel: false
        }
        this.handleOnStringChange = this.handleOnStringChange.bind(this);
        this.handleOnCheckboxChange = this.handleOnCheckboxChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOnStringChange(event) {
        console.log(event.target.value); //TODO - for defug, remove after
        this.setState({ [event.target.name]: event.target.value })
    }

    handleOnCheckboxChange(event) {
        console.log(event.target.checked) //TODO - for defug, remove after
        this.setState({ renovavel: event.target.checked })
    }

    handleSubmit(event) {
        event.preventDefault();
        const valor = parseFloat(this.state.valorRenda)
        const contrato = {
            ano: this.props.ano,
            nomeInquilino: this.state.nomeInquilino,
            nomePropriedade: event.target.children[3].value,
            valorRenda: valor,
            renovavel: this.state.renovavel,
            pagamentos: { jan: '', fev: '', mar: '', abr: '', mai: '', jun: '', jul: '', ago: '', set: '', out: '', nov: '', dez: '' }
        }

        console.log(JSON.stringify(contrato)); //TODO - for debug, remove after

        this.props.onContractsListAdd(contrato)

        this.setState({
            nomeInquilino: '',
            valorRenda: '',
            renovavel: false
        })

    }

    render() {
        return (
            <Form noValidate onSubmit={this.handleSubmit} style={{ backgroundColor: '#fafafa', opacity: 0.93, borderStyle: 'solid', borderColor: '#828282' }}>
                <FormLabel>Adicionar contrato</FormLabel>
                <FormControl type='text' placeholder='Nome inquilino' name='nomeInquilino' onChange={this.handleOnStringChange} value={this.state.nomeInquilino}></FormControl>
                <FormControl type='number' min='0' placeholder='Valor da renda' name='valorRenda' onChange={this.handleOnStringChange} value={this.state.valorRenda}></FormControl>
                <FormControl as='select' name='nomePropriedade' onChange={this.handleOnStringChange}>
                    {
                        this.props.propertiesList.map((value) => {
                            return <option>{value.nome}</option>
                        })
                    }
                </FormControl>
                <FormCheck type='checkbox' label='Contrato renovável' onChange={this.handleOnCheckboxChange}></FormCheck>
                <Button type='submit'>Adicionar Contrato</Button>
            </Form >
        );
    }
}

export default AddContractForm