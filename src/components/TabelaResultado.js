import { forEach } from 'lodash';
import React from 'react';
import { Container, FormControl, Table } from 'react-bootstrap';

const TabelaResultado = (props) => {

    const { propertiesList, despesasList, contractsList, impostos, onImpostosChange } = props

    const calcularDespesas = () => {
        let soma = 0
        forEach(propertiesList, (property) => {
            forEach(property.params, (param) => { //para cada propriedade, vai buscar os params
                if (param != 'obs') {
                    let despesa = despesasList.find(el => el.nomePropriedade === property.nome && el.param === param) // ve se existe uma entrada nas despesasList
                    if (despesa == undefined)
                        soma += 0
                    else // se existir entao soma os valores de cada mes
                        forEach(despesa.valores, (value) => {
                            let num = parseFloat(value)
                            if (isNaN(num))
                                num = 0
                            soma += num
                        })
                }
            })
        })
        return soma
    }

    const calcularReceitas = () => {
        let soma = 0
        forEach(contractsList, (contrato) => {
            forEach(contrato.pagamentos, (value) => {
                let num = parseFloat(value)
                if (isNaN(num))
                    num = 0
                soma += num
            })
        })
        return soma
    }

    const despesas = calcularDespesas()
    const receitas = calcularReceitas()
    const saldo = receitas - despesas
    const IMI = parseFloat(impostos.imi)
    const IRS = parseFloat(impostos.irs) //percentagem
    const saldoIMI = saldo - IMI
    const saldoIRS = saldoIMI - (saldoIMI * (IRS / 100))


    const onIMIChange = (event) => {
        event.preventDefault()
        onImpostosChange(event.target.value, IRS)
    }
    const onIRSChange = (event) => {
        event.preventDefault()
        onImpostosChange(IMI, event.target.value)
    }

    return (
        <div style={{ width: 'max-content', borderStyle: 'solid', borderColor: 'darkgrey', borderWidth: '4px', overflowX: 'auto', backgroundColor: 'whitesmoke', opacity: 0.93, padding: '10px', margin: 'auto' }}>
            <table>
                <thead>
                    <tr>
                        <th>Ano</th>
                        <th>Receitas</th>
                        <th>Despesas</th>
                        <th>Saldo</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{impostos.ano}</td>
                        <td style={{ backgroundColor: 'yellowgreen' }}>{receitas.toFixed(2)}</td>
                        <td style={{ backgroundColor: 'orange' }}>{despesas.toFixed(2)}</td>
                        <td style={{ backgroundColor: 'skyblue' }}>{saldo.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>IMI</th>
                        <th>Saldo Final</th>
                    </tr>
                </thead>

                <tbody>
                    <td><input type='number' min='0' max='9999' value={IMI} onChange={onIMIChange}></input></td>
                    <td>{saldoIMI.toFixed(2)}</td>
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <th>IRS (%)</th>
                        <th>Saldo após IRS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type='number' min='0' max='100' value={IRS} onChange={onIRSChange}></input></td>
                        <td>{saldoIRS.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TabelaResultado