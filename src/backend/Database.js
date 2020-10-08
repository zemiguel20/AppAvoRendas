import fs from 'fs';

/**
 * Saves property in the database
 * @throws "Propriedade com este nome já existe."
 * @param {object} property 
 */
export const saveProperty = (property) => {
    const fileContent = JSON.parse(openFile('properties'))
    const result = fileContent.properties.find(el => el.nome === property.nome)
    if (result != undefined) {
        throw "Propriedade com este nome já existe."
    }
    fileContent.properties.push(property)
    fs.writeFileSync(pathFile('properties'), JSON.stringify(fileContent))
}

/**
 * Returns a list with all the properties on the database
 * @return {Array}
 */
export const getAllProperties = () => {
    const fileContent = JSON.parse(openFile('properties'))
    return fileContent.properties
}

/**
 * Saves contract in the database
 * @throws "Contrato já existe."
 * @param {object} contract 
 */
export const saveContract = (contract) => {
    const fileContent = JSON.parse(openFile('contracts'))
    const result = fileContent.contracts.find(el =>
        (el.ano === contract.ano
            && el.nomeInquilino === contract.nomeInquilino
            && el.nomePropriedade === contract.nomePropriedade))
    if (result != undefined) {
        throw "Contrato já existe."
    }
    fileContent.contracts.push(contract)
    fs.writeFileSync(pathFile('contracts'), JSON.stringify(fileContent))
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
    return './database/' + fileName + '.json'
}