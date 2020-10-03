import React, { Component } from 'react';
import { Table, FormControl } from "react-bootstrap";

class TabelaPropriedades extends Component {
    render() {
        return (
            <Table bordered>
                <thead>
                    <tr>
                        <th>Propridade</th>
                        <th>Valores</th>
                        <th>jan</th>
                        <th>fev</th>
                        <th>mar</th>
                        <th>abr</th>
                        <th>mai</th>
                        <th>jun</th>
                        <th>jul</th>
                        <th>ago</th>
                        <th>set</th>
                        <th>out</th>
                        <th>nov</th>
                        <th>dez</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowSpan='3'>Propriedade1</td>
                        <td>Renda</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
                        <td>Valor calculado</td>
                    </tr>
                    <tr>
                        <td>Div</td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td><FormControl type='number' min='0'></FormControl></td>
                        <td>Valor calculado</td>
                    </tr>
                    <tr>
                        <td>Obs</td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                        <td><FormControl as='textarea' style={{ minWidth: '150px' }}></FormControl></td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default TabelaPropriedades;