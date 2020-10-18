import fs from 'fs';

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
 */
export const saveContracts = (contractList) => {
    const fileContent = JSON.parse(openFile('contracts'))
    contractList.forEach(contract => {
        const resultIndex = fileContent.contracts.findIndex(el => (el.ano === contract.ano && el.nomeInquilino === contract.nomeInquilino && el.nomePropriedade === contract.nomePropriedade))
        if (resultIndex === -1) {
            fileContent.contracts.push(contract)
        } else {
            fileContent.contracts[resultIndex] = contract
        }
    });
    fs.writeFileSync(pathFile('contracts'), JSON.stringify(fileContent))
}

/**
 * Saves the list of receitas in the file
 * @param {Array<object>} receitasList 
 */
export const saveReceitas = (receitasList) => {
    const fileContent = JSON.parse(openFile('receitas'))
    receitasList.forEach(receita => {
        const resultIndex = fileContent.receitas.findIndex(el => (el.ano === receita.ano && el.nomePropriedade === receita.nomePropriedade && el.param === receita.param))
        if (resultIndex === -1) {
            fileContent.receitas.push(receita)
        } else {
            fileContent.receitas[resultIndex] = receita
        }
    });
    fs.writeFileSync(pathFile('receitas'), JSON.stringify(fileContent))
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
 * Returns the list of receitas of the given year.
 * @param {number} year 
 * @returns {Array<object>} list of receitas
 */
export const getReceitasListByYear = (year) => {
    const fileContent = JSON.parse(openFile('receitas'))
    return fileContent.receitas.filter(el => el.ano === year)
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