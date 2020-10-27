import React from 'react';
const { Form, FormLabel, FormControl, Button, FormText } = require("react-bootstrap")

export function RemoveProperty(props) {

    const { onPropertyRemove } = props

    const handleSubmit = (event) => {
        event.preventDefault()

        const nomePropriedade = event.target.children[1].children[0].value
        onPropertyRemove(nomePropriedade)
    }

    return (
        <form onSubmit={handleSubmit} style={{ backgroundColor: 'whitesmoke', opacity: 0.93, borderStyle: 'solid', borderColor: 'darkgrey' }}>
            <FormLabel>Remover uma propriedade</FormLabel>
            <label>
                <input type='text' placeholder='Nome da propriedade'></input>
            </label>
            <Button type='submit'>Remover</Button>
            <label>!ATENÇÃO! Os contratos e despesas/receitas associados à propriedade removida não são apagados, mas não influenciam o cálculo do saldo final. Assim se a propriedade for readicionada, os valores voltam a ter efeito.</label>
        </form >
    )
}