import React from 'react';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import YearCounter from './YearCounter';
import AddContractForm from './AddContractForm'
import AddPropertyForm from './AddPropertyForm'
import TabelaContratos from './TabelaContratos'
import TabelaPropriedades from "./TabelaPropriedades";
import { getAllProperties, getContractsListByYear } from '../backend/Database';


class Body extends React.Component {

    constructor(props) {
        super(props)
        const year = new Date().getFullYear()
        this.state = {
            year: year,
            propertiesList: getAllProperties(),
            contractsList: getContractsListByYear(year)
        }

        this.handlePropertyListAdd = this.handlePropertyListAdd.bind(this)
        this.handleContractsListAdd = this.handleContractsListAdd.bind(this)
    }

    handlePropertyListAdd(property) {
        let propsList = this.state.propertiesList
        propsList.push(property)
        this.setState({ propertiesList: propsList })
    }

    handleContractsListAdd(contract) {
        let contractsList = this.state.contractsList
        contractsList.push(contract)
        this.setState({ contractsList: contractsList })
    }

    render() {
        return (
            <Container fluid className='bg-light'>
                <Row>
                    <Col>
                        <YearCounter></YearCounter>
                    </Col>
                    <Col>
                        <AddContractForm ano={this.state.year} propertiesList={this.state.propertiesList} onContractsListChange={this.handleContractsListAdd}></AddContractForm>
                    </Col>
                    <Col>
                        <AddPropertyForm onPropertyListChange={this.handlePropertyListAdd}></AddPropertyForm>
                    </Col>
                    <Col>
                        <Button>Renovar contratos do ano anterior</Button>
                    </Col>
                </Row>

                <Row className='overflow-auto'>
                    <Tabs defaultActiveKey='contratos' id='tabelas'>
                        <Tab title='Contratos' eventKey='contratos'>
                            <TabelaContratos contractsList={this.state.contractsList}></TabelaContratos>
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