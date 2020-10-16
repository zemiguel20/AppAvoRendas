import React, { Component } from 'react';
import { Table, FormControl, Container } from "react-bootstrap";

class TabelaPropriedades extends Component {
    render() {
        return (
            <Container fluid>
                {
                    this.props.propertiesList.map(property => {
                        const contracts = this.props.contractsList.filter(contract => contract.nomePropriedade === property.nome)
                        return <TableRow nome={property.nome} params={property.params} contractsList={contracts}></TableRow>
                    })
                }
            </Container>

        );
    }
}

export default TabelaPropriedades;


const TableRow = (props) => {

    const { nome, params, contractsList } = props

    const paramsOpcionais = params.filter(param => param != 'rendas' && param != 'div' && param != 'obs')

    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

    const calcularTotal = (param) => {

        let soma = 0

        if (param === 'rendas') {


            contractsList.forEach(contract => {
                meses.forEach(mes => {
                    soma += contract.pagamentos[mes]
                });
            });
            console.log("Total " + param + " " + soma) //TODO - REMOVE DEBUG

        }

        return soma
    }

    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Despesas/Receitas</th>
                    {
                        meses.map(mes => {
                            return <th>{mes}</th>
                        })
                    }
                    <th>Total</th>
                </tr>

            </thead>
            <tbody>
                <tr>
                    <th scope='row' rowSpan={params.length}>{nome}</th>
                    <td>Renda</td>
                    {
                        meses.map(mes => {
                            let soma = 0
                            contractsList.forEach(contract => {
                                soma += contract.pagamentos[mes]
                            });
                            return <td>{soma}</td>
                        })
                    }
                    <td>{calcularTotal('rendas')}</td>
                </tr>
                {
                    paramsOpcionais.map(param => {
                        return (
                            <tr>
                                <td>{param.charAt(0).toUpperCase() + param.slice(1)}</td>
                                {
                                    meses.map(mes => {
                                        return <td><FormControl type='number' min='0'></FormControl></td>
                                    })
                                }
                                <td>Valor calculado</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td>Div</td>
                    {
                        meses.map(mes => {
                            return <td><FormControl type='number' min='0'></FormControl></td>
                        })
                    }
                    <td>Valor calculado</td>
                </tr>
                <tr>
                    <td>Obs</td>
                    {
                        meses.map(mes => {
                            return <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        })
                    }
                </tr>
            </tbody>
        </Table>

    )
}