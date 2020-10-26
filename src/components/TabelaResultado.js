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
        <Container className='justify-content-center'>
            <Table bordered style={{ width: 'auto' }}>
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
                        <td style={{ backgroundColor: '#d9f7d7' }}>{receitas}</td>
                        <td style={{ backgroundColor: '#f7e3df' }}>{despesas}</td>
                        <td>{saldo}</td>
                    </tr>
                </tbody>
            </Table>

            <Table bordered style={{ width: 'auto' }}>
                <thead>
                    <tr>
                        <th>IMI</th>
                        <th>Saldo Final</th>
                    </tr>
                </thead>

                <tbody>
                    <td><FormControl type='number' min='0' max='9999.99' value={IMI} onChange={onIMIChange}></FormControl></td>
                    <td>{saldoIMI}</td>
                </tbody>
            </Table>

            <Table bordered style={{ width: 'auto' }}>
                <thead>
                    <tr>
                        <th>IRS (%)</th>
                        <th>Saldo após IRS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><FormControl type='number' min='0' max='100' value={IRS} onChange={onIRSChange}></FormControl></td>
                        <td>{saldoIRS.toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    )
}

export default TabelaResultado