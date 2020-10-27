import React from 'react';
import { Table, Button, FormCheck, FormControl } from 'react-bootstrap';

class TabelaContratos extends React.Component {
    render() {
        return (
            <div style={{ marginBottom: '25px', borderStyle: 'solid', borderColor: '#828282', overflowX: 'auto', backgroundColor: '#fafafa', opacity: 0.93 }}>
                <Table bordered>
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}></th>
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
                                return <ContractTableRow contrato={value} onContractPaymentChange={this.props.onContractPaymentChange} onContractRemove={this.props.onContractRemove}></ContractTableRow>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default TabelaContratos;

function ContractTableRow(props) {

    const calcularPagamentoTotal = (pagamentos) => {
        let soma = 0
        const months = Object.keys(pagamentos)
        months.forEach(month => {
            let valor = parseFloat(pagamentos[month])
            if (isNaN(valor))
                valor = 0
            soma += valor
        });

        return soma
    }



    const { contrato, onContractPaymentChange, onContractRemove } = props;
    const { nomeInquilino, nomePropriedade, valorRenda, pagamentos } = contrato;

    const meses = Object.keys(pagamentos)

    const handleContractPaymentChange = (event) => {
        onContractPaymentChange(nomeInquilino, nomePropriedade, event.target.name, event.target.value)
    }

    const handleContractRemove = (event) => {
        onContractRemove(nomeInquilino, nomePropriedade)
    }

    return (
        <tr>
            <td> <Button variant='outline-danger' onClick={handleContractRemove}>X</Button> </td>
            <td> {nomeInquilino} </td>
            <td> {nomePropriedade} </td>
            <td> {valorRenda} </td>
            {
                meses.map(mes => {
                    return <td> <FormControl type='number' min='0' style={{ minWidth: '105px' }} name={mes} value={pagamentos[mes]} onChange={handleContractPaymentChange}></FormControl> </td>
                })
            }
            <td> {calcularPagamentoTotal(props.contrato.pagamentos).toFixed(2)} </td>
        </tr>
    );
}