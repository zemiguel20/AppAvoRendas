import React from 'react'
import { Button, Form, FormControl } from 'react-bootstrap';
class YearCounter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.ano,
            disabled: true
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleValueChange(event) {
        this.setState({ value: event.target.value, disabled: false })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(event.target.children[0].value) //TODO -DEBUG REMOVE
        let value = parseInt(event.target.children[0].value)
        if (isNaN(value) === false) {
            this.props.onYearChange(parseInt(value))
            this.setState({ disabled: true })
        }

    }

    handleCancel(event) {
        this.setState({
            value: this.props.ano,
            disabled: true
        })
    }

    render() {
        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <FormControl size='lg' type='number' min='0' placeholder='Ano' value={this.state.value} onChange={this.handleValueChange}></FormControl>

                { (this.state.disabled && <Button disabled className='btn-outline-primary'>Mudar Ano</Button>)
                    || <Button type='submit'>Mudar Ano</Button>}

                { (this.state.disabled && <Button disabled className='btn-outline-danger'>Cancelar</Button>)
                    || <Button className='btn-danger' onClick={this.handleCancel}>Cancelar</Button>}
            </Form>
        );
    }
}

export default YearCounter;
