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
                            return <ContractTableRow contrato={value} onContractPaymentChange={this.props.onContractPaymentChange} onToggleRenovavel={this.props.onToggleRenovavel}></ContractTableRow>
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
            soma += parseInt(pagamentos[month])
        });

        return soma
    }

    const handleToggleRenovavel = (event) => {
        console.log('HELLO MF')//TODO -DEBUG REMOVE
        props.onToggleRenovavel(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.checked)
    }

    return (
        <tr>
            <td> <Button variant='outline-danger'>X</Button> </td>
            <td> <CheckBox checked={props.contrato.renovavel} onToggleRenovavel={handleToggleRenovavel}></CheckBox> </td>
            <td> {props.contrato.nomeInquilino} </td>
            <td> {props.contrato.nomePropriedade} </td>
            <td> {props.contrato.valorRenda} </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='jan' value={props.contrato.pagamentos.jan} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='fev' value={props.contrato.pagamentos.fev} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='mar' value={props.contrato.pagamentos.mar} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='abr' value={props.contrato.pagamentos.abr} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='mai' value={props.contrato.pagamentos.mai} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='jun' value={props.contrato.pagamentos.jun} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='jul' value={props.contrato.pagamentos.jul} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='ago' value={props.contrato.pagamentos.ago} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='set' value={props.contrato.pagamentos.set} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='out' value={props.contrato.pagamentos.out} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='nov' value={props.contrato.pagamentos.nov} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
            <td> <FormControl type='number' min='0' style={{ minWidth: '100px' }} name='dez' value={props.contrato.pagamentos.dez} onChange={(event) => props.onContractPaymentChange(props.contrato.nomeInquilino, props.contrato.nomePropriedade, event.target.name, event.target.value)}></FormControl> </td>
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