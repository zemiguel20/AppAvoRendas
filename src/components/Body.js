import React from 'react';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import YearCounter from './YearCounter';
import AddContractForm from './AddContractForm'
import AddPropertyForm from './AddPropertyForm'
import TabelaContratos from './TabelaContratos'
import TabelaPropriedades from "./TabelaPropriedades";
import TabelaResultado from './TabelaResultado';
import { getAllProperties, getContractsListByYear, getDespesasListByYear, saveProperties, saveContracts, saveDespesas, getImpostosByYear, saveImpostos } from '../backend/Database';
import WarningBanner from './WarningBanner';
import { clone } from '../utils';
import { RemoveProperty } from './RemoveProperty';
import _ from 'lodash';

import image from '../../assets/mountains.jpg';

class Body extends React.Component {

    constructor(props) {
        super(props)
        const year = new Date().getFullYear()
        this.state = {
            tabAtivo: 'despesas',
            msg: null,
            year: year,
            propertiesList: getAllProperties(),
            contractsList: getContractsListByYear(year),
            despesasList: getDespesasListByYear(year),
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
        this.handleDespesaChange = this.handleDespesaChange.bind(this)
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
            despesasList: getDespesasListByYear(year),
            impostos: getImpostosByYear(year)
        })
    }

    handleGuardar() {
        saveContracts(clone(this.state.contractsList), this.state.year)
        saveProperties(clone(this.state.propertiesList))
        saveDespesas(clone(this.state.despesasList), this.state.year)
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
        this.setState({ contractsList: contractsList, unsavedChanges: unsavedChanges })
    }

    handleDespesaChange(nomePropriedade, param, mes, valor) {
        const despesasList = clone(this.state.despesasList)
        let result = despesasList.find(despesa => (despesa.nomePropriedade === nomePropriedade && despesa.param === param))
        if (result === undefined) {
            result = { ano: this.state.year, nomePropriedade: nomePropriedade, param: param, valores: { jan: '', fev: '', mar: '', abr: '', mai: '', jun: '', jul: '', ago: '', set: '', out: '', nov: '', dez: '' } }
            despesasList.push(result)
        }
        result.valores[mes] = valor
        this.setState({ despesasList: despesasList, unsavedChanges: true })
    }

    handleContractRemove(nomeInquilino, nomePropriedade) {
        const contractsList = clone(this.state.contractsList)
        _.remove(contractsList, el => el.nomeInquilino === nomeInquilino && el.nomePropriedade === nomePropriedade)
        this.setState({ contractsList: contractsList, unsavedChanges: true })
    }

    handlePropertyRemove(nomePropriedade) {
        const propertiesList = clone(this.state.propertiesList)
        const property = propertiesList.find(p => p.nome === nomePropriedade)
        if (property === undefined) {
            this.setState({ msg: "Propriedade não encontrada." })
            return;
        }
        _.remove(propertiesList, p => p.nome === nomePropriedade)

        this.setState({ propertiesList: propertiesList, unsavedChanges: true, msg: null })

    }

    handleImpostosChange(imi, irs) {
        const impostos = clone(this.state.impostos)
        impostos.imi = imi
        impostos.irs = irs
        this.setState({ impostos: impostos, unsavedChanges: true })
    }

    render() {
        return (
            <Container fluid style={{ height: '100vh', backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
                <Row className='pt-3'>
                    <Col>
                        <YearCounter ano={this.state.year} onYearChange={this.handleYearChange}></YearCounter>
                    </Col>
                    <Col>
                        <Tabs defaultActiveKey='despesas' id='tabelas' style={{ maxWidth: 'max-content', borderStyle: 'solid', borderColor: '#828282', backgroundColor: '#fafafa', opacity: 0.93 }}>
                            <Tab title='Propriedades' eventKey='despesas' onEnter={() => {
                                this.setState({ tabAtivo: 'despesas' })
                            }}>

                            </Tab>
                            <Tab title='Contratos' eventKey='contratos' onEnter={() => {
                                this.setState({ tabAtivo: 'contratos' })
                            }}>
                            </Tab>

                            <Tab title='Resultado' eventKey='resultado' onEnter={() => {
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
                            <Button onClick={this.handleRenovarContratos} size='lg' style={{ borderStyle: 'solid', borderColor: '#828282' }}>Renovar contratos do ano anterior</Button>
                        </Col>
                    }

                    {this.state.tabAtivo === 'despesas' &&
                        <Col>
                            <AddPropertyForm onPropertyListAdd={this.handlePropertyListAdd}></AddPropertyForm>
                        </Col>
                    }

                    {this.state.tabAtivo === 'despesas' &&
                        <Col>
                            <RemoveProperty onPropertyRemove={this.handlePropertyRemove}></RemoveProperty>
                        </Col>
                    }

                </Row>

                <Row className='mt-3' style={{ maxHeight: '50%', overflowY: 'auto' }}>
                    <Col>
                        {this.state.tabAtivo === 'contratos' &&
                            <TabelaContratos contractsList={this.state.contractsList} onContractPaymentChange={this.handleContractPaymentChange} onToggleRenovavel={this.handleToggleRenovavel} onContractRemove={this.handleContractRemove}></TabelaContratos>
                        }
                        {this.state.tabAtivo === 'despesas' &&
                            <TabelaPropriedades propertiesList={this.state.propertiesList} contractsList={this.state.contractsList} despesasList={this.state.despesasList} onDespesaChange={this.handleDespesaChange}></TabelaPropriedades>
                        }
                        {this.state.tabAtivo === 'resultado' &&
                            <TabelaResultado propertiesList={this.state.propertiesList} despesasList={this.state.despesasList} contractsList={this.state.contractsList} impostos={this.state.impostos} onImpostosChange={this.handleImpostosChange}></TabelaResultado>
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
        return <Button className='btn-success' size='lg' onClick={() => props.onClick()} style={{ borderStyle: 'solid', borderColor: '#828282' }}>Guardar</Button>
    } else {
        return <Button disabled className='btn-outline-success' size='lg' style={{ borderStyle: 'solid', borderColor: '#828282' }}>Guardar</Button>
    }
}