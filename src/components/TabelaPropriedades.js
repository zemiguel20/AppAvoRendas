import React, { Component } from 'react';
import { Table, FormControl, Container } from "react-bootstrap";

class TabelaPropriedades extends Component {
    render() {
        return (
            <Container fluid>
                {
                    this.props.propertiesList.map(property => {
                        const contracts = this.props.contractsList.filter(contract => contract.nomePropriedade === property.nome)
                        const receitas = this.props.receitasList.filter(receita => receita.nomePropriedade === property.nome)
                        return <TableRow nome={property.nome} params={property.params} contractsList={contracts} receitasList={receitas} onReceitaChange={this.props.onReceitaChange}></TableRow>
                    })
                }
            </Container>

        );
    }
}

export default TabelaPropriedades;


const TableRow = (props) => {

    const { nome, params, contractsList, receitasList, onReceitaChange } = props

    const paramsInputNumericos = params.filter(param => param != 'rendas' && param != 'obs')

    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

    const calcularTotal = (param) => {

        let soma = 0

        if (param === 'rendas') {

            contractsList.forEach(contract => {
                meses.forEach(mes => {
                    let valor = parseInt(contract.pagamentos[mes])
                    if (isNaN(valor))
                        valor = 0
                    soma += valor
                });
            });
            console.log("Total " + param + " " + soma) //TODO - REMOVE DEBUG

        } else {
            const receita = receitasList.find(el => el.param === param)
            if (receita != undefined) {
                meses.forEach(mes => {
                    let valor = parseInt(receita.valores[mes])
                    if (isNaN(valor))
                        valor = 0
                    soma += valor
                });
            }
        }

        return soma
    }

    const handleReceitaChange = (event) => {

        event.preventDefault();

        console.log(event.target) //TODO - DEBUG remove

        const { dataset, value } = event.target

        onReceitaChange(nome, dataset.param, dataset.mes, value)

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
                                let valor = parseInt(contract.pagamentos[mes])
                                if (isNaN(valor))
                                    valor = 0
                                soma += valor
                            });
                            return <td>{soma}</td>
                        })
                    }
                    <td>{calcularTotal('rendas')}</td>
                </tr>
                {
                    paramsInputNumericos.map(param => {
                        return (
                            <tr>
                                <td>{param.charAt(0).toUpperCase() + param.slice(1)}</td>
                                {
                                    meses.map(mes => {
                                        let valor = undefined
                                        const receita = receitasList.find(receita => receita.param === param)
                                        if (receita === undefined)
                                            valor = ''
                                        else
                                            valor = receita.valores[mes]
                                        return <td><FormControl type='number' min='0' data-param={param} data-mes={mes} value={valor} onChange={handleReceitaChange}></FormControl></td>
                                    })
                                }
                                <td>{calcularTotal(param)}</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td>Obs</td>
                    {
                        meses.map(mes => {
                            let valor = undefined
                            const receita = receitasList.find(receita => receita.param === 'obs')
                            if (receita === undefined)
                                valor = ''
                            else
                                valor = receita.valores[mes]
                            return <td><FormControl as='textarea' style={{ minWidth: '150px' }} data-param='obs' data-mes={mes} value={valor} onChange={handleReceitaChange}></FormControl></td>
                        })
                    }
                </tr>
            </tbody>
        </Table>

    )
}