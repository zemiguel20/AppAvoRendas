import React from 'react';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import YearCounter from './YearCounter';
import AddContractForm from './AddContractForm'
import AddPropertyForm from './AddPropertyForm'
import TabelaContratos from './TabelaContratos'
import TabelaPropriedades from "./TabelaPropriedades";
import TabelaResultado from './TabelaResultado';
import { getAllProperties, getContractsListByYear, getReceitasListByYear, saveProperties, saveContracts, saveReceitas, getImpostosByYear, saveImpostos } from '../backend/Database';
import WarningBanner from './WarningBanner';
import { clone } from '../utils';
import { RemoveProperty } from './RemoveProperty';
import _ from 'lodash';

/*
*
* ! NOTA ! ---> RECEITAS SUPOSTAMENTE SÃO DESPESAS!!!!!!!!!!!  
*
*
*/
class Body extends React.Component {

    constructor(props) {
        super(props)
        const year = new Date().getFullYear()
        this.state = {
            tabAtivo: 'receitas',
            msg: null,
            year: year,
            propertiesList: getAllProperties(),
            contractsList: getContractsListByYear(year),
            receitasList: getReceitasListByYear(year),
            impostos: getImpostosByYear(year),
            unsavedChanges: false
        }

        this.handlePropertyListAdd = this.handlePropertyListAdd.bind(this)
        this.handleContractsListAdd = this.handleContractsListAdd.bind(this)
        this.handleContractPaymentChange = this.handleContractPaymentChange.bind(this)
        this.handleGuardar = this.handleGuardar.bind(this)
        this.handleToggleRenovavel = this.handleToggleRenovavel.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleRenovarContratos = this.handleRenovarContratos.bind(this)
        this.handleReceitaChange = this.handleReceitaChange.bind(this)
        this.handleContractRemove = this.handleContractRemove.bind(this)
        this.handlePropertyRemove = this.handlePropertyRemove.bind(this)
        this.handleImpostosChange = this.handleImpostosChange.bind(this)
    }

    handlePropertyListAdd(property) {

        if (property.nome.length <= 0) {
            this.setState({ msg: "Nome da propriedade é obrigatório." })
            return;
        }
        let propsList = clone(this.state.propertiesList)
        if (propsList.find(el => el.nome === property.nome) != undefined) {
            this.setState({ msg: "Propriedade com este nome já existe." })
            return;
        }
        propsList.push(property)
        this.setState({ msg: null, propertiesList: propsList, unsavedChanges: true })
    }

    handleContractsListAdd(contract) {

        if (contract.nomeInquilino.length <= 0) {
            this.setState({ msg: "Nome do inquilino é obrigatório." })
            return;
        }

        if (contract.valorRenda === null || isNaN(contract.valorRenda)) {
            this.setState({ msg: "Renda tem de ser um número." })
            return;
        }

        let contractsList = clone(this.state.contractsList)
        const result = contractsList.find(el =>
            (el.ano === contract.ano
                && el.nomeInquilino === contract.nomeInquilino
                && el.nomePropriedade === contract.nomePropriedade))
        if (result != undefined) {
            this.setState({ msg: "Contrato com dado inquilino e propriedade já existe." })
        }
        contractsList.push(contract)
        this.setState({ msg: null, contractsList: contractsList, unsavedChanges: true })
    }

    handleContractPaymentChange(nomeInquilino, nomePropriedade, mes, novoValor) {
        let contractsList = clone(this.state.contractsList)
        contractsList.find(el => (el.nomeInquilino === nomeInquilino && el.nomePropriedade === nomePropriedade)).pagamentos[mes] = novoValor
        this.setState({
            contractsList: contractsList,
            unsavedChanges: true
        })
    }

    handleToggleRenovavel(nomeInquilino, nomePropriedade, value) {
        console.log(value) //TODO - DEBUG REMOVE
        let contractsList = clone(this.state.contractsList)
        contractsList.find(el => (el.nomeInquilino === nomeInquilino && el.nomePropriedade === nomePropriedade)).renovavel = value
        this.setState({
            contractsList: contractsList,
            unsavedChanges: true
        })
    }

    handleYearChange(year) {
        if (this.state.unsavedChanges === true) {
            this.handleGuardar()
        }
        this.setState({
            year: year,
            contractsList: getContractsListByYear(year),
            receitasList: getReceitasListByYear(year),
            impostos: getImpostosByYear(year)
        })
    }

    handleGuardar() {
        saveContracts(clone(this.state.contractsList), this.state.year)
        saveProperties(clone(this.state.propertiesList))
        saveReceitas(clone(this.state.receitasList))
        saveImpostos(clone(this.state.impostos))
        this.setState({ unsavedChanges: false })
    }

    handleRenovarContratos() {
        let unsavedChanges = false
        const renovavelList = getContractsListByYear(this.state.year - 1).filter(el => el.renovavel === true)
        const contractsList = clone(this.state.contractsList)
        renovavelList.forEach(contract => {
            const result = contractsList.find(el => (el.nomeInquilino === contract.nomeInquilino && el.nomePropriedade === contract.nomePropriedade))
            if (result === undefined) {
                contract.ano = this.state.year
                contractsList.push(contract)
                unsavedChanges = true
            }
        });
        console.log(contractsList) //TODO - remove debug
        this.setState({ contractsList: contractsList, unsavedChanges: unsavedChanges })
    }

    handleReceitaChange(nomePropriedade, param, mes, valor) {
        console.log(nomePropriedade + " " + param + " " + mes + " " + valor) //TODO -REMOVE DEBUG
        const receitasList = clone(this.state.receitasList)
        let result = receitasList.find(receita => (receita.nomePropriedade === nomePropriedade && receita.param === param))
        if (result === undefined) {
            result = { ano: this.state.year, nomePropriedade: nomePropriedade, param: param, valores: { jan: '', fev: '', mar: '', abr: '', mai: '', jun: '', jul: '', ago: '', set: '', out: '', nov: '', dez: '' } }
            receitasList.push(result)
        }
        result.valores[mes] = valor
        console.log(result) //TODO - REMOVE DEBUG
        this.setState({ receitasList: receitasList, unsavedChanges: true })
    }

    handleContractRemove(nomeInquilino, nomePropriedade) {
        const contractsList = clone(this.state.contractsList)
        _.remove(contractsList, el => el.nomeInquilino === nomeInquilino && el.nomePropriedade === nomePropriedade)
        this.setState({ contractsList: contractsList, unsavedChanges: true })
    }

    handlePropertyRemove(nomePropriedade) {
        console.log(nomePropriedade) //TODO - REMOVE DEBUG
        const propertiesList = clone(this.state.propertiesList)
        const property = propertiesList.find(p => p.nome === nomePropriedade)
        if (property === undefined) {
            this.setState({ msg: "Propriedade não encontrada." })
            return;
        }
        const receitasList = clone(this.state.receitasList)
        _.remove(propertiesList, p => p.nome === nomePropriedade)
        _.remove(receitasList, rec => rec.nomePropriedade === nomePropriedade)

        this.setState({ propertiesList: propertiesList, receitasList: receitasList, unsavedChanges: true, msg: null })

    }

    handleImpostosChange(imi, irs) {
        console.log('IMI:' + imi + ' IRS:' + irs) //TODO - REMOVE DEBUG
        const impostos = clone(this.state.impostos)
        impostos.imi = imi
        impostos.irs = irs
        this.setState({ impostos: impostos, unsavedChanges: true })
    }

    render() {
        return (
            <Container fluid className='bg-light'>
                <Row className='pt-3'>
                    <Col>
                        <YearCounter ano={this.state.year} onYearChange={this.handleYearChange}></YearCounter>
                    </Col>
                    <Col>
                        <Tabs defaultActiveKey='receitas' id='tabelas'>
                            <Tab title='Propriedades' eventKey='receitas' onEnter={() => {
                                console.log('receitas tab') // TODO - REMOVE DEBUG
                                this.setState({ tabAtivo: 'receitas' })
                            }}>

                            </Tab>
                            <Tab title='Contratos' eventKey='contratos' onEnter={() => {
                                console.log('contratos tab') // TODO - REMOVE DEBUG
                                this.setState({ tabAtivo: 'contratos' })
                            }}>
                            </Tab>

                            <Tab title='Resultado' eventKey='resultado' onEnter={() => {
                                console.log('resultado tab') //TODO - REMOVE DEBUG
                                this.setState({ tabAtivo: 'resultado' })
                            }}></Tab>

                        </Tabs>
                    </Col>
                    <Col>
                        <SaveButton unsavedChanges={this.state.unsavedChanges} onClick={this.handleGuardar}></SaveButton>
                    </Col>
                </Row>
                {this.state.msg &&
                    <Row className='pt-3'>
                        <Col>
                            <WarningBanner msg={this.state.msg}></WarningBanner>
                        </Col>
                    </Row>
                }
                <Row className='mt-3' md={3}>
                    {this.state.tabAtivo === 'contratos' &&
                        <Col>
                            <AddContractForm ano={this.state.year} propertiesList={this.state.propertiesList} onContractsListAdd={this.handleContractsListAdd}></AddContractForm>
                        </Col>
                    }

                    {this.state.tabAtivo === 'contratos' &&
                        <Col>
                            <Button onClick={this.handleRenovarContratos}>Renovar contratos do ano anterior</Button>
                        </Col>
                    }

                    {this.state.tabAtivo === 'receitas' &&
                        <Col>
                            <AddPropertyForm onPropertyListAdd={this.handlePropertyListAdd}></AddPropertyForm>
                        </Col>
                    }

                    {this.state.tabAtivo === 'receitas' &&
                        <Col>
                            <RemoveProperty onPropertyRemove={this.handlePropertyRemove}></RemoveProperty>
                        </Col>
                    }

                </Row>

                <Row className='mt-3 overflow-auto' style={{ height: '600px' }}>
                    <Col>
                        {this.state.tabAtivo === 'contratos' &&
                            <TabelaContratos contractsList={this.state.contractsList} onContractPaymentChange={this.handleContractPaymentChange} onToggleRenovavel={this.handleToggleRenovavel} onContractRemove={this.handleContractRemove}></TabelaContratos>
                        }
                        {this.state.tabAtivo === 'receitas' &&
                            <TabelaPropriedades propertiesList={this.state.propertiesList} contractsList={this.state.contractsList} receitasList={this.state.receitasList} onReceitaChange={this.handleReceitaChange}></TabelaPropriedades>
                        }
                        {this.state.tabAtivo === 'resultado' &&
                            <TabelaResultado propertiesList={this.state.propertiesList} despesasList={this.state.receitasList} contractsList={this.state.contractsList} impostos={this.state.impostos} onImpostosChange={this.handleImpostosChange}></TabelaResultado>
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Body

function SaveButton(props) {
    if (props.unsavedChanges === true) {
        return <Button className='btn-success' size='lg' onClick={() => props.onClick()}>Guardar</Button>
    } else {
        return <Button disabled className='btn-outline-success' size='lg'>Guardar</Button>
    }
}