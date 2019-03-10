const Express = require('express')
const SlowService = require("./services/SlowService")
const EventService = require("./services/EventService")

const dbPassword = process.env.DB_PASSWORD

const app = Express()
const port = 3000

const slowService = new SlowService()
const eventService = new EventService(dbPassword)

app.get('/', (req,res) => res.send('hello world!'))

//slow --> 5100000
app.get('/slow/:iter', (req,res) => {
	let iter = req.params.iter
	slowService.loopIterator(iter)
	res.send('finish')
})

//352E0E15-C3FA-2F74-38B6-1FDD4E86CE8C
app.get('/one/:id',(req,res) => {
	let id = req.params.id
	eventService.getEvents(id)
	.then(size => res.status(200).json({size:size}))
})

app.listen(port, () => console.log(`App listening on: ${port}`))