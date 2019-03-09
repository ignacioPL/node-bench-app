const express = require('express')
const bigInt = require('big-integer')
const dbPassword = process.env.DB_PASSWORD
const app = express()
const Pool = require('pg').Pool
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'benchmark',
	password: dbPassword,
	port: 5432
})
const port = 3000
const a = bigInt(Number.MAX_VALUE).times(bigInt(Number.MAX_VALUE))
const b = bigInt(Number.MAX_VALUE).times(bigInt(Number.MAX_VALUE))

app.get('/', (req,res) => res.send('hello world!'))

//slow --> 5100000
app.get('/slow/:iter', (req,res) => {
	let iter = req.params.iter
	for(let i = 0; i < iter; i++){
		let c = a.times(b).times(bigInt(i))
	}
	res.send('finish')
})

app.get('/all', (req,res) => {
	pool.query('SELECT * FROM bench.events', (errors, results) => {
		if(errors){
			throw errors
		}
		res.status(200).json(results.rows)
	})
})

//352E0E15-C3FA-2F74-38B6-1FDD4E86CE8C
app.get('/one/:id',(req,res) => {
	let id = req.params.id
	pool.query('SELECT * FROM bench.events WHERE user_id = $1',[id], (errors, results) => {
		if(errors){
			throw errors
		}
		let size = results.rows.length
		res.status(200).json({size:size})
	})
})

app.listen(port, () => console.log(`App listening on: ${port}`))