import React from 'react';
import { Table, Button, FormCheck, FormControl } from 'react-bootstrap';

class TabelaContratos extends React.Component {
    render() {
        return (
            <Table bordered>
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}></th>
                        <th style={{ width: '50px' }}>Renovavel</th>
                        <th>Nome</th>
                        <th>Propridade</th>
                        <th>Renda €</th>
                        <th>jan</th>
                        <th>fev</th>
                        <th>mar</th>
                        <th>abr</th>
                        <th>mai</th>
                        <th>jun</th>
                        <th>jul</th>
                        <th>ago</th>
                        <th>set</th>
                        <th>out</th>
                        <th>nov</th>
                        <th>dez</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.contractsList.map((value) => {
                            return <ContractTableRow contrato={value} onContractPaymentChange={this.props.onContractPaymentChange} onToggleRenovavel={this.props.onToggleRenovavel} onContractRemove={this.props.onContractRemove}></ContractTableRow>
                        })
                    }
                </tbody>
            </Table>
        );
    }

}

export default TabelaContratos;

function ContractTableRow(props) {

    const calcularPagamentoTotal = (pagamentos) => {
        let soma = 0
        const months = Object.keys(pagamentos)
        months.forEach(month => {
            let valor = parseInt(pagamentos[month])
            if (isNaN(valor))
                valor = 0
            soma += valor
        });

        return soma
    }



    const { contrato, onContractPaymentChange, onContractRemove } = props;
    const { nomeInquilino, renovavel, nomePropriedade, valorRenda, pagamentos } = contrato;

    const meses = Object.keys(pagamentos)

    const handleToggleRenovavel = (event) => {
        console.log('HELLO MF')//TODO -DEBUG REMOVE
        props.onToggleRenovavel(nomeInquilino, nomePropriedade, event.target.checked)
    }

    const handleContractPaymentChange = (event) => {
        onContractPaymentChange(nomeInquilino, nomePropriedade, event.target.name, event.target.value)
    }

    const handleContractRemove = (event) => {
        onContractRemove(nomeInquilino, nomePropriedade)
    }

    return (
        <tr>
            <td> <Button variant='outline-danger' onClick={handleContractRemove}>X</Button> </td>
            <td> <CheckBox checked={renovavel} onToggleRenovavel={handleToggleRenovavel}></CheckBox> </td>
            <td> {nomeInquilino} </td>
            <td> {nomePropriedade} </td>
            <td> {valorRenda} </td>
            {
                meses.map(mes => {
                    return <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name={mes} value={pagamentos[mes]} onChange={handleContractPaymentChange}></FormControl> </td>
                })
            }
            <td> {calcularPagamentoTotal(props.contrato.pagamentos)} </td>
        </tr>
    );


}

function CheckBox(props) {
    if (props.checked === true) {
        return <FormCheck checked type='checkbox' size='lg' onChange={(event) => props.onToggleRenovavel(event)}></FormCheck>
    } else {
        return <FormCheck type='checkbox' size='lg' onChange={(event) => props.onToggleRenovavel(event)}></FormCheck>
    }
}