import React from 'react';
import { Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import YearCounter from './YearCounter';
import AddContractForm from './AddContractForm'
import AddPropertyForm from './AddPropertyForm'
import TabelaContratos from './TabelaContratos'
import TabelaPropriedades from "./TabelaPropriedades";
import { getAllProperties } from '../backend/Database';


class Body extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            year: new Date().getFullYear(),
            propertiesList: getAllProperties()
        }

        this.handlePropertyListAdd = this.handlePropertyListAdd.bind(this)
    }

    handlePropertyListAdd(property) {
        let propsList = this.state.propertiesList
        propsList.push(property)
        this.setState({ propertiesList: propsList })
    }

    render() {
        return (
            <Container fluid className='bg-light'>
                <Row>
                    <Col>
                        <YearCounter></YearCounter>
                    </Col>
                    <Col>
                        <AddContractForm ano={this.state.year} propertiesList={this.state.propertiesList}></AddContractForm>
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
                            <TabelaContratos></TabelaContratos>
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