import express from 'express'
import eventsRouter from './routes/events.js'
import cors from 'cors'

// create an express app
const app = express()

// set up the cors middleware
app.use(cors());

// set up the express app to handle data parsing
app.use(express.json())

// specify the api path for the server to use
app.use('/events', eventsRouter)

// set up the default route
app.get('/', (req, res) => {
    res.status(200).send(
        `<h1 style="text-align: center; margin-top: 20px;">Welcome to the Intern Events API!</h1>`
    )
})

// set the port for the server to run on
const PORT = process.env.PORT || 3000

// listen for requests
app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port http://localhost:${PORT}`)
})