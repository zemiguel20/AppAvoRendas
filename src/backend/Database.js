import fs from 'fs';
import { concat, remove } from 'lodash';

/**
 * Saves the list of properties in the file.
 * @param {Array<object>} propertyList 
 */
export const saveProperties = (propertyList) => {
    const fileContent = JSON.parse(openFile('properties'))
    fileContent.properties = propertyList
    fs.writeFileSync(pathFile('properties'), JSON.stringify(fileContent))
}

/**
 * Saves the list of contracts in the file
 * @param {Array<object>} contractList 
 * @param {number} year 
 */
export const saveContracts = (contractList, year) => {
    const fileContent = JSON.parse(openFile('contracts'))

    remove(fileContent.contracts, el => el.ano === year)
    fileContent.contracts = concat(fileContent.contracts, contractList)

    fs.writeFileSync(pathFile('contracts'), JSON.stringify(fileContent))
}

/**
 * Saves the list of despesas in the file
 * @param {Array<object>} despesasList 
 */
export const saveDespesas = (despesasList) => {
    const fileContent = JSON.parse(openFile('despesas'))
    despesasList.forEach(despesa => {
        const resultIndex = fileContent.despesas.findIndex(el => (el.ano === despesa.ano && el.nomePropriedade === despesa.nomePropriedade && el.param === despesa.param))
        if (resultIndex === -1) {
            fileContent.despesas.push(despesa)
        } else {
            fileContent.despesas[resultIndex] = despesa
        }
    });
    fs.writeFileSync(pathFile('despesas'), JSON.stringify(fileContent))
}

/**
 * Saves the impostos
 * @param {object} impostos 
 */
export const saveImpostos = (imposto) => {
    const fileContent = JSON.parse(openFile('impostos'))
    remove(fileContent.impostos, el => el.ano === imposto.ano)
    fileContent.impostos = concat(fileContent.impostos, imposto)
    fs.writeFileSync(pathFile('impostos'), JSON.stringify(fileContent))
}

/**
 * Returns a list with all the properties on the database
 * @return {Array<object>}
 */
export const getAllProperties = () => {
    const fileContent = JSON.parse(openFile('properties'))
    return fileContent.properties
}

/**
 * Returns the list of contracts of the given year.
 * @param {number} year 
 * @returns {Array<object>} list of contracts
 */
export const getContractsListByYear = (year) => {
    const fileContent = JSON.parse(openFile('contracts'))
    return fileContent.contracts.filter(el => el.ano === year)
}

/**
 * Returns the list of despesas of the given year.
 * @param {number} year 
 * @returns {Array<object>} list of despesas
 */
export const getDespesasListByYear = (year) => {
    const fileContent = JSON.parse(openFile('despesas'))
    return fileContent.despesas.filter(el => el.ano === year)
}

/**
 * Returns the taxes values for the given year.
 * If they dont exist yet, returns taxes with values 0.
 * @param {number} year 
 * @returns {object} impostos
 */
export const getImpostosByYear = (year) => {
    const fileContent = JSON.parse(openFile('impostos'))

    let result = fileContent.impostos.find(el => el.ano === year)
    if (result === undefined)
        result = { ano: year, imi: '0', irs: '0' }

    return result
}

/**
 * Open file with given file name. If doesnt exist, initialize the file.
 * @param {string} fileName 
 */
const openFile = (fileName) => {
    const path = pathFile(fileName)
    try {
        return fs.readFileSync(path)
    } catch (error) {
        const fd = fs.openSync(path, 'w')
        fs.writeFileSync(fd, JSON.stringify({ [fileName]: [] }))
        fs.closeSync(fd)
    }

    return fs.readFileSync(path)
}

/**
 * Return string path to given file name.
 * @param {string} fileName 
 */
const pathFile = (fileName) => {
    return './' + fileName + '.json'
}