import React, { Component } from 'react';
import { Table, FormControl, Container } from "react-bootstrap";

class TabelaPropriedades extends Component {
    render() {
        return (
            <div>
                {
                    this.props.propertiesList.map(property => {
                        const contracts = this.props.contractsList.filter(contract => contract.nomePropriedade === property.nome)
                        const despesas = this.props.despesasList.filter(despesa => despesa.nomePropriedade === property.nome)
                        return <TableRow nome={property.nome} params={property.params} contractsList={contracts} despesasList={despesas} onDespesaChange={this.props.onDespesaChange}></TableRow>
                    })
                }
            </div>

        );
    }
}

export default TabelaPropriedades;


const TableRow = (props) => {

    const { nome, params, contractsList, despesasList, onDespesaChange } = props

    const paramsInputNumericos = params.filter(param => param != 'rendas' && param != 'obs')

    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

    const calcularTotal = (param) => {

        let soma = 0

        if (param === 'rendas') {

            contractsList.forEach(contract => {
                meses.forEach(mes => {
                    let valor = parseFloat(contract.pagamentos[mes])
                    if (isNaN(valor))
                        valor = 0
                    soma += valor
                });
            });
            console.log("Total " + param + " " + soma) //TODO - REMOVE DEBUG

        } else {
            const despesa = despesasList.find(el => el.param === param)
            if (despesa != undefined) {
                meses.forEach(mes => {
                    let valor = parseFloat(despesa.valores[mes])
                    if (isNaN(valor))
                        valor = 0
                    soma += valor
                });
            }
        }

        return soma
    }

    const calcularDespesas = () => {
        let soma = 0
        paramsInputNumericos.forEach(param => {
            soma += calcularTotal(param)
        });
        return soma
    }

    const handleDespesaChange = (event) => {

        event.preventDefault();

        console.log(event.target) //TODO - DEBUG remove

        const { dataset, value } = event.target

        onDespesaChange(nome, dataset.param, dataset.mes, value)

    }


    const totalDespesas = calcularDespesas()
    const totalReceitas = calcularTotal('rendas')

    return (
        <div style={{ marginBottom: '25px', borderStyle: 'solid', borderColor: '#828282', overflowX: 'auto', backgroundColor: '#fafafa', opacity: 0.93 }}>
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
                                    let valor = parseFloat(contract.pagamentos[mes])
                                    if (isNaN(valor))
                                        valor = 0
                                    soma += valor
                                });
                                return <td>{soma.toFixed(2)}</td>
                            })
                        }
                        <td>{totalReceitas.toFixed(2)}</td>
                    </tr>
                    {
                        paramsInputNumericos.map(param => {
                            return (
                                <tr>
                                    <td>{param.charAt(0).toUpperCase() + param.slice(1)}</td>
                                    {
                                        meses.map(mes => {
                                            let valor = undefined
                                            const despesa = despesasList.find(despesa => despesa.param === param)
                                            if (despesa === undefined)
                                                valor = ''
                                            else
                                                valor = despesa.valores[mes]
                                            return <td><FormControl type='number' min='0' data-param={param} data-mes={mes} value={valor} onChange={handleDespesaChange}></FormControl></td>
                                        })
                                    }
                                    <td>{calcularTotal(param).toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td>Obs</td>
                        {
                            meses.map(mes => {
                                let valor = undefined
                                const despesa = despesasList.find(despesa => despesa.param === 'obs')
                                if (despesa === undefined)
                                    valor = ''
                                else
                                    valor = despesa.valores[mes]
                                return <td><FormControl as='textarea' style={{ minWidth: '150px' }} data-param='obs' data-mes={mes} value={valor} onChange={handleDespesaChange}></FormControl></td>
                            })
                        }
                    </tr>

                </tbody>
            </Table>

            <div style={{ maxWidth: '25%' }}>
                <div style={{ backgroundColor: '#e3ffd1' }}>{'Receitas: ' + totalReceitas.toFixed(2)}</div>
                <div style={{ backgroundColor: '#ffc096' }}>{'Despesas: ' + totalDespesas.toFixed(2)}</div>
                <div style={{ backgroundColor: '#dff0f5' }}>{'Saldo: ' + (totalReceitas - totalDespesas).toFixed(2)}</div>
            </div>
        </div>

    )
}