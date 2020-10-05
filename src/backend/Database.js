import fs from 'fs';

const pathProperties = './database/properties.json'

/**
 * Saves property in the database
 * @throws "Propriedade com este nome já existe."
 * @param {Object} property 
 */
export const saveProperty = (property) => {
    const fileContent = JSON.parse(openPropertiesFile())
    const result = fileContent.properties.find(el => el.nome === property.nome)
    if (result != undefined) {
        throw "Propriedade com este nome já existe."
    }
    fileContent.properties.push(property)
    fs.writeFileSync(pathProperties, JSON.stringify(fileContent))
}

/**
 * Returns a list with all the properties on the database
 * @return {Array}
 */
export const getAllProperties = () => {
    const fileContent = JSON.parse(openPropertiesFile())
    return fileContent.properties
}

const openPropertiesFile = () => {
    try {
        return fs.readFileSync(pathProperties)
    } catch (error) {
        //initialize file
        const fd = fs.openSync(pathProperties, 'w')
        fs.writeFileSync(fd, JSON.stringify({ properties: [] }))
        fs.closeSync(fd)

        return fs.readFileSync(pathProperties)
    }
}