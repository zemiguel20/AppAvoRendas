import React from 'react';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import YearCounter from './YearCounter';
import AddContractForm from './AddContractForm'
import AddPropertyForm from './AddPropertyForm'
import TabelaContratos from './TabelaContratos'
import TabelaPropriedades from "./TabelaPropriedades";
import { getAllProperties, getContractsListByYear, getReceitasListByYear, saveProperties, saveContracts, saveReceitas } from '../backend/Database';
import WarningBanner from './WarningBanner';
import { clone } from '../utils';


class Body extends React.Component {

    constructor(props) {
        super(props)
        const year = new Date().getFullYear()
        this.state = {
            msg: null,
            year: year,
            propertiesList: getAllProperties(),
            contractsList: getContractsListByYear(year),
            receitasList: getReceitasListByYear(year),
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
        let num = parseInt(novoValor)
        let contractsList = clone(this.state.contractsList)
        contractsList.find(el => (el.nomeInquilino === nomeInquilino && el.nomePropriedade === nomePropriedade)).pagamentos[mes] = num
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
            receitasList: getReceitasListByYear(year)
        })
    }

    handleGuardar() {
        saveContracts(clone(this.state.contractsList))
        saveProperties(clone(this.state.propertiesList))
        saveReceitas(clone(this.state.receitasList))
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

    render() {
        return (
            <Container fluid className='bg-light'>
                {this.state.msg &&
                    <Row>

                        <WarningBanner msg={this.state.msg}></WarningBanner>

                    </Row>
                }
                <Row>
                    <Col>
                        <YearCounter ano={this.state.year} onYearChange={this.handleYearChange}></YearCounter>
                    </Col>
                    <Col>
                        <AddContractForm ano={this.state.year} propertiesList={this.state.propertiesList} onContractsListAdd={this.handleContractsListAdd}></AddContractForm>
                    </Col>
                    <Col>
                        <AddPropertyForm onPropertyListAdd={this.handlePropertyListAdd}></AddPropertyForm>
                    </Col>
                    <Col>
                        <Button onClick={this.handleRenovarContratos}>Renovar contratos do ano anterior</Button>
                    </Col>
                </Row>
                <Row>
                    <SaveButton unsavedChanges={this.state.unsavedChanges} onClick={this.handleGuardar}></SaveButton>
                </Row>
                <Row className='overflow-auto' style={{ maxHeight: '500px' }}>
                    <Tabs defaultActiveKey='contratos' id='tabelas'>
                        <Tab title='Contratos' eventKey='contratos'>
                            <TabelaContratos contractsList={this.state.contractsList} onContractPaymentChange={this.handleContractPaymentChange} onToggleRenovavel={this.handleToggleRenovavel}></TabelaContratos>
                        </Tab>
                        <Tab title='Propriedades' eventKey='propriedades'>
                            <TabelaPropriedades propertiesList={this.state.propertiesList} contractsList={this.state.contractsList} receitasList={this.state.receitasList} onReceitaChange={this.handleReceitaChange}></TabelaPropriedades>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        );
    }
}

export default Body

function SaveButton(props) {
    if (props.unsavedChanges === true) {
        return <Button className='btn-success' onClick={() => props.onClick()}>Guardar</Button>
    } else {
        return <Button disabled className='btn-outline-success'>Guardar</Button>
    }
}