import fs from 'fs';

const pathProperties = './database/properties.json'

export const saveProperty = (property) => {
    const fileContent = JSON.parse(openPropertiesFile())
    const result = fileContent.properties.find(el => el.nome === property.nome)
    if (result != undefined) {
        throw "Propriedade com este nome já existe."
    }
    fileContent.properties.push(property)
    fs.writeFileSync(pathProperties, JSON.stringify(fileContent))
}

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