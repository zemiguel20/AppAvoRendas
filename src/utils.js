/**
 * Returns a deep copy of an object.
 * @param {object} object 
 */
export const clone = (object) => {
    return JSON.parse(JSON.stringify(object))
}