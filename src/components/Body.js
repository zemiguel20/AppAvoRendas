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

    //TODO - adicionar uma barra para indicar erros!

    constructor(props) {
        super(props)
        const year = new Date().getFullYear()
        this.state = {
            msg: "",
            valid: true,
            year: year,
            propertiesList: getAllProperties(),
            contractsList: getContractsListByYear(year),
            unsavedChanges: false
        }

        this.handlePropertyListAdd = this.handlePropertyListAdd.bind(this)
        this.handleContractsListAdd = this.handleContractsListAdd.bind(this)
        this.handleContractPaymentChange = this.handleContractPaymentChange.bind(this)
        this.handleGuardar = this.handleGuardar.bind(this)
    }

    handlePropertyListAdd(property) {

        if (property.nome.length <= 0) {
            this.setState({ valid: false, msg: "Nome é obrigatório." })
            return;
        }
        let propsList = this.state.propertiesList
        if (propsList.find(el => el.nome === property.nome) != undefined) {
            this.setState({ valid: false, msg: "Propriedade já existe." })
            return;
        }
        propsList.push(property)
        this.setState({ valid: true, propertiesList: propsList, unsavedChanges: true })
    }

    handleContractsListAdd(contract) {
        let contractsList = this.state.contractsList
        contractsList.push(contract)
        this.setState({ contractsList: contractsList })
    }

    handleContractPaymentChange(nomeInquilino, nomePropriedade, mes, novoValor) {
        let num = parseInt(novoValor)
        let contractList = this.state.contractsList
        contractList.find(el => (el.nomeInquilino === nomeInquilino && el.nomePropriedade === nomePropriedade)).pagamentos[mes] = num
        this.setState({
            contractList: contractList,
            unsavedChanges: true
        })
    }

    handleGuardar() {
        saveContracts(this.state.contractsList)
        saveProperties(this.state.propertiesList)
        this.setState({ unsavedChanges: false })
    }

    render() {
        return (
            <Container fluid className='bg-light'>
                <Row>
                    <WarningBanner msg={this.state.msg} valid={this.state.valid}></WarningBanner>
                </Row>
                <Row>
                    <Col>
                        <YearCounter></YearCounter>
                    </Col>
                    <Col>
                        <AddContractForm ano={this.state.year} propertiesList={this.state.propertiesList} onContractsListChange={this.handleContractsListAdd}></AddContractForm>
                    </Col>
                    <Col>
                        <AddPropertyForm onPropertyListAdd={this.handlePropertyListAdd}></AddPropertyForm>
                    </Col>
                    <Col>
                        <Button>Renovar contratos do ano anterior</Button>
                    </Col>
                </Row>
                <Row>
                    <SaveButton unsavedChanges={this.state.unsavedChanges} onClick={this.handleGuardar}></SaveButton>
                </Row>
                <Row className='overflow-auto'>
                    <Tabs defaultActiveKey='contratos' id='tabelas'>
                        <Tab title='Contratos' eventKey='contratos'>
                            <TabelaContratos contractsList={this.state.contractsList} onContractPaymentChange={this.handleContractPaymentChange}></TabelaContratos>
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