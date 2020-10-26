import React from 'react';
const { Form, FormLabel, FormControl, Button, FormText } = require("react-bootstrap")

export function RemoveProperty(props) {

    const { onPropertyRemove } = props

    const handleSubmit = (event) => {
        event.preventDefault()

        const nomePropriedade = event.target.children[1].value
        onPropertyRemove(nomePropriedade)
    }

    return (
        <Form onSubmit={handleSubmit} style={{ backgroundColor: '#fafafa', opacity: 0.93, borderStyle: 'solid', borderColor: '#828282' }}>
            <FormLabel>Remover uma propriedade</FormLabel>
            <FormControl type='text' placeholder='Nome da propriedade'></FormControl>
            <Button type='submit'>Remover</Button>
            <FormText style={{ fontWeight: 'bold' }}>!ATENÇÃO! Os contratos e despesas/receitas associados à propriedade removida não são apagados, mas não influenciam o cálculo do saldo final. Assim se a propriedade for readicionada, os valores voltam a ter efeito.</FormText>
        </Form >
    )
}