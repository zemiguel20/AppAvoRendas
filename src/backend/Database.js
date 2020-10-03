import database from 'a1-database';

class Database {
    constructor() {
        this.db = database.connect('./data.db')
    }
    
}

export default Database;