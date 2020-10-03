import React from 'react';
import { Table, FormControl, Button, FormCheck } from 'react-bootstrap';

class TabelaContratos extends React.Component {
    render() {
        return (
            <Table bordered>
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}></th>
                        <th style={{ width: '50px' }}>Renovavel</th>
                        <th>Nome</th>
                        <th>Propridade</th>
                        <th>Renda €</th>
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
                        <td>
                            <Button variant='outline-danger'>X</Button>
                        </td>
                        <td>
                            <FormCheck type='checkbox' size='lg'></FormCheck>
                        </td>
                        <td>
                            Nome
                                        </td>
                        <td>Propriedade1</td>
                        <td>10</td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            <FormControl type='number' min='0' style={{minWidth:'100px'}}></FormControl>
                        </td>
                        <td>
                            Valor calculado
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default TabelaContratos;