import React from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup } from 'react-bootstrap';
import WarningBanner from './WarningBanner';
import { saveContract } from '../backend/Database';

class AddContractForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            valid: true,
            msg: '',
            nomeInquilino: '',
            valorRenda: '',
            nomePropriedade: this.props.propertiesList[0].nome,
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

        if (this.state.nomeInquilino.length <= 0) {
            this.setState({ valid: false, msg: "Nome é obrigatório." })
            return;
        }

        const valor = parseInt(this.state.valorRenda)
        console.log(this.state.valorRenda)
        console.log(valor)
        if (valor === null || isNaN(valor)) {
            console.log('CHEGUEI')
            this.setState({ valid: false, msg: "Renda tem de ser um número." })
            return;
        }

        const contrato = {
            ano: this.props.ano,
            nomeInquilino: this.state.nomeInquilino,
            nomePropriedade: this.state.nomePropriedade,
            valorRenda: valor,
            renovavel: this.state.renovavel,
            pagamentos: { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0 }
        }

        console.log(JSON.stringify(contrato)); //TODO - for debug, remove after

        try {
            saveContract(contrato)
        } catch (error) {
            this.setState({ valid: false, msg: error })
            return;
        }

        this.props.onContractsListChange(contrato)

        this.setState({
            valid: true,
            msg: '',
            nomeInquilino: '',
            valorRenda: '',
            renovavel: false
        })

    }

    render() {
        return (
            <div>
                <WarningBanner msg={this.state.msg} valid={this.state.valid}></WarningBanner>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
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
                    </FormGroup>
                    <Button type='submit'>Adicionar Contrato</Button>
                </Form>
            </div>
        );
    }
}

export default AddContractForm