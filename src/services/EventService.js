const Pool = require('pg').Pool

class EventService{

	constructor(dbPassword){
		this.pool = new Pool({
			user: 'postgres',
			host: 'localhost',
			database: 'benchmark',
			password: dbPassword,
			port: 5432
		})
	}

	getEvents(userId){
		return this.pool.query('SELECT * FROM bench.events WHERE user_id = $1',[userId],)
			       .then( results => results.rows.length )
	}
}

module.exports = EventService