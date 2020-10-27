import React from 'react';
import { Button, Form, FormCheck, FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import WarningBanner from './WarningBanner';
import { saveContract } from '../backend/Database';

class AddContractForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nomeInquilino: '',
            valorRenda: ''
        }
        this.handleOnStringChange = this.handleOnStringChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOnStringChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        const valor = parseFloat(this.state.valorRenda)
        const contrato = {
            ano: this.props.ano,
            nomeInquilino: this.state.nomeInquilino,
            nomePropriedade: event.target.children[3].children[0].value,
            valorRenda: valor,
            pagamentos: { jan: '', fev: '', mar: '', abr: '', mai: '', jun: '', jul: '', ago: '', set: '', out: '', nov: '', dez: '' }
        }

        this.props.onContractsListAdd(contrato)

        this.setState({
            nomeInquilino: '',
            valorRenda: ''
        })

    }

    render() {
        return (
            <form noValidate onSubmit={this.handleSubmit} style={{ backgroundColor: 'whitesmoke', opacity: 0.93, borderStyle: 'solid', borderColor: 'darkgrey' }}>
                <FormLabel>Adicionar contrato</FormLabel>
                <label>
                    <input type='text' placeholder='Nome inquilino' name='nomeInquilino' onChange={this.handleOnStringChange} value={this.state.nomeInquilino}></input>
                </label>
                <label>
                    <input type='number' min='0' placeholder='Valor da renda' name='valorRenda' onChange={this.handleOnStringChange} value={this.state.valorRenda}></input>
                </label>
                <label>
                    <select name='nomePropriedade' onChange={this.handleOnStringChange}>
                        <option value="" disabled selected>Escolher propriedade...</option>
                        {
                            this.props.propertiesList.map((value) => {
                                return <option>{value.nome}</option>
                            })
                        }
                    </select>
                </label>

                <Button type='submit'>Adicionar Contrato</Button>
            </form >
        );
    }
}

export default AddContractForm