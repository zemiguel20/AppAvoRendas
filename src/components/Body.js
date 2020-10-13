import React from 'react';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import YearCounter from './YearCounter';
import AddContractForm from './AddContractForm'
import AddPropertyForm from './AddPropertyForm'
import TabelaContratos from './TabelaContratos'
import TabelaPropriedades from "./TabelaPropriedades";
import { getAllProperties, getContractsListByYear, saveProperties, saveContracts } from '../backend/Database';
import WarningBanner from './WarningBanner';


class Body extends React.Component {

    constructor(props) {
        super(props)
        const year = new Date().getFullYear()
        this.state = {
            msg: null,
            year: year,
            propertiesList: getAllProperties(),
            contractsList: getContractsListByYear(year),
            unsavedChanges: false
        }

        this.handlePropertyListAdd = this.handlePropertyListAdd.bind(this)
        this.handleContractsListAdd = this.handleContractsListAdd.bind(this)
        this.handleContractPaymentChange = this.handleContractPaymentChange.bind(this)
        this.handleGuardar = this.handleGuardar.bind(this)
        this.handleToggleRenovavel = this.handleToggleRenovavel.bind(this)
        this.handleYearChange = this.handleYearChange.bind(this)
        this.handleRenovarContratos = this.handleRenovarContratos.bind(this)
    }

    handlePropertyListAdd(property) {

        if (property.nome.length <= 0) {
            this.setState({ msg: "Nome da propriedade é obrigatório." })
            return;
        }
        let propsList = [].concat(this.state.propertiesList)
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

        let contractsList = [].concat(this.state.contractsList)
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
        let contractList = [].concat(this.state.contractsList)
        contractList.find(el => (el.nomeInquilino === nomeInquilino && el.nomePropriedade === nomePropriedade)).pagamentos[mes] = num
        this.setState({
            contractList: contractList,
            unsavedChanges: true
        })
    }

    handleToggleRenovavel(nomeInquilino, nomePropriedade, value) {
        console.log(value) //TODO - DEBUG REMOVE
        let contractList = [].concat(this.state.contractsList)
        contractList.find(el => (el.nomeInquilino === nomeInquilino && el.nomePropriedade === nomePropriedade)).renovavel = value
        this.setState({
            contractList: contractList,
            unsavedChanges: true
        })
    }

    handleYearChange(year) {
        if (this.state.unsavedChanges === true) {
            this.handleGuardar()
        }
        this.setState({
            year: year,
            contractsList: getContractsListByYear(year)
        })
    }

    handleGuardar() {
        saveContracts([].concat(this.state.contractsList))
        saveProperties([].concat(this.state.propertiesList))
        this.setState({ unsavedChanges: false })
    }

    handleRenovarContratos() {
        let unsavedChanges = false
        const renovavelList = getContractsListByYear(this.state.year - 1).filter(el => el.renovavel === true)
        const contractList = [].concat(this.state.contractsList)
        renovavelList.forEach(contract => {
            const result = contractList.find(el => (el.nomeInquilino === contract.nomeInquilino && el.nomePropriedade === contract.nomePropriedade))
            if (result === undefined) {
                contract.ano = this.state.year
                contractList.push(contract)
                unsavedChanges = true
            }
        });
        console.log(contractList) //TODO - remove debug
        this.setState({ contractsList: contractList, unsavedChanges: unsavedChanges })
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
                <Row className='overflow-auto'>
                    <Tabs defaultActiveKey='contratos' id='tabelas'>
                        <Tab title='Contratos' eventKey='contratos'>
                            <TabelaContratos contractsList={this.state.contractsList} onContractPaymentChange={this.handleContractPaymentChange} onToggleRenovavel={this.handleToggleRenovavel}></TabelaContratos>
                        </Tab>
                        <Tab title='Propriedades' eventKey='propriedades'>
                            <TabelaPropriedades></TabelaPropriedades>
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