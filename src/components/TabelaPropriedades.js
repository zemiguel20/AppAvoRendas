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

        const { dataset, value } = event.target

        onDespesaChange(nome, dataset.param, dataset.mes, value)

    }


    const totalDespesas = calcularDespesas()
    const totalReceitas = calcularTotal('rendas')

    return (
        <div style={{ marginBottom: '25px', borderStyle: 'solid', borderColor: 'darkgrey', overflowX: 'auto', backgroundColor: 'whitesmoke', opacity: 0.93 }}>
            <table>
                <thead style={{ backgroundColor: 'lightcyan', textAlign: 'center' }}>
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
                                return <td style={{ textAlign: 'right' }}>{soma.toFixed(2)}</td>
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
                                            return <td><input type='number' min='0' max='9999' style={{ width: '100%', textAlign: 'right' }} data-param={param} data-mes={mes} value={valor} onChange={handleDespesaChange}></input></td>
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
                                return <td><textarea style={{ width: '100%' }} data-param='obs' data-mes={mes} value={valor} onChange={handleDespesaChange}></textarea></td>
                            })
                        }
                    </tr>

                </tbody>
            </table>

            <div style={{ width: '100%' }}>
                <div style={{ backgroundColor: 'yellowgreen', display: 'inline-block', padding: '15px' }}>{'Receitas: ' + totalReceitas.toFixed(2)}</div>
                <div style={{ backgroundColor: 'orange', display: 'inline-block', padding: '15px' }}>{'Despesas: ' + totalDespesas.toFixed(2)}</div>
                <div style={{ backgroundColor: 'skyblue', display: 'inline-block', padding: '15px' }}>{'Saldo: ' + (totalReceitas - totalDespesas).toFixed(2)}</div>
            </div>
        </div>

    )
}