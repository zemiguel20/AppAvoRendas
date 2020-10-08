import fs from 'fs';

/**
 * Saves property in the database
 * @throws "Propriedade com este nome já existe."
 * @param {Object} property 
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
 * Open file with given file name. If doesnt exist, initialize the file.
 * @param {string} fileName 
 */
const openFile = (fileName) => {
    const path = pathFile('properties')
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